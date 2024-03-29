import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as utils from '../utils/generatorUtils';
import * as swaggerToTS from '../utils/swagger-to-ts';
import { getObjectKey } from '../utils/utils';

export interface ConsolidatedClass {
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

interface PreparedMethod {
  name: string;
  argsList: Array<string>;
  qsList?: Array<string>;
  paramList?: Array<string>;
  url: string;
  response?: Response;
}

interface Response {
  type: responseType;
  schema?: object;
  header?: object;
}

enum responseType {
  'header' = 'header',
  'bodyless' = 'bodyless',
  'custom' = 'custom',
}

let currentRootClassName = '';
const preparedJson = fs.readFileSync('./snyk-prepared.json').toString();

let abstractionImportsArray: Array<string> = [];

const generateClass = (
  classToGenerate: ConsolidatedClass,
  parentClassType: string = '',
  isRootClass: boolean = true,
) => {
  let codeToReturn: string = '';

  codeToReturn += `${generateClassInterface(classToGenerate, isRootClass)}`;
  codeToReturn += `${generateBodyInterfaces(classToGenerate)}`;
  codeToReturn += `${generateResponseInterfaces(classToGenerate)}`;

  abstractionImportsArray.push(
    generateImportsForAbstractionMethods(classToGenerate),
  );
  abstractionImportsArray = [...new Set(abstractionImportsArray)];

  if (classToGenerate) {
    if (isRootClass) {
      currentRootClassName = utils.formatClassName(classToGenerate.name);
      codeToReturn += `export class ${utils.formatClassName(
        classToGenerate.name,
      )} {\n`;
    } else {
      codeToReturn += `export namespace ${utils.formatClassName(
        classToGenerate.name,
      )} {
                                \n export class ${utils.formatClassName(
                                  classToGenerate.name,
                                )} {`;
    }

    codeToReturn += `${generateClassVariables(
      classToGenerate,
      parentClassType,
      isRootClass,
    )}
         ${generateConstructors(classToGenerate, parentClassType, isRootClass)}



         ${generateMethods(classToGenerate)}
         ${generatePaginationMethods(classToGenerate)}
         ${integrateAbstractionMethods(classToGenerate)}

    }
    ${generateSubClasses(classToGenerate, isRootClass)}
    `;
    if (!isRootClass) {
      codeToReturn += `\n}`;
    }
  }
  return codeToReturn;
};

const generateClassInterface = (
  classToGetInterfaceFrom: ConsolidatedClass,
  isRootClass: boolean,
) => {
  let listOfInterfaceMembers: Array<string> = [];
  if (
    classToGetInterfaceFrom.param &&
    classToGetInterfaceFrom.param.length > 0
  ) {
    listOfInterfaceMembers = listOfInterfaceMembers.concat(
      classToGetInterfaceFrom.param.filter((x) => x),
    );
    const optionalFlag = listOfInterfaceMembers.length > 1 ? '?' : '';
    listOfInterfaceMembers = listOfInterfaceMembers
      .filter((x) => x != 'me')
      .map((x) => utils.removeCurlyBraces(x) + optionalFlag + ': string');
  }
  if (listOfInterfaceMembers.length > 0) {
    return `interface ${utils
      .formatClassName(classToGetInterfaceFrom.name)
      .toLowerCase()}Class {
            ${listOfInterfaceMembers
              .map((x) => utils.removeCurlyBraces(x))
              .join(',\n')}
        }\n`;
  } else {
    return '';
  }
};

const generateBodyInterfaces = (
  classToGenerateBodyInterfacesFor: ConsolidatedClass,
) => {
  let codeToReturn: string = '';

  if (classToGenerateBodyInterfacesFor.methods) {
    const methodsArray = classToGenerateBodyInterfacesFor.methods;

    methodsArray.forEach((method) => {
      if (!_.isEmpty(method.body)) {
        // codeToReturn += `export interface ${
        //   utils.formatClassName(classToGenerateBodyInterfacesFor.name) +
        //   _.capitalize(method.verb) +
        //   'BodyType'
        // } {
        //             ${swaggerToTS.convert(
        //               method.body as swaggerToTS.OpenAPI3Reference,
        //             )}
        //         }

        //         `;
        codeToReturn += swaggerToTS.getTsInterfaceFromSwaggerSchema(
          utils.formatClassName(classToGenerateBodyInterfacesFor.name) +
            _.capitalize(method.verb) +
            'BodyType',
          method.body,
        ).join(`
        `);
      }
    });
  }
  return codeToReturn;
};

const generateResponseInterfaces = (
  classToGenerateResponseInterfacesFor: ConsolidatedClass,
) => {
  let codeToReturn: string = '';

  if (classToGenerateResponseInterfacesFor.methods) {
    const methodsArray = classToGenerateResponseInterfacesFor.methods;

    methodsArray.forEach((method) => {
      if (
        !_.isEmpty(method.response) &&
        !codeToReturn.includes(
          `${
            utils.formatClassName(classToGenerateResponseInterfacesFor.name) +
            _.capitalize(method.verb) +
            'ResponseType'
          }`,
        )
      ) {
        switch (method.response?.type) {
          case 'custom':
            // codeToReturn += `export interface ${
            //   utils.formatClassName(classToGenerateResponseInterfacesFor.name) +
            //   _.capitalize(method.verb) +
            //   'ResponseType'
            // } {
            //               ${swaggerToTS.convert(
            //                 method.response
            //                   .schema as swaggerToTS.OpenAPI3Reference,
            //               )}
            //           }

            //           `;
            const interfaceName =
              utils.formatClassName(classToGenerateResponseInterfacesFor.name) +
              _.capitalize(method.verb) +
              'ResponseType';

            const interfacesString: string[] = swaggerToTS.getTsInterfaceFromSwaggerSchema(
              interfaceName,
              method.response.schema,
            );

            // skip interface generation if type is boolean and not properties or items (straight boolean responses)
            if (
              method.response.schema &&
              (method.response.schema!.hasOwnProperty('properties') ||
                method.response.schema!.hasOwnProperty('items'))
            ) {
              codeToReturn += interfacesString.join(`
              `);
            }

            break;
          case 'header':
            codeToReturn += `export interface ${
              utils.formatClassName(classToGenerateResponseInterfacesFor.name) +
              _.capitalize(method.verb) +
              'ResponseType'
            } {
                          header: ${method.response.header}
                      }

                      `;
            break;
          case 'bodyless':
            codeToReturn += `export type ${
              utils.formatClassName(classToGenerateResponseInterfacesFor.name) +
              _.capitalize(method.verb) +
              'ResponseType'
            } = any
            `;
            break;
        }
      }
    });
  }
  return codeToReturn;
};

const generateClassVariables = (
  classToGetVariablesFrom: ConsolidatedClass,
  parentClassType: string = '',
  isRootClass: boolean = false,
) => {
  let codeToReturn = '';
  codeToReturn += `\nprivate currentContext: Object
        `;
  if (isRootClass) {
    codeToReturn += `private fullResponse:boolean = false`;
  }
  if (classToGetVariablesFrom.param) {
    const optionalFlag = classToGetVariablesFrom.param.length > 1 ? '?' : '';
    classToGetVariablesFrom.param
      .filter((x) => x != 'me')
      .forEach((parameter) => {
        if (parameter) {
          codeToReturn += `\n     private ${utils.removeCurlyBraces(
            parameter,
          )}${optionalFlag}:string`;
        }
      });
  }
  if (classToGetVariablesFrom.subclasses) {
    classToGetVariablesFrom.subclasses.forEach((subclass) => {
      if (!subclass.param || _.isEmpty(subclass.param.filter((x) => x))) {
        codeToReturn += `\n${utils
          .formatClassName(subclass.name)
          .toLowerCase()}:${utils.formatClassName(
          subclass.name,
        )}.${utils.formatClassName(subclass.name)}`;
      }
    });
  }
  return codeToReturn;
};

const generateSubClasses = (
  classWithSubclasses: ConsolidatedClass,
  isRootClass: boolean = false,
) => {
  const subClassArray = classWithSubclasses.subclasses;
  const classType = isRootClass ? 'init' : classWithSubclasses.name;
  let codeToReturn: string = '';
  if (subClassArray) {
    subClassArray.forEach((subClass) => {
      codeToReturn += `${generateClass(subClass, classType, false)}

            `;
    });
  }
  return codeToReturn;
};

const generateConstructors = (
  classToGenerateConstructorsFor: ConsolidatedClass,
  parentClassType: string = '',
  isRootClass: boolean = false,
) => {
  let parametersArray: Array<string> =
    classToGenerateConstructorsFor.param || [];
  let codeToReturn: string = '';
  let constructorsDeclaration: Array<string> = [];
  let constructorsParameters = '';
  let initMethod = '';
  constructorsParameters += `
        this.currentContext = {}

    `;
  if (!isRootClass) {
    constructorsDeclaration.push(`parentContext: Object`);
    constructorsParameters += `

        const properties = Object.getOwnPropertyNames(parentContext)
        properties.forEach(property => {
            Object(this.currentContext)[property] = Object(parentContext)[property]
        })

    `;
  } else {
    constructorsParameters += `
        this.fullResponse = fullResponse || false
        `;
  }
  let noInterface: boolean = false;
  let optionalConstructorParam: string = '';
  if (
    classToGenerateConstructorsFor.methods &&
    classToGenerateConstructorsFor.methods.length > 0
  ) {
    if (
      classToGenerateConstructorsFor.methods.some(
        (method) => method.params.length == 0,
      )
    ) {
      // the root class constructor argument should therefore be optional
      // as there might be methods not needing it (POST /org for example)
      optionalConstructorParam = '?';
    }
  }

  if (
    classToGenerateConstructorsFor.param &&
    classToGenerateConstructorsFor.param.filter((x) => x).length > 0
  ) {
    constructorsDeclaration.push(
      `${utils.formatClassName(
        classToGenerateConstructorsFor.name,
      )}param${optionalConstructorParam}:${utils
        .formatClassName(classToGenerateConstructorsFor.name)
        .toLowerCase()}Class`,
    );
  } else {
    noInterface = true;
  }

  parametersArray
    .filter((x) => x != 'me')
    .forEach((parameter) => {
      if (parameter) {
        let defaultValue = '""';

        if (
          classToGenerateConstructorsFor.name == 'user' &&
          parameter == '{userId}'
        ) {
          defaultValue = '"me"';
        }
        constructorsParameters += `
                    this.${utils.removeCurlyBraces(
                      parameter,
                    )} = ${utils.formatClassName(
          classToGenerateConstructorsFor.name,
        )}param${optionalConstructorParam}.${utils.removeCurlyBraces(
          parameter,
        )} || ${defaultValue}
                `;
      }
    });
  constructorsParameters += `const thisProperties = Object.getOwnPropertyNames(this)
        thisProperties.forEach(thisProperty => {
            Object(this.currentContext)[thisProperty] = Object(this)[thisProperty]
        })`;
  if (classToGenerateConstructorsFor.subclasses) {
    classToGenerateConstructorsFor.subclasses.forEach((subclass) => {
      if (subclass.param && !_.isEmpty(subclass.param.filter((x) => x))) {
        initMethod += `\n${utils
          .formatClassName(subclass.name)
          .toLowerCase()} (${utils.formatClassName(
          subclass.name,
        )}param?: ${utils.formatClassName(subclass.name).toLowerCase()}Class){
                        return new ${utils.formatClassName(
                          subclass.name,
                        )}.${utils.formatClassName(
          subclass.name,
        )}(this.currentContext, {${utils.removeCurlyBraces(
          subclass.param
            .filter((x) => x)
            .map(
              (x) =>
                `${x}:${utils.formatClassName(subclass.name)}param?.${x} || ''`,
            )
            .join(','),
        )}})
                    }`;
      } else {
        constructorsParameters += `\nthis.${utils
          .formatClassName(subclass.name)
          .toLowerCase()} = new ${utils.formatClassName(
          subclass.name,
        )}.${utils.formatClassName(subclass.name)}(this.currentContext)`;
      }
    });
  }

  codeToReturn += ` \nconstructor(${constructorsDeclaration.join(',')}${
    constructorsDeclaration.length > 0 ? ',' : ''
  }fullResponse:boolean = false) {
            ${constructorsParameters}
        }
        ${initMethod}
        `;

  return codeToReturn;
};

const generateMethods = (classToGenerateMethodsFor: ConsolidatedClass) => {
  let methodsJson = classToGenerateMethodsFor.methods;
  let codeToReturn = '';
  let methodsMap: Map<string, PreparedMethod> = new Map();
  if (methodsJson) {
    // @ts-ignore
    methodsJson.forEach((method) => {
      let argsList: Array<string> = [];

      if (!_.isEmpty(method.body)) {
        argsList.push(
          `body: ${
            utils.formatClassName(classToGenerateMethodsFor.name) +
            _.capitalize(method.verb) +
            'BodyType'
          }`,
        );
      }

      let paramsCode: Array<string> = [];
      // @ts-ignore
      method.params.forEach((param) => {
        const required = !param.required ? '?' : '';
        paramsCode.push(`${param.name}${required}: ${param.type}`);
      });
      let qsParamsCode: Array<string> = [];
      // @ts-ignore
      method.qsParams.forEach((qsParam) => {
        const required = !qsParam.required ? '?' : '';
        qsParamsCode.push(`${qsParam.name}${required}: ${qsParam.type}`);
        argsList.push(`${qsParam.name}${required}: ${qsParam.type}`);
      });

      let urlForPreparedMethod = `\`${method.url
        .toString()
        .replace(/{/g, "${Object(this.currentContext)['")
        .replace(/}/g, "']}")}\``;

      const currentMethod: PreparedMethod = {
        name: method.verb,
        paramList: paramsCode,
        argsList: argsList,
        url: urlForPreparedMethod,
        response: method.response,
      };
      if (methodsMap.has(method.verb)) {
        let paramList = _.uniq(method.params.concat(method.qsParams));
        let url = method.url;

        let existingMethodParamList = methodsMap.get(method.verb)!.argsList;
        let existingUrl = methodsMap.get(method.verb)?.url;

        let finalMethodParamList: string[] = [];
        if (existingMethodParamList.length == 0 && paramList.length == 0) {
          // Just passing through if no parameters but only different values in the path
          // so far only /user/{usedId}, with userId=me being a special case called out
          // in other words, userId being 'me' or another value if handled in the class constructor
          // so no need to tweak the url
          url = `${existingUrl}`;
        } else if (existingMethodParamList.length > paramList.length) {
          finalMethodParamList = existingMethodParamList;
          const paramListDifference = _.difference(
            existingMethodParamList,
            paramList.map((x) => `${x.name}?: ${x.type}`),
          );
          url = `if(${paramListDifference
            .map((param) => {
              let processedParam = param.split('?')[0].split(':')[0];
              processedParam =
                "`${Object(this.currentContext)['" +
                processedParam +
                "']}` != ''";
              return processedParam;
            })
            .join(' && ')}){
                        url = \`${url
                          .toString()
                          .replace(/{/g, "${Object(this.currentContext)['")
                          .replace(/}/g, "']}")}\`
                    } else {
                        url = ${existingUrl}
                    }`;
        } else {
          finalMethodParamList = paramList.map((x) => `${x.name}?: ${x.type}`);
          const paramListDifference = _.difference(
            paramList.map((x) => `${x.name}?: ${x.type}`),
            existingMethodParamList,
          );
          url = `if(${paramListDifference
            .map((param) => {
              let processedParam = param.split('?')[0].split(':')[0];
              processedParam =
                "`${Object(this.currentContext)['" +
                processedParam +
                "']}` != ''";
              return processedParam;
            })
            .join(' && ')}){
                        url = \`${url
                          .toString()
                          .replace(/{/g, "${Object(this.currentContext)['")
                          .replace(/}/g, "']}")}\`
                    } else {
                        url = ${existingUrl}
                    }`;
        }
        const updatedMethod: PreparedMethod = {
          name: method.verb,
          argsList: currentMethod.argsList,
          url: url,
          response: currentMethod.response,
        };
        methodsMap.set(method.verb, updatedMethod);
      } else {
        const url = `${currentMethod.url}`;
        const updatedMethod: PreparedMethod = {
          name: method.verb,
          paramList: currentMethod.paramList,
          argsList: currentMethod.argsList,
          url: url,
          response: currentMethod.response,
        };
        methodsMap.set(method.verb, updatedMethod);
      }
    });

