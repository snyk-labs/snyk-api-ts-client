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
const depGraphFixturesWithoutBinaryVuln = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/depgraphWithoutBinaryVulns-goof.json',
);
const aggregatedIssuesFixturesWithBinaryVuln = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/aggregatedIssuesWithBinaryVulns-goof.json',
);
const aggregatedIssuesWithBinaryWithVulnFixtures = fs.readFileSync(
  path.resolve(__dirname, '../..') +
    '/fixtures/abstraction/org/aggregatedIssuesWithBinaryVulnsWithVulnPaths-goof.json',
);

beforeAll(() => {
  return nock('https://snyk.io')
    .persist()
    .post(/.*/)
    .reply(200, (uri) => {
      switch (uri) {
        case '/api/v1/org/123/project/123/aggregated-issues':
          return aggregatedIssuesFixtures;
        case '/api/v1/org/123/project/456/aggregated-issues':
          return aggregatedIssuesFixturesWithBinaryVuln;
        default:
      }
    })
    .get(/.*/)
    .reply(200, (uri) => {
      switch (uri) {
        case '/api/v1/org/123/project/123/dep-graph':
          return depGraphFixtures;
        case '/api/v1/org/123/project/456/dep-graph':
          return depGraphFixturesWithoutBinaryVuln;
        default:
      }
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

  it('Testing getAggregatedIssuesWithVulnsPaths with binary vulns not in graph', async () => {
    const body = { filters: {} };

    const result = await new Org({ orgId: '123' })
      .project({ projectId: '456' })
      .aggregatedissues.getAggregatedIssuesWithVulnPaths(body);

    expect(
      _.isEqual(
        result,
        JSON.parse(aggregatedIssuesWithBinaryWithVulnFixtures.toString()),
      ),
    ).toBeTruthy();
  });
});
