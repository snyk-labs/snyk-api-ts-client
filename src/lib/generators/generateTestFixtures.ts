import * as fs from 'fs';
import * as _ from 'lodash';

export const generateFixtures = async (testCasesFolderPath: string) => {
  const testFilesList = fs.readdirSync(testCasesFolderPath);
  testFilesList
    .filter((x) => x.endsWith('.test.ts'))
    .forEach((testFile) => {
      const classFileContent = fs
        .readFileSync(testCasesFolderPath + '/' + testFile)
        .toString();
      const regex = /fixtures\.[a-zA-Z0-9\.]+/g;
      const fixturesList = _.uniq(classFileContent.match(regex));

      const className = testFile.replace('.test.ts', '');
      const jsonFixturesList = convertListIntoJson(fixturesList);

      fs.writeFileSync(
        `./test/fixtures/${className}.json`,
        JSON.stringify(jsonFixturesList),
      );
    });
};

const convertListIntoJson = (fixturesList: Array<string>): Object => {
  let jsonFixturesList: Object = {};
  fixturesList.forEach((fixture) => {
    jsonFixturesList = _.merge(getFixtureIntoObject(fixture), jsonFixturesList);
  });
  return jsonFixturesList;
};

const getFixtureIntoObject = (fixture: string): Object => {
  let currentObject = {}; //jsonObjectToAddTo
  const splitFixture = fixture.split('.');
  if (splitFixture.length > 1) {
    if (!currentObject.hasOwnProperty(splitFixture[0])) {
      Object(currentObject)[splitFixture[0]] = {};
    }
    Object(currentObject)[splitFixture[0]] = getFixtureIntoObject(
      splitFixture.slice(1).join('.'),
    );
  } else {
    if (splitFixture[0] == 'body') {
      Object(currentObject)[splitFixture[0]] = { filter: {} };
    } else {
      Object(currentObject)[splitFixture[0]] = '123';
    }
  }
  return currentObject;
};

generateFixtures('./test/lib');