    methodsMap.forEach((method) => {
      let argsList: Array<string> = [];
      let qsParametersNamesList: Array<string> = [];

      if (method.argsList.some((x) => x.startsWith('body:'))) {
        argsList.push('body: string');
      }
      method.argsList
        .filter((x) => !x.startsWith('body:'))
        .forEach((qsParameterName) => {
          qsParametersNamesList.push(
            qsParameterName.split(':')[0].replace('?', ''),
          );
        });

      let qsIfStatements = '';
      qsParametersNamesList.forEach((qsParameterName) => {
        qsIfStatements += `
                if(${qsParameterName}){
                    urlQueryParams.push('${qsParameterName}='+${qsParameterName})
                }\n`;
      });

      let emptyBodyNeeded = false;
      if (
        (method.name == 'post' || method.name == 'put') &&
        !method.argsList.map((x) => x.split(':')[0]).includes('body')
      ) {
        emptyBodyNeeded = true;
      }

      let returnType =
        method.response?.type == 'bodyless'
          ? 'Promise<any>'
          : 'Promise<' +
            utils.formatClassName(classToGenerateMethodsFor.name) +
            utils.formatClassName(method.name) +
            'ResponseType>';
      if (
        method.response?.type == 'custom' &&
        method.response.schema &&
        !method.response.schema!.hasOwnProperty('properties') &&
        !method.response.schema!.hasOwnProperty('items')
      ) {
        const schemaType = `${
          getObjectKey(
            method.response.schema as { [propKey: string]: string },
            'type',
          ) || 'any'
        }`;

        returnType = `Promise<${schemaType}>`;
      }

      codeToReturn += `
            async ${method.name} (${method.argsList}):${returnType} {
                let url = ''
                let urlQueryParams: Array<string> = []
                ${method.url.startsWith('if') ? '' : 'url = '}${method.url}
                ${qsIfStatements}
                if(urlQueryParams.length > 0){
                    url += \`?\${urlQueryParams.join("&")}\`
                }

                try {
                    const result = await requestManager.request({verb: '${
                      method.name
                    }', url: url ${
        method.argsList.map((x) => x.split(':')[0]).includes('body')
          ? ',body : JSON.stringify(body)'
          : `${emptyBodyNeeded ? ', body: JSON.stringify({})' : ''}`
      }})
                    if(!Object(this.currentContext)['fullResponse'] && result.data){
                        return result.data
                    } else {
                        return result
                    }

                } catch (err) {
                    throw new ClientError(err)
                }

            }
            `;
    });

