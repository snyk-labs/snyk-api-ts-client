import { Orgs, OrgsTypes } from '../../src/lib/index';
import { AxiosResponse } from 'axios';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/orgs.json').fixtures;

describe('Testing Orgs class', () => {
  it('Testing endpoint: /orgs - GET method', async () => {
    try {
      const response: OrgsTypes.OrgsGetResponseType = JSON.parse(
        fixtures.response.get,
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

      const result = await new Orgs().get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
});
