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
    const promise = utils.getProjectUUID('Playground', 'goof');

    mockAxios.mockResponseFor(
      { url: `/org/Playground/projects` },
      { data: JSON.parse(fixtures.toString()), status: 200 },
    );

    const result: string = await promise;

    expect(result).toEqual('ab9e037f-9020-4f77-9c48-b1cb0295a4b6');
  });

  it('Testing getTotalPaginationCount', async () => {
    const headerLinkLine =
      'link: <https://snyk.io/api/v1/reporting/issues/latest?page=4125>; rel=last, <https://snyk.io/api/v1/reporting/issues/latest?page=2>; rel=next';
    const lastPageCount = utils.getTotalPaginationCount(headerLinkLine);
    expect(lastPageCount).toEqual(4125);
  });
});