    return codeToReturn;
  } else {
    return '';
  }
};
const generatePaginationMethods = (
  classToGenerateMethodsFor: ConsolidatedClass,
) => {
  let methodsJson = classToGenerateMethodsFor.methods;
  let codeToReturn = '';

  let methodsMap: Map<string, PreparedMethod> = new Map();
  if (methodsJson) {
    // @ts-ignore
    methodsJson.forEach((method) => {
      let argsList: Array<string> = [];

      if (!_.isEmpty(method.body)) {
        argsList.push(
          `body: ${
            utils.formatClassName(classToGenerateMethodsFor.name) +
            _.capitalize(method.verb) +
            'BodyType'
          }`,
        );
      }

      let paramsCode: Array<string> = [];
      // @ts-ignore
      method.params.forEach((param) => {
        const required = !param.required ? '?' : '';
        paramsCode.push(`${param.name}${required}: ${param.type}`);
      });
      //let qsParamsCode: Array<string> = [];
      // @ts-ignore
      method.qsParams.forEach((qsParam) => {
        const required = !qsParam.required ? '?' : '';
        //qsParamsCode.push(`${qsParam.name}${required}: ${qsParam.type}`);
        argsList.push(`${qsParam.name}${required}: ${qsParam.type}`);
      });

      let urlForPreparedMethod = `\`${method.url
        .toString()
        .replace(/{/g, "${Object(this.currentContext)['")
        .replace(/}/g, "']}")}\``;

      const currentMethod: PreparedMethod = {
        name: method.verb,
        paramList: paramsCode,
        argsList: argsList,
        url: urlForPreparedMethod,
        response: method.response,
      };
      if (methodsMap.has(method.verb)) {
        let paramList = _.uniq(method.params.concat(method.qsParams));
        let url = method.url;

        let existingMethodParamList = methodsMap.get(method.verb)!.argsList;
        let existingUrl = methodsMap.get(method.verb)?.url;

        let finalMethodParamList: string[] = [];
        if (existingMethodParamList.length == 0 && paramList.length == 0) {
          // Just passing through if no parameters but only different values in the path
          // so far only /user/{usedId}, with userId=me being a special case called out
          // in other words, userId being 'me' or another value if handled in the class constructor
          // so no need to tweak the url
          url = `${existingUrl}`;
        } else if (existingMethodParamList.length > paramList.length) {
          finalMethodParamList = existingMethodParamList;
          const paramListDifference = _.difference(
            existingMethodParamList,
            paramList.map((x) => `${x.name}?: ${x.type}`),
          );
          url = `if(${paramListDifference
            .map((param) => {
              let processedParam = param.split('?')[0].split(':')[0];
              processedParam =
                "`${Object(this.currentContext)['" +
                processedParam +
                "']}` != ''";
              return processedParam;
            })
            .join(' && ')}){
                        url = \`${url
                          .toString()
                          .replace(/{/g, "${Object(this.currentContext)['")
                          .replace(/}/g, "']}")}\`
                    } else {
                        url = ${existingUrl}
                    }`;
        } else {
          finalMethodParamList = paramList.map((x) => `${x.name}?: ${x.type}`);
          const paramListDifference = _.difference(
            paramList.map((x) => `${x.name}?: ${x.type}`),
            existingMethodParamList,
          );
          url = `if(${paramListDifference
            .map((param) => {
              let processedParam = param.split('?')[0].split(':')[0];
              processedParam =
                "`${Object(this.currentContext)['" +
                processedParam +
                "']}` != ''";
              return processedParam;
            })
            .join(' && ')}){
                        url = \`${url
                          .toString()
                          .replace(/{/g, "${Object(this.currentContext)['")
                          .replace(/}/g, "']}")}\`
                    } else {
                        url = ${existingUrl}
                    }`;
        }
        const updatedMethod: PreparedMethod = {
          name: method.verb,
          argsList: currentMethod.argsList,
          url: url,
          response: currentMethod.response,
        };
        methodsMap.set(method.verb, updatedMethod);
      } else {
        const url = `${currentMethod.url}`;
        const updatedMethod: PreparedMethod = {
          name: method.verb,
          paramList: currentMethod.paramList,
          argsList: currentMethod.argsList,
          url: url,
          response: currentMethod.response,
        };
        methodsMap.set(method.verb, updatedMethod);
      }
    });

    methodsMap.forEach((method) => {
      let argsList: Array<string> = [];
      let qsParametersNamesList: Array<string> = [];

      if (method.argsList.some((x) => x.startsWith('page'))) {
        if (method.argsList.some((x) => x.startsWith('body:'))) {
          argsList.push('body: string');
        }
        method.argsList
          .filter((x) => !x.startsWith('body:'))
          .filter((x) => !x.startsWith('perPage'))
          .filter((x) => !x.startsWith('page'))
          .forEach((qsParameterName) => {
            qsParametersNamesList.push(
              qsParameterName.split(':')[0].replace('?', ''),
            );
          });
        method.argsList = method.argsList
          .filter((x) => !x.startsWith('perPage'))
          .filter((x) => !x.startsWith('page'));
        method.argsList.push('noLimitMode: boolean = false');

        let qsIfStatements = '';
        qsParametersNamesList.forEach((qsParameterName) => {
          qsIfStatements += `
                if(${qsParameterName}){
                    urlQueryParams.push('${qsParameterName}='+${qsParameterName})
                }\n`;
        });

        let emptyBodyNeeded = false;
        if (
          (method.name == 'post' || method.name == 'put') &&
          !method.argsList.map((x) => x.split(':')[0]).includes('body')
        ) {
          emptyBodyNeeded = true;
        }

        codeToReturn += `
            async ${method.name}All (${method.argsList}):${
          method.response?.type == 'bodyless'
            ? 'Promise<any>'
            : 'Promise<' +
              utils.formatClassName(classToGenerateMethodsFor.name) +
              utils.formatClassName(method.name) +
              'ResponseType[]>'
        } {
                let url = ''
                let urlQueryParams: Array<string> = []
                ${method.url.startsWith('if') ? '' : 'url = '}${method.url}
                ${qsIfStatements}

                let currentPage = 1;
                const PAGELIMIT = 100
                urlQueryParams.push('perPage=' + PAGELIMIT);

                if(urlQueryParams.length > 0){
                    url += \`?\${urlQueryParams.join("&")}\`
                }



                const fullResponseUserSetting = Object(this.currentContext)['fullResponse']
                Object(this.currentContext)['fullResponse'] = true

                try {
                    const firstPageResult = await requestManager.request({verb: '${
                      method.name
                    }', url: url ${
          method.argsList.map((x) => x.split(':')[0]).includes('body')
            ? ',body : JSON.stringify(body)'
            : `${emptyBodyNeeded ? ', body: JSON.stringify({})' : ''}`
        }})
                    Object(this.currentContext)['fullResponse'] = fullResponseUserSetting
                    let totalPages = 1
                    if(firstPageResult.headers.link){
                      totalPages = utils.getTotalPaginationCount(firstPageResult.headers.link)
                    }


                    const bulkRequestArray = []
                    for(let i=1; i<totalPages; i++){
                      currentPage++
                      bulkRequestArray.push({ verb: '${
                        method.name
                      }', url: url+\`&page=\${currentPage}\` ${
          method.argsList.map((x) => x.split(':')[0]).includes('body')
            ? ',body : JSON.stringify(body)'
            : `${emptyBodyNeeded ? ', body: JSON.stringify({})' : ''}`
        }})
                      if(!noLimitMode && currentPage > PAGELIMIT){
                        break;
                      }
                    }

                    let bulkResultsSet: Object[] = []
                    if(bulkRequestArray.length>0){
                      bulkResultsSet = await requestManager.requestBulk(bulkRequestArray)
                    }

                    const resultsSet = [firstPageResult.data, ...bulkResultsSet.map(x=> Object(x)['data'])]


                    return resultsSet

                } catch (err) {
                    throw new ClientError(err)
                }

            }
            `;
      }
    });

    return codeToReturn;
  } else {
    return '';
  }
};

