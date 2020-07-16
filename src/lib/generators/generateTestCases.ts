import * as fs from 'fs';
import * as _ from 'lodash';
import { ConsolidatedClass } from './generate';

export const generateTestCases = async (preparedJsonPath: string) => {
  const preparedJson = fs.readFileSync(preparedJsonPath).toString();

  const parsedPreparedJson = JSON.parse(preparedJson) as ConsolidatedClass[];
  const commandsArray: Array<Array<string>> = [];
  parsedPreparedJson.forEach((classItem) => {
    extractCommandDetailsFromClass(classItem, commandsArray, '', true);
  });

  generateTestFiles(commandsArray);
};

const formatClassName = (classNameToFormat: string): string => {
  return _.capitalize(classNameToFormat.replace('-', ''));
};

const extractCommandDetailsFromClass = (
  classItem: ConsolidatedClass,
  commandsArray: Array<Array<string>>,
  parentCommand: string,
  isRootClass: boolean = false,
) => {
  let command = parentCommand != '' ? `${parentCommand}.` : '';
  command += isRootClass
    ? formatClassName(classItem.name)
    : formatClassName(classItem.name).toLowerCase();
  if (classItem.param && classItem.param?.filter((x) => x).length > 0) {
    command += `(${classItem.param.filter((x) => x).join(',')})`;
  } else if (isRootClass) {
    command += '()';
  }
  classItem.methods?.forEach((method) => {
    const listOfParams: Array<string> = [];
    if (method.params.length > 0) {
      method.params.forEach((param) => {
        // const fullParam = `${param.name}${param.required == true ? '?' : ''}:${
        //   param.type
        // }`;
        //const fullParam = `${param.name}${param.required == true ? '?' : ''}`;
        const fullParam = `${param.name}`;
        listOfParams.push(fullParam);
      });
    }
    if (method.qsParams.length > 0) {
      method.qsParams.forEach((qsParam) => {
        // const fullQsParam = `${qsParam.name}${
        //   qsParam.required == true ? '?' : ''
        // }:${qsParam.type}`;
        // const fullQsParam = `${qsParam.name}${
        //     qsParam.required == true ? '?' : ''
        //   }`;
        const fullQsParam = `${qsParam.name}`;
        listOfParams.push(fullQsParam);
      });
    }

    let commandWithFilteredParameters = command;
    let listOfParamsToRemoveFromMethodArgs: Array<string> = [];
    // pull all the arguments in the extended command line into array. nuke the ones not in listOfParams.
    let regexp = /\{[a-zA-Z0-9]+\}/g;
    const argumentsInCommand = [...command.matchAll(regexp)];
    argumentsInCommand.forEach((argument) => {
      if (
        listOfParams
          .map((x) => x.split(':')[0])
          .map((x) => x.split('?')[0])
          .indexOf(argument[0].replace('{', '').replace('}', '')) < 0
      ) {
        commandWithFilteredParameters = commandWithFilteredParameters.replace(
          argument[0],
          '',
        );
        commandWithFilteredParameters = commandWithFilteredParameters
          .replace('(,', '(')
          .replace(',)', ')')
          .replace(',,', ',');
        //commandWithFilteredParameters = commandWithFilteredParameters.replace("()","")
      } else {
        listOfParamsToRemoveFromMethodArgs.push(
          argument[0].replace('{', '').replace('}', ''),
        );
      }
    });

    listOfParamsToRemoveFromMethodArgs.forEach((toRemove) => {
      _.remove(listOfParams, (x) => {
        return toRemove == x.split(':')[0].split('?')[0];
      });
    });

    if (method.verb == 'put' || method.verb == 'post') {
      listOfParams.unshift('body');
    }

    commandWithFilteredParameters = commandWithFilteredParameters.replace(
      '{userId},me',
      '{userId}',
    );
    commandWithFilteredParameters = commandWithFilteredParameters.replace(
      /\{([a-zA-Z0-9]+)}/g,
      '{$1:$1}',
    );
    commandWithFilteredParameters = commandWithFilteredParameters.replace(
      /\},\{/g,
      ',',
    );
    commandWithFilteredParameters = commandWithFilteredParameters.replace(
      /\(me\)/g,
      '({userId:"me"})',
    );

    commandsArray.push([
      commandWithFilteredParameters +
        `.${method.verb}(${listOfParams.join(',')})`,
      method.url,
    ]);
  });
  if (classItem.subclasses) {
    classItem.subclasses.forEach((subclass) =>
      extractCommandDetailsFromClass(subclass, commandsArray, command, false),
    );
  }
};

