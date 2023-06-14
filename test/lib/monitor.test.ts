import { Monitor, MonitorTypes } from '../../src/lib/index';
import { AxiosResponse } from 'axios';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/monitor.json').fixtures;

describe('Testing Monitor class', () => {
  it('Testing endpoint: /monitor/dep-graph - POST method', async () => {
    try {
      const response: MonitorTypes.DepgraphPostResponseType = JSON.parse(
        fixtures.response.depgraph.post,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

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

      const result = await new Monitor().depgraph.post(
        fixtures.request.depgraph.post.body,
        fixtures.request.depgraph.post.org,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
});