const generateImportsForAbstractionMethods = (
  classToIntegrateAbstractionMethodsIn: ConsolidatedClass,
) => {
  const className = utils
    .formatClassName(classToIntegrateAbstractionMethodsIn.name)
    .toLowerCase();
  if (currentRootClassName != '') {
    const currentAbstractionPath =
      require('path').resolve(__dirname, '..') +
      `/client/abstraction/${utils
        .formatClassName(currentRootClassName)
        .toLowerCase()}`;
    if (
      fs.existsSync(currentAbstractionPath) &&
      fs.existsSync(currentAbstractionPath + `/${className}.js`)
    ) {
      const exportedAbstractionObjects = Object.keys(
        require(currentAbstractionPath + `/${className}.js`),
      );

      const currentAbstractionTypescriptPath =
        require('path').resolve(__dirname, '../../') +
        `/src/lib/client/abstraction/${utils
          .formatClassName(currentRootClassName)
          .toLowerCase()}`;

      const abstractionSrcCode = fs.readFileSync(
        currentAbstractionTypescriptPath + `/${className}.ts`,
      );
      const typeOrInterfaceRegex = /[^\/\/ ]export (type|interface) ([a-zA-Z0-9]+)/g;
      const typeOrInterfaceArray = [
        ...abstractionSrcCode.toString().matchAll(typeOrInterfaceRegex),
      ];
      typeOrInterfaceArray.forEach((exportedTypeOrInterface) => {
        if (
          exportedAbstractionObjects.indexOf(exportedAbstractionObjects[2]) < 0
        ) {
          exportedAbstractionObjects.push(exportedTypeOrInterface[2]);
        }
      });

      return `import { ${exportedAbstractionObjects.join(
        ', ',
      )} } from '../abstraction/${utils
        .formatClassName(currentRootClassName)
        .toLowerCase()}/${className}'`;
    }
  }
  return '';
};

