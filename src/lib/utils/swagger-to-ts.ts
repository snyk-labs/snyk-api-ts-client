import {
  comment,
  nodeType,
  transformRef,
  tsArrayOf,
  tsIntersectionOf,
  tsPartial,
  tsUnionOf,
} from './utils';

export type OpenAPI3Type =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'number'
  | 'object'
  | 'string';

interface OpenAPI3SchemaObject {
  additionalProperties?: OpenAPI3SchemaObject | OpenAPI3Reference | boolean;
  allOf?: (OpenAPI3SchemaObject | OpenAPI3Reference)[];
  description?: string;
  enum?: string[];
  items?: OpenAPI3SchemaObject | OpenAPI3Reference;
  nullable?: boolean;
  oneOf?: (OpenAPI3SchemaObject | OpenAPI3Reference)[];
  properties?: { [key: string]: OpenAPI3SchemaObject | OpenAPI3Reference };
  required?: string[];
  title?: string;
  type?: OpenAPI3Type; // allow this to be optional to cover cases when this is missing
  [key: string]: any; // allow arbitrary x-something properties
}

export type OpenAPI3Reference =
  | { $ref: string }
  | { anyOf: (OpenAPI3SchemaObject | OpenAPI3Reference)[] }
  | { oneOf: (OpenAPI3SchemaObject | OpenAPI3Reference)[] };

//   const propertyMapped = options
//   ? propertyMapper(schema.components.schemas, options.propertyMapper)
//   : schema.components.schemas;

const convert = (node: OpenAPI3SchemaObject) => {
  function transform(node: OpenAPI3SchemaObject): string {
    switch (nodeType(node)) {
      case 'string':
      case 'number':
      case 'boolean': {
        return nodeType(node) || 'any';
      }
      case 'enum': {
        return tsUnionOf((node.enum as string[]).map((item) => `'${item}'`));
      }
      case 'oneOf': {
        return tsUnionOf((node.oneOf as any[]).map(transform));
      }
      case 'anyOf': {
        return tsIntersectionOf(
          (node.anyOf as any[]).map((anyOf) => tsPartial(transform(anyOf))),
        );
      }
      case 'object': {
        // if empty object, then return generic map type
        if (
          (!node.properties || !Object.keys(node.properties).length) &&
          !node.allOf &&
          !node.additionalProperties
        ) {
          return `{ [key: string]: any }`;
        }

        let properties = createKeys(node.properties || {}, node.required);

        // if additional properties, add to end of properties
        if (node.additionalProperties) {
          properties += `[key: string]: ${
            nodeType(node.additionalProperties) || 'any'
          };\n`;
        }

        return tsIntersectionOf([
          ...(node.allOf ? (node.allOf as any[]).map(transform) : []), // append allOf first
          ...(properties ? [`{ ${properties} }`] : []), // then properties + additionalProperties
        ]);
      }
      case 'array': {
        return tsArrayOf(transform(node.items as any) || 'string');
      }
    }

    return '';
  }

  function createKeys(
    obj: { [key: string]: any },
    required?: string[],
  ): string {
    let output = '';

    Object.entries(obj).forEach(([key, value]) => {
      // 1. JSDoc comment (goes above property)
      if (value.description) {
        output += comment(value.description);
      }

      // 2. name (with “?” if optional property)
      output += `"${key}"${!required || !required.includes(key) ? '?' : ''}: `;

      // 3. open nullable
      if (value.nullable) {
        output += '(';
      }

      // 4. transform
      output += transform(value);

      // 5. close nullable
      if (value.nullable) {
        output += ') | null';
      }

      // 6. close type
      output += ';\n';
    });

    return output;
  }

  return `${transform(node)}`;
  // note: make sure that base-level schemas are required
  //   return `
  //       ${createKeys(node, Object.keys(node))}
  //     `;
};

export { convert };
