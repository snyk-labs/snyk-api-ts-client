import { Reporting, ReportingTypes } from '../../src/lib/index';
import { AxiosResponse } from 'axios';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/reporting.json').fixtures;

describe('Testing Reporting class', () => {
  it('Testing endpoint: /reporting/issues/ - POST method', async () => {
    try {
      const response: ReportingTypes.IssuesPostResponseType = JSON.parse(
        fixtures.response.issues.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().issues.post(
        fixtures.request.issues.post.body,
        fixtures.request.issues.post.from,
        fixtures.request.issues.post.to,
        fixtures.request.issues.post.page,
        fixtures.request.issues.post.perPage,
        fixtures.request.issues.post.sortBy,
        fixtures.request.issues.post.order,
        fixtures.request.issues.post.groupBy,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/issues/latest - POST method', async () => {
    try {
      const response: ReportingTypes.Issues.LatestPostResponseType = JSON.parse(
        fixtures.response.issues.latest.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().issues.latest.post(
        fixtures.request.issues.latest.post.body,
        fixtures.request.issues.latest.post.page,
        fixtures.request.issues.latest.post.perPage,
        fixtures.request.issues.latest.post.sortBy,
        fixtures.request.issues.latest.post.order,
        fixtures.request.issues.latest.post.groupBy,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/counts/issues - POST method', async () => {
    try {
      const response: ReportingTypes.Counts.IssuesPostResponseType = JSON.parse(
        fixtures.response.counts.issues.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().counts.issues.post(
        fixtures.request.counts.issues.post.body,
        fixtures.request.counts.issues.post.from,
        fixtures.request.counts.issues.post.to,
        fixtures.request.counts.issues.post.groupBy,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/counts/issues/latest - POST method', async () => {
    try {
      const response: ReportingTypes.Counts.Issues.LatestPostResponseType = JSON.parse(
        fixtures.response.counts.issues.latest.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().counts.issues.latest.post(
        fixtures.request.counts.issues.latest.post.body,
        fixtures.request.counts.issues.latest.post.groupBy,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/counts/projects - POST method', async () => {
    try {
      const response: ReportingTypes.Counts.ProjectsPostResponseType = JSON.parse(
        fixtures.response.counts.projects.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().counts.projects.post(
        fixtures.request.counts.projects.post.body,
        fixtures.request.counts.projects.post.from,
        fixtures.request.counts.projects.post.to,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/counts/projects/latest - POST method', async () => {
    try {
      const response: ReportingTypes.Counts.Projects.LatestPostResponseType = JSON.parse(
        fixtures.response.counts.projects.latest.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().counts.projects.latest.post(
        fixtures.request.counts.projects.latest.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/counts/tests - POST method', async () => {
    try {
      const response: ReportingTypes.Counts.TestsPostResponseType = JSON.parse(
        fixtures.response.counts.tests.post,
      );

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().counts.tests.post(
        fixtures.request.counts.tests.post.body,
        fixtures.request.counts.tests.post.from,
        fixtures.request.counts.tests.post.to,
        fixtures.request.counts.tests.post.groupBy,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/issues/ - POSTALL method', async () => {
    try {
      const response: ReportingTypes.IssuesPostResponseType = JSON.parse(
        fixtures.response.issues.postAll,
      );

      const responseArray: ReportingTypes.IssuesPostResponseType[] = [];
      responseArray.push(response);

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().issues.postAll(
        fixtures.request.issues.postAll.body,
        fixtures.request.issues.postAll.from,
        fixtures.request.issues.postAll.to,
        fixtures.request.issues.postAll.sortBy,
        fixtures.request.issues.postAll.order,
        fixtures.request.issues.postAll.groupBy,
      );

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /reporting/issues/latest - POSTALL method', async () => {
    try {
      const response: ReportingTypes.Issues.LatestPostResponseType = JSON.parse(
        fixtures.response.issues.latest.postAll,
      );

      const responseArray: ReportingTypes.Issues.LatestPostResponseType[] = [];
      responseArray.push(response);

      nock('https://snyk.io')
        .persist()
        .post(/.*/)
        .reply(200, () => {
          return response;
        })
        .put(/.*/)
        .reply(200, () => {
          return response;
        })
        .delete(/.*/)
        .reply(200, () => {
          return response;
        })
        .get(/.*/)
        .reply(200, () => {
          return response;
        });

      const result = await new Reporting().issues.latest.postAll(
        fixtures.request.issues.latest.postAll.body,
        fixtures.request.issues.latest.postAll.sortBy,
        fixtures.request.issues.latest.postAll.order,
        fixtures.request.issues.latest.postAll.groupBy,
      );

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
});
