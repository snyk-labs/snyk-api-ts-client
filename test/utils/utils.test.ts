import * as utils from '../../src/lib/index';
import * as fs from 'fs';
import { AxiosResponse } from 'axios';
import mockAxios from 'jest-mock-axios';
afterEach(() => {
  mockAxios.reset();
});


const fixtures = fs.readFileSync('test/fixtures/utils/allProjects.json');

describe('Testing utils', () => {
  it('Testing getProjectUUID', async () => {
    const axiosResponse: AxiosResponse = {
      data: JSON.parse(fixtures.toString()),
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    const promise = utils.getProjectUUID('Playground', 'goof');

    mockAxios.mockResponseFor(
      { url: `/org/Playground/projects` },
      axiosResponse,
    );

    const result: string = await promise;

    expect(result).toEqual('ab9e037f-9020-4f77-9c48-b1cb0295a4b6');
  });
});