const generateTestFiles = (commandArray: Array<Array<string>>) => {
  const classList = fs.readdirSync('./src/lib/client/generated/');
  classList
    .filter((x) => x.endsWith('.ts'))
    .map((x) => x.replace('.ts', ''))
    .forEach((className) => {
      const commandList = commandArray.filter((x) =>
        x[0].startsWith(_.capitalize(className) + '('),
      );
      generateTestFile(className, commandList);
    });

  // commandArray.forEach(command)
  // let codeToReturn = ''
};

const extractBodyTypeFromCommand = (command: string): string => {
  const splitCommand = command.split('.');
  // length-1 of that array gives the number of subclasses we need to go through
  splitCommand.shift();
  const readyToComposeCommandHierarchy = splitCommand.map((x) =>
    _.capitalize(x.split('(')[0]),
  );
  const namespacePath = readyToComposeCommandHierarchy
    .slice(0, readyToComposeCommandHierarchy.length - 2)
    .join('.');
  const typeName =
    readyToComposeCommandHierarchy
      .slice(
        readyToComposeCommandHierarchy.length - 2,
        readyToComposeCommandHierarchy.length,
      )
      .join('') + 'BodyType';
  return namespacePath != '' ? `${namespacePath}.${typeName}` : `${typeName}`;
};

const extractResponseTypeFromCommand = (command: string): string => {
  const splitCommand = command.split('.');
  // length-1 of that array gives the number of subclasses we need to go through
  if (splitCommand.length > 2) {
    splitCommand.shift();
  }
  const readyToComposeCommandHierarchy = splitCommand.map((x) =>
    _.capitalize(x.split('(')[0]),
  );

  const namespacePath = readyToComposeCommandHierarchy
    .slice(0, readyToComposeCommandHierarchy.length - 2)
    .join('.');
  const typeName =
    readyToComposeCommandHierarchy
      .slice(
        readyToComposeCommandHierarchy.length - 2,
        readyToComposeCommandHierarchy.length,
      )
      .join('') + 'ResponseType';
  return namespacePath != '' ? `${namespacePath}.${typeName}` : `${typeName}`;
};

