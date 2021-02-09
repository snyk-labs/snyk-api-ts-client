import * as fs from 'fs';
import * as path from 'path';
import { Org } from '../../../src/lib';
import * as _ from 'lodash';
import nock from 'nock';
jest.unmock('axios');

const aggregatedIssuesFixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/aggregatedIssues-goof.json',
);
const depGraphFixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/depgraph-goof.json',
);
const aggregatedIssuesWithVulnFixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/aggregatedIssuesWithVulnPaths-goof.json',
);

beforeAll(() => {
  return nock('https://snyk.io')
    .persist()
    .post(/.*/)
    .reply(200, () => {
      return aggregatedIssuesFixtures;
    })
    .get(/.*/)
    .reply(200, () => {
      return depGraphFixtures;
    });
});

describe('Testing org abstraction ', () => {
  it('Testing getAggregatedIssuesWithVulnsPaths', async () => {
    const body = { filters: {} };

    const result = await new Org({ orgId: '123' })
      .project({ projectId: '123' })
      .aggregatedissues.getAggregatedIssuesWithVulnPaths(body);
    expect(
      _.isEqual(
        result,
        JSON.parse(aggregatedIssuesWithVulnFixtures.toString()),
      ),
    ).toBeTruthy();
  });
});
