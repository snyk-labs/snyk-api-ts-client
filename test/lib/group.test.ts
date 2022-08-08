import { Group, GroupTypes } from '../../src/lib/index';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/group.json').fixtures;

describe('Testing Group class', () => {
  it('Testing endpoint: /group/{groupId}/settings - GET method', async () => {
    try {
      const response: GroupTypes.SettingsGetResponseType = JSON.parse(
        fixtures.response.settings.get,
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).settings.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/settings - PUT method', async () => {
    try {
      const response: GroupTypes.SettingsPutResponseType = JSON.parse(
        fixtures.response.settings.put,
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).settings.put(fixtures.request.settings.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/members - GET method', async () => {
    try {
      const response: GroupTypes.MembersGetResponseType = JSON.parse(
        fixtures.response.members.get,
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).members.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/org/{orgId}/members - POST method', async () => {
    try {
      const response: GroupTypes.Org.MembersPostResponseType = JSON.parse(
        fixtures.response.org.members.post,
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

      const result = await new Group({ groupId: fixtures.groupId })
        .org({ orgId: fixtures.orgId })
        .members.post(fixtures.request.org.members.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/tags - GET method', async () => {
    try {
      const response: GroupTypes.TagsGetResponseType = JSON.parse(
        fixtures.response.tags.get,
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

      const result = await new Group({ groupId: fixtures.groupId }).tags.get(
        fixtures.request.tags.get.perPage,
        fixtures.request.tags.get.page,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/tags/delete - POST method', async () => {
    try {
      const response: GroupTypes.Tags.DeletePostResponseType = JSON.parse(
        fixtures.response.tags.delete.post,
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).tags.delete.post(fixtures.request.tags.delete.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/orgs - GET method', async () => {
    try {
      const response: GroupTypes.OrgsGetResponseType = JSON.parse(
        fixtures.response.orgs.get,
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

      const result = await new Group({ groupId: fixtures.groupId }).orgs.get(
        fixtures.request.orgs.get.perPage,
        fixtures.request.orgs.get.page,
        fixtures.request.orgs.get.name,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/roles - GET method', async () => {
    try {
      const response: GroupTypes.RolesGetResponseType = JSON.parse(
        fixtures.response.roles.get,
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

      const result = await new Group({ groupId: fixtures.groupId }).roles.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/audit - POST method', async () => {
    try {
      const response: GroupTypes.AuditPostResponseType = JSON.parse(
        fixtures.response.audit.post,
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

      const result = await new Group({ groupId: fixtures.groupId }).audit.post(
        fixtures.request.audit.post.body,
        fixtures.request.audit.post.from,
        fixtures.request.audit.post.to,
        fixtures.request.audit.post.page,
        fixtures.request.audit.post.sortOrder,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/tags - GETALL method', async () => {
    try {
      const response: GroupTypes.TagsGetResponseType = JSON.parse(
        fixtures.response.tags.getAll,
      );

      const responseArray: GroupTypes.TagsGetResponseType[] = [];
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).tags.getAll();

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/orgs - GETALL method', async () => {
    try {
      const response: GroupTypes.OrgsGetResponseType = JSON.parse(
        fixtures.response.orgs.getAll,
      );

      const responseArray: GroupTypes.OrgsGetResponseType[] = [];
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

      const result = await new Group({ groupId: fixtures.groupId }).orgs.getAll(
        fixtures.request.orgs.getAll.name,
      );

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /group/{groupId}/audit - POSTALL method', async () => {
    try {
      const response: GroupTypes.AuditPostResponseType = JSON.parse(
        fixtures.response.audit.postAll,
      );

      const responseArray: GroupTypes.AuditPostResponseType[] = [];
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

      const result = await new Group({
        groupId: fixtures.groupId,
      }).audit.postAll(
        fixtures.request.audit.postAll.body,
        fixtures.request.audit.postAll.from,
        fixtures.request.audit.postAll.to,
        fixtures.request.audit.postAll.sortOrder,
      );

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
});