const generateTestFile = (
  className: string,
  commandList: Array<Array<string>>,
) => {
  const testFullFilename = './test/lib/' + className + '.test.ts';
  let codeToReturn = '';
  codeToReturn += `import {${_.capitalize(className)}, ${_.capitalize(
    className,
  )}Types} from '../../src/lib/index'
    `;
  codeToReturn += `import { AxiosResponse } from "axios"
  import mockAxios from 'jest-mock-axios'
  afterEach(() => {
    mockAxios.reset();
  });
  `;
  const namespacesToImport: Array<string> = [];
  commandList.forEach((command) => {
    if (command[0].indexOf('.put(') > 0 || command[0].indexOf('.post(') > 0) {
      const namespaceName = extractBodyTypeFromCommand(command[0])
        .split('.')
        .filter((x) => x)[0];
      if (!namespacesToImport.includes(namespaceName)) {
        namespacesToImport.push(namespaceName);
      }
    }
  });
  commandList.forEach((command) => {
    const namespaceName = extractResponseTypeFromCommand(command[0])
      .split('.')
      .filter((x) => x)[0];

    if (!namespacesToImport.includes(namespaceName)) {
      namespacesToImport.push(namespaceName);
    }
  });
  // codeToReturn += `import {${namespacesToImport.join(
  //   ',',
  // )}} from '../../src/lib/index'
  // `;
  codeToReturn += `const fixtures = require('../fixtures/${className}.json').fixtures

  `;

  // codeToReturn += `import nock from 'nock';`;
  // codeToReturn += `
  // beforeEach(() => {
  //   return nock('https://snyk.io')
  //   .persist()
  //   .get(/./)
  //   .reply(200, (uri: string) => {
  //           return uri
  //   })
  //   .put(/./)
  //   .reply(200, (uri: string, requestBody: Record<string, any>) => {
  //         return {"uri": uri, "body": requestBody}
  //   })
  //   .post(/./)
  //   .reply(200, (uri: string, requestBody: Record<string, any>) => {
  //         return {"uri": uri, "body": requestBody}
  //   })
  //   .delete(/./)
  //   .reply(200, (uri: string) => {
  //         return uri
  //   })
  // })
  // `;

  codeToReturn += `describe('Testing ${_.capitalize(className)} class', () => {
        `;
  commandList.forEach((command) => {
    const commandMethod: string = command[0]
      .split('.')
      [command[0].split('.').length - 1].split('(')[0];
    const commandMethodArguments: Array<string> = command[0]
      .split('.')
      [command[0].split('.').length - 1].split('(')[1]
      .split(')')[0]
      .split(',');
    const commandCoordinates: Array<string> = command[0]
      .split('.')
      .map((x) => x.split('(')[0]);
    commandCoordinates.shift();

    codeToReturn += `   it('Testing endpoint: ${
      command[1]
    } - ${commandMethod.toUpperCase()} method', async () => {
            
      try {
        `;

    codeToReturn += `
      const response: ${_.capitalize(
        className,
      )}Types.${extractResponseTypeFromCommand(
      command[0],
    )} = fixtures.response.${commandCoordinates.join('.')}
      
    
    const axiosResponse: AxiosResponse = {
      data: response,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {}
    };
    `;

    if (commandMethod == 'put' || commandMethod == 'post') {
      // extract the namespace(s) from command after the first class instantiation
      const bodyType = extractBodyTypeFromCommand(command[0]);

      //   codeToReturn += `const body: ${bodyType} = {body:fixtures.request.body.${commandCoordinates.join('.')}}
      //         `;
    }
    let url = command[1].replace(/{/g, '${fixtures.request.');

    if (
      commandMethodArguments.filter((x) => x != 'body' && x != '').length > 0
    ) {
      url +=
        '?' +
        commandMethodArguments
          .filter((x) => x != 'body')
          .map(
            (x) =>
              `${x}=\$\{fixtures.request.${commandCoordinates.join('.')}.` +
              x +
              '}',
          )
          .join('&');
    }
    const body = commandMethodArguments
      .filter((x) => x == 'body')
      .map((x) => `fixtures.request.${commandCoordinates.join('.')}.` + x);

    codeToReturn += `const promise = new ${command[0]
      .replace(/:([a-zA-Z0-9]+)/g, `:fixtures.$1`)
      .replace(
        `${
          commandMethodArguments[0] != ''
            ? commandMethodArguments.join(',')
            : '###'
        }`,
        commandMethodArguments
          .map((x) => `fixtures.request.${commandCoordinates.join('.')}.` + x)
          .join(','),
      )}

      `;
    codeToReturn += `
      mockAxios.mockResponseFor({url: \`${url}\`},axiosResponse);

      expect(mockAxios.${commandMethod}).toHaveBeenCalledWith(\`${url}\`${
      body.join() == '' ? '' : ', JSON.stringify(' + body.join() + ')'
    })

    
      const result:${_.capitalize(
        className,
      )}Types.${extractResponseTypeFromCommand(command[0])} = await promise
      
      expect(result).toEqual(
        response,
      );
      `;
    //                     ${
    //                       commandMethod.toUpperCase() == 'GET' ||
    //                       commandMethod.toUpperCase() == 'DELETE'
    //                         ? 'expect(result).toEqual(`/api/v1' + url + '`)'
    //                         : 'expect(result.uri).toEqual(`/api/v1' +
    //                           url +
    //                           '`)'
    //                     }
    //                     ${
    //                       commandMethod.toUpperCase() == 'PUT' ||
    //                       commandMethod.toUpperCase() == 'POST'
    //                         ? 'expect(result.body).toEqual(' + body + ')'
    //                         : ''
    //                     }
    // `;
    codeToReturn += `
  } catch(err) {
    throw new Error(err)
  }
   })
        `;
  });
  codeToReturn += `})
    `;
  fs.writeFileSync(testFullFilename, codeToReturn);
};

generateTestCases('./snyk-prepared.json');
