import * as fs from 'fs';
import * as _ from 'lodash';

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
}

interface Parameters {
  name: string;
  type: string;
  required: boolean;
  description: string;
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
    methodsArray.push({
      verb: path,
      url: fullPath,
      params: parameters,
      qsParams: qsParameters,
      body: body,
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

const main = (jsonPath: string) => {
  snyk = fs.readFileSync(jsonPath).toString();
  paths = JSON.parse(snyk).paths;
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
