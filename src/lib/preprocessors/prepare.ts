import * as fs from 'fs';
import * as _ from 'lodash';

const jsonQ = require('jsonq');
interface Class {
  name: string;
  methods?: Array<Method>;
  param?: Array<string>;
  subclass?: Class;
}

interface ConsolidatedClass {
  name: string;
  methods?: Array<Method>;
  param?: Array<string>;
  subclasses?: Array<ConsolidatedClass>;
}

interface Method {
  verb: string;
  url: string;
  params: Array<Parameters>;
  qsParams: Array<Parameters>;
  body?: object;
  response?: Response;
}

interface Parameters {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Response {
  type: responseType;
  schema?: object;
  header?: object;
  examples?: object;
}

enum responseType {
  'header' = 'header',
  'bodyless' = 'bodyless',
  'custom' = 'custom',
}

let snyk: any, paths: any;

let classMap: Map<string, ConsolidatedClass> = new Map();

const extractClassAndParamFromEndpoint = (
  endpointSplit: Array<string>,
  verbs: Array<string>,
  fullPath: string,
): Class => {
  let endpoint = endpointSplit;
  const name = endpoint[0] || 'root';
  const params = [];
  endpoint.shift();
  let arrayLength = endpoint.length;
  let i = 0;
  while (i < arrayLength) {
    if (endpoint[i].startsWith('{') || endpoint[i] == 'me') {
      params.push(endpoint[i]);
      if (endpoint.length == 0) {
        return { name: name, param: params };
      }
    } else {
      return {
        name: name,
        param: params,
        subclass: extractClassAndParamFromEndpoint(
          endpoint.slice(i),
          verbs,
          fullPath,
        ),
      };
    }
    i++;
  }

  const methodsArray: Array<Method> = [];

  let parameters: Array<Parameters> = [];
  let qsParameters: Array<Parameters> = [];
  /// @ts-ignore
  Object.keys(paths[fullPath]).forEach((path) => {
    const methodDetails = paths[fullPath][path];

    let body: object = {};
    // @ts-ignore
    methodDetails.parameters.forEach((parameter) => {
      if (parameter.in == 'path') {
        if (!parameters.some((x) => x.name == parameter.name)) {
          parameters.push({
            name: parameter.name,
            type: parameter.type,
            description: parameter.description,
            required: parameter.required,
          });
        }
      } else if (parameter.in == 'query') {
        if (!parameters.some((x) => x.name == parameter.name)) {
          qsParameters.push({
            name: parameter.name,
            type: parameter.type,
            description: parameter.description,
            required: parameter.required,
          });
        }
      } else if (parameter.in == 'body') {
        body = parameter.schema;
        // console.log(parameter)
        // throw new Error ('wtf')
      } else {
        throw new Error('wtf');
      }
    });
    let response: Response = { type: responseType.custom };

    switch (Object.keys(methodDetails.responses)[0]) {
      case '201':
      case '204':
      case '303':
        response.type = responseType.header;
        response.header =
          methodDetails.responses[
            Object.keys(methodDetails.responses)[0]
          ].header;
        break;
      case '200':
        if (
          methodDetails.responses[Object.keys(methodDetails.responses)[0]]
            .schema
        ) {
          response.type = responseType.custom;
          response.schema =
            methodDetails.responses[
              Object.keys(methodDetails.responses)[0]
            ].schema;
          response.examples =
            methodDetails.responses[
              Object.keys(methodDetails.responses)[0]
            ].examples;
        } else {
          response.type = responseType.bodyless;
        }
    }

    methodsArray.push({
      verb: path,
      url: fullPath,
      params: parameters,
      qsParams: qsParameters,
      body: body,
      response: response,
    });
  });

  return { name: name, param: params, methods: methodsArray };
};

const registerEndpoint = (
  currentClassMap: Map<string, ConsolidatedClass>,
  classToRegister: Class,
) => {
  if (currentClassMap.has(classToRegister.name)) {
    const existing = currentClassMap.get(classToRegister.name);
    currentClassMap.set(
      classToRegister.name,
      mergeClassIntoConsolidatedClass(existing!, classToRegister),
    );
  } else {
    currentClassMap.set(
      classToRegister.name,
      convertClassToConsolidatedClass(classToRegister),
    );
  }
  return currentClassMap;
};

const mergeClassIntoConsolidatedClass = (
  existingClass: ConsolidatedClass,
  classToRegister: Class,
) => {
  // console.log(classToRegister.name)
  const existing = existingClass;
  // params
  if (!existing?.param?.includes(classToRegister.param![0])) {
    existing?.param!.push(classToRegister.param![0]);
  }

  // methods
  const existingMethods = existing?.methods;
  if (_.isEmpty(existingMethods)) {
    existing!.methods = [];
  }
  if (!_.isEmpty(classToRegister.methods)) {
    classToRegister.methods?.forEach((method) => {
      existing?.methods?.push(method);
    });
  }

  // subclasses
  const existingSubclasses = existing?.subclasses;
  // //console.log(classToRegister.name +'=>'+classToRegister.subclass?.name)
  // if(classToRegister.name == 'reporting' && classToRegister.subclass?.name == 'issues' ){
  //     console.log('fdd')
  //     console.log(JSON.stringify(classToRegister, null, 2))
  // }
  if (!_.isEmpty(classToRegister.subclass)) {
    if (!existingSubclasses || existingSubclasses?.length == 0) {
      // existing!.subclasses = [classToRegister.subclass!]
      existing!.subclasses = [
        convertClassToConsolidatedClass(classToRegister.subclass!),
      ];
    } else {
      const existingSubclassesNames = existing.subclasses?.map((x) => x.name);
      const indexOfSubclass = existingSubclassesNames!.indexOf(
        classToRegister.subclass!.name,
      );
      if (indexOfSubclass > -1) {
        const mergedClass = mergeClassIntoConsolidatedClass(
          existingSubclasses![indexOfSubclass],
          classToRegister.subclass!,
        );
        existingSubclasses![indexOfSubclass] = mergedClass;
        existing!.subclasses = existingSubclasses;
      } else {
        existing!.subclasses?.push(
          convertClassToConsolidatedClass(classToRegister.subclass!),
        );
      }
    }
  }
  return existing;
};

const convertClassToConsolidatedClass = (
  classToConvert: Class,
): ConsolidatedClass => {
  let consolidatedClassToReturn;
  if (classToConvert.subclass) {
    consolidatedClassToReturn = {
      name: classToConvert.name,
      param: classToConvert.param,
      methods: classToConvert.methods,
      subclasses: [convertClassToConsolidatedClass(classToConvert.subclass)],
    };
  } else {
    consolidatedClassToReturn = {
      name: classToConvert.name,
      param: classToConvert.param,
      methods: classToConvert.methods,
    };
  }

  return consolidatedClassToReturn;
};

const convertReferencesToPropertiesFromDefinitions = (
  definitions: any,
  objectToConvert: any,
): any => {
  const objectToConvertJsonQ = jsonQ(objectToConvert);
  const refId: string = objectToConvertJsonQ
    .find('$ref')
    .value()[0]
    .replace('#/definitions/', '');
  let nestedRefs = jsonQ(definitions[`${refId}`]['patternProperties']).find(
    '$ref',
  );
  if (nestedRefs.length > 0) {
    return convertReferencesToPropertiesFromDefinitions(
      definitions,
      definitions[`${refId}`]['patternProperties'],
    );
    // return {
    //   properties: convertReferencesToPropertiesFromDefinitions(
    //     definitions,
    //     definitions[`${refId}`]['patternProperties'],
    //   ),
    //   type: definitions[`${refId}`]['type'],
    // };
  } else {
    return {
      properties: definitions[`${refId}`]['patternProperties'],
      type: definitions[`${refId}`]['type'],
    };
  }
};

const consolidateReferences = (paths: any): any => {
  let jsonObjectPaths = jsonQ(paths);
  let preprocessedPaths = paths;
  const schemasWithReferences: Array<any> = jsonObjectPaths
    .find('schema', function () {
      //@ts-ignore
      return this['$ref'] != null;
      //@ts-ignore
    })
    // @ts-ignore
    .each(function (index, path, value) {
      const definitions = value['definitions'];
      jsonObjectPaths.setPathValue(
        path,
        convertReferencesToPropertiesFromDefinitions(definitions, value),
      );
    }); //.value()
  // schemasWithReferences.forEach(schema => {

  //   const definitions = schema["definitions"]
  //   console.log(JSON.stringify(convertReferencesToPropertiesFromDefinitions(definitions,schema)))

  // })

  preprocessedPaths = jsonObjectPaths.value()[0];

  // search for all schemas
  // filter out all those without $ref in it
  // For each ref, return patternproperties into properties
  // check for nested ref to apply the same
  return preprocessedPaths;
};

const main = (jsonPath: string) => {
  snyk = fs.readFileSync(jsonPath).toString();
  paths = JSON.parse(snyk).paths;
  paths = consolidateReferences(paths);
  Object.keys(paths).forEach((path) => {
    const verbs = Object.keys(paths[path]);
    const splitEndpoint = path.split('/').filter((x) => x);
    classMap = registerEndpoint(
      classMap,
      extractClassAndParamFromEndpoint(splitEndpoint, verbs, path),
    );
  });
  let jsonOutput = '';
  const classMapLength = classMap.size;
  let i = 0;
  classMap.forEach((entry) => {
    i++;
    jsonOutput += JSON.stringify(entry, null, 2);
    if (i < classMapLength) {
      jsonOutput += ',\n';
    }
  });

  jsonOutput = `[\n${jsonOutput}\n]`;

  console.log(jsonOutput);
};

main('./snyk.json');
