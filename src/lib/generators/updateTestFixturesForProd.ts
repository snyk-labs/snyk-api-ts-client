import * as fs from 'fs';
import * as _ from 'lodash';

export const updateFixtures = async (testCasesFolderPath: string) => {
  const testFilesList = fs.readdirSync(testCasesFolderPath);
  testFilesList.forEach((testFile) => {
    const classFileContent = fs
      .readFileSync(testCasesFolderPath + '/' + testFile)
      .toString();
    const regex = /fixtures\.[a-zA-Z0-9\.]+/g;
    const fixturesList = _.uniq(classFileContent.match(regex));

    const className = testFile.replace('.test.ts', '');
    const jsonFixturesList = convertListIntoJson(fixturesList);

    if (fs.existsSync(`./test/fixtures/${className}.json`)) {
      const existingFixtures = JSON.parse(
        fs.readFileSync(`./test/fixtures/${className}.json`).toString(),
      );
      const mergedFixtures = _.merge(jsonFixturesList, existingFixtures);
      fs.writeFileSync(
        `./test/fixtures/${className}.json`,
        JSON.stringify(mergedFixtures),
      );
    } else {
      fs.writeFileSync(
        `./test/fixtures/${className}.json`,
        JSON.stringify(jsonFixturesList),
      );
    }
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
    Object(currentObject)[splitFixture[0]] = '';
  }
  return currentObject;
};
// const convertFixtureLineIntoJson = (fixture: string): string => {
//     const splitFixture = fixture.split('.')
//     if(splitFixture.length > 1) {
//         return `${splitFixture[0]}: { ${convertFixtureLineIntoJson(splitFixture.slice(1).join('.'))} }`
//     } else {
//         return `${splitFixture[0]}: ''`
//     }
// }

updateFixtures('./test/lib');
