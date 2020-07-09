import * as utils from '../../src/lib/index'
import nock from 'nock';

beforeEach(() => {
  return nock('https://snyk.io')
    .persist()
    .post(/./)
    .replyWithFile(200, 'test/fixtures/utils/allProjects.json', {
        'Content-Type': 'application/json',
      })
});

describe('Testing utils', () => {
    it('Testing getProjectUUID', async () => {
      const result = await utils.getProjectUUID('Playground','goof')
      expect(result).toEqual('ab9e037f-9020-4f77-9c48-b1cb0295a4b6');
    });

    it('Testing getProjectUUID - no match', async () => {
        try {
            const result = await utils.getProjectUUID('Playground','wronggoof')
        } catch (err) {
            expect(err).toBeInstanceOf(Error)
        }
    });

    it('Testing getProjectUUID - multiple matches', async () => {
      try {
          const result = await utils.getProjectUUID('Playground','multiplegoof')
      } catch(err) {
        expect(err).toBeInstanceOf(Error)
      }
    });
})