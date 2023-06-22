import * as fs from 'fs';
import * as path from 'path';
import { Org } from '../../../src/lib';
import * as _ from 'lodash';
import nock from 'nock';
jest.unmock('axios');

const projectsPage1Fixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/projectsv3.json',
);

const projectsPage2Fixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/projectsv3-page2.json',
);
const projectsPage3Fixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/projectsv3-page3.json',
);

const expectedResults = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/projectsV3toV1.json',
);

beforeAll(() => {
  return nock('https://api.snyk.io/rest')
    .persist()
    .get(/.*/)
    .reply(200, (uri) => {
      switch (uri) {
        case '/rest/orgs/361fd3c0-41d4-4ea4-ba77-09bb17890967/projects?version=2023-05-29&limit=10':
          return projectsPage1Fixtures;
        case '/rest/orgs/361fd3c0-41d4-4ea4-ba77-09bb17890967/projects?version=2023-05-29&limit=10&starting_after=v1.eyJpZCI6MzU2NTI5Mzd9':
          return projectsPage2Fixtures;
        case '/rest/orgs/361fd3c0-41d4-4ea4-ba77-09bb17890967/projects?version=2023-05-29&limit=10&starting_after=v1.eyJpZCI6NjQyMjIxfQ%3D%3D':
          return projectsPage3Fixtures;
        default:
      }
    });
});

describe('Testing org abstraction ', () => {
  it('Testing Projects getV3', async () => {
    const result = await new Org({
      orgId: '361fd3c0-41d4-4ea4-ba77-09bb17890967',
    }).projects.getV3();

    expect(result).toEqual(JSON.parse(expectedResults.toString()));
  });
});