const integrateAbstractionMethods = (
  classToIntegrateAbstractionMethodsIn: ConsolidatedClass,
) => {
  const className = utils
    .formatClassName(classToIntegrateAbstractionMethodsIn.name)
    .toLowerCase();
  if (currentRootClassName != '') {
    const currentAbstractionPath =
      require('path').resolve(__dirname, '..') +
      `/client/abstraction/${utils
        .formatClassName(currentRootClassName)
        .toLowerCase()}`;
    const currentAbstractionTypescriptPath =
      require('path').resolve(__dirname, '../../') +
      `/src/lib/client/abstraction/${utils
        .formatClassName(currentRootClassName)
        .toLowerCase()}`;
    if (
      fs.existsSync(currentAbstractionPath) &&
      fs.existsSync(currentAbstractionPath + `/${className}.js`)
    ) {
      const exportedAbstractionMethods = Object.keys(
        require(currentAbstractionPath + `/${className}.js`),
      );
      const abstractionSrcCode = fs.readFileSync(
        currentAbstractionTypescriptPath + `/${className}.ts`,
      );

      return exportedAbstractionMethods
        .map((abstractionMethodName) => {
          let methodArguments = abstractionSrcCode
            .toString()
            .split(abstractionMethodName)[1];
          methodArguments = methodArguments.split(')')[0];
          methodArguments = methodArguments.split('(')[1];
          methodArguments = methodArguments
            .replace('classContext: Object,', '')
            .replace(/ /g, '');

          let returnType = abstractionSrcCode
            .toString()
            .split(abstractionMethodName)[1];
          returnType = returnType.split(')')[1];
          returnType = returnType.split(':')[1];
          returnType = returnType.split('>')[0] + '>';

          return `async ${abstractionMethodName} (${methodArguments}):${returnType} {
          return await ${abstractionMethodName}(Object(this.currentContext)${
            methodArguments != '' ? ',' : ''
          }${methodArguments.split(':')[0]})
        }`;
        })
        .join(`\n`);
    }
  }
  return '';
};
let requestManagerSettings = "{userAgentPrefix: 'snyk-api-ts-client'}";
if (process.argv.slice(2).length > 0) {
  console.log('INFORMATION => Generating classes with test settings !');
  requestManagerSettings = `{ burstSize: 100, period: 100, maxRetryCount: 10, userAgentPrefix: 'snyk-api-ts-client' }`;
}
const parsedJSON = JSON.parse(preparedJson) as Array<ConsolidatedClass>;
const initLines = `
import { ClientError } from '../errors/clientError'
import { requestsManager } from 'snyk-request-manager'
import * as utils from '../utils/utils'

const requestManager = new requestsManager(${requestManagerSettings})

`;

parsedJSON.forEach((classItem) => {
  const classCode = generateClass(classItem);
  fs.writeFileSync(
    path.join('./src/lib/client/generated/' + classItem.name + '.ts'),
    initLines + abstractionImportsArray.join(`\n`) + '\n' + classCode,
  );
});
