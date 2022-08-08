import { User, UserTypes } from '../../src/lib/index';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/user.json').fixtures;

describe('Testing User class', () => {
  it('Testing endpoint: /user/{userId} - GET method', async () => {
    try {
      const response: UserTypes.UserGetResponseType = JSON.parse(
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

      const result = await new User({ userId: fixtures.userId }).get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /user/me - GET method', async () => {
    try {
      const response: UserTypes.UserGetResponseType = JSON.parse(
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

      const result = await new User({ userId: 'me' }).get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /user/me/notification-settings/org/{orgId} - GET method', async () => {
    try {
      const response: UserTypes.Notificationsettings.OrgGetResponseType = JSON.parse(
        fixtures.response.notificationsettings.org.get,
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

      const result = await new User({ userId: 'me' }).notificationsettings
        .org({ orgId: fixtures.orgId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /user/me/notification-settings/org/{orgId} - PUT method', async () => {
    try {
      const response: UserTypes.Notificationsettings.OrgPutResponseType = JSON.parse(
        fixtures.response.notificationsettings.org.put,
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

      const result = await new User({ userId: 'me' }).notificationsettings
        .org({ orgId: fixtures.orgId })
        .put(fixtures.request.notificationsettings.org.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /user/me/notification-settings/org/{orgId}/project/{projectId} - GET method', async () => {
    try {
      const response: UserTypes.Notificationsettings.Org.ProjectGetResponseType = JSON.parse(
        fixtures.response.notificationsettings.org.project.get,
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

      const result = await new User({ userId: 'me' }).notificationsettings
        .org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /user/me/notification-settings/org/{orgId}/project/{projectId} - PUT method', async () => {
    try {
      const response: UserTypes.Notificationsettings.Org.ProjectPutResponseType = JSON.parse(
        fixtures.response.notificationsettings.org.project.put,
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

      const result = await new User({ userId: 'me' }).notificationsettings
        .org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .put(fixtures.request.notificationsettings.org.project.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
});
