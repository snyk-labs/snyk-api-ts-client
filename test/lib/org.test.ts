import { Org, OrgTypes } from '../../src/lib/index';
import { AxiosResponse } from 'axios';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/org.json').fixtures;

describe('Testing Org class', () => {
  it('Testing endpoint: /org - POST method', async () => {
    try {
      const response: OrgTypes.OrgPostResponseType = JSON.parse(
        fixtures.response.post,
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

      const result = await new Org().post(fixtures.request.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId} - DELETE method', async () => {
    try {
      const response: OrgTypes.OrgDeleteResponseType = JSON.parse(
        fixtures.response.delete,
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

      const result = await new Org({ orgId: fixtures.orgId }).delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/notification-settings - GET method', async () => {
    try {
      const response: OrgTypes.NotificationsettingsGetResponseType = JSON.parse(
        fixtures.response.notificationsettings.get,
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

      const result = await new Org({
        orgId: fixtures.orgId,
      }).notificationsettings.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/notification-settings - PUT method', async () => {
    try {
      const response: OrgTypes.NotificationsettingsPutResponseType = JSON.parse(
        fixtures.response.notificationsettings.put,
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

      const result = await new Org({
        orgId: fixtures.orgId,
      }).notificationsettings.put(
        fixtures.request.notificationsettings.put.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/invite - POST method', async () => {
    try {
      const response: OrgTypes.InvitePostResponseType = JSON.parse(
        fixtures.response.invite.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).invite.post(
        fixtures.request.invite.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/members - GET method', async () => {
    try {
      const response: OrgTypes.MembersGetResponseType = JSON.parse(
        fixtures.response.members.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .members()
        .get(fixtures.request.members.get.includeGroupAdmins);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/members/{userId} - PUT method', async () => {
    try {
      const response: OrgTypes.MembersPutResponseType = JSON.parse(
        fixtures.response.members.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .members({ userId: fixtures.userId })
        .put(fixtures.request.members.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/members/{userId} - DELETE method', async () => {
    try {
      const response: OrgTypes.MembersDeleteResponseType = JSON.parse(
        fixtures.response.members.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .members({ userId: fixtures.userId })
        .delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/members/update/{userId} - PUT method', async () => {
    try {
      const response: OrgTypes.Members.UpdatePutResponseType = JSON.parse(
        fixtures.response.members.update.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .members({ userId: fixtures.userId })
        .update({ userId: fixtures.userId })
        .put(fixtures.request.members.update.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/settings - GET method', async () => {
    try {
      const response: OrgTypes.SettingsGetResponseType = JSON.parse(
        fixtures.response.settings.get,
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

      const result = await new Org({ orgId: fixtures.orgId }).settings.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/settings - PUT method', async () => {
    try {
      const response: OrgTypes.SettingsPutResponseType = JSON.parse(
        fixtures.response.settings.put,
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

      const result = await new Org({ orgId: fixtures.orgId }).settings.put(
        fixtures.request.settings.put.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/provision - POST method', async () => {
    try {
      const response: OrgTypes.ProvisionPostResponseType = JSON.parse(
        fixtures.response.provision.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).provision.post(
        fixtures.request.provision.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/provision - GET method', async () => {
    try {
      const response: OrgTypes.ProvisionGetResponseType = JSON.parse(
        fixtures.response.provision.get,
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

      const result = await new Org({ orgId: fixtures.orgId }).provision.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/provision - DELETE method', async () => {
    try {
      const response: OrgTypes.ProvisionDeleteResponseType = JSON.parse(
        fixtures.response.provision.delete,
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

      const result = await new Org({
        orgId: fixtures.orgId,
      }).provision.delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations - GET method', async () => {
    try {
      const response: OrgTypes.IntegrationsGetResponseType = JSON.parse(
        fixtures.response.integrations.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations()
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations - POST method', async () => {
    try {
      const response: OrgTypes.IntegrationsPostResponseType = JSON.parse(
        fixtures.response.integrations.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations()
        .post(fixtures.request.integrations.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId} - PUT method', async () => {
    try {
      const response: OrgTypes.IntegrationsPutResponseType = JSON.parse(
        fixtures.response.integrations.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .put(fixtures.request.integrations.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{type} - GET method', async () => {
    try {
      const response: OrgTypes.IntegrationsGetResponseType = JSON.parse(
        fixtures.response.integrations.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ type: fixtures.type })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/authentication - DELETE method', async () => {
    try {
      const response: OrgTypes.Integrations.AuthenticationDeleteResponseType = JSON.parse(
        fixtures.response.integrations.authentication.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .authentication.delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/authentication/provision-token - POST method', async () => {
    try {
      const response: OrgTypes.Integrations.Authentication.ProvisiontokenPostResponseType = JSON.parse(
        fixtures.response.integrations.authentication.provisiontoken.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .authentication.provisiontoken.post();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/authentication/switch-token - POST method', async () => {
    try {
      const response: OrgTypes.Integrations.Authentication.SwitchtokenPostResponseType = JSON.parse(
        fixtures.response.integrations.authentication.switchtoken.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .authentication.switchtoken.post();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/clone - POST method', async () => {
    try {
      const response: OrgTypes.Integrations.ClonePostResponseType = JSON.parse(
        fixtures.response.integrations.clone.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .clone.post(fixtures.request.integrations.clone.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/settings - GET method', async () => {
    try {
      const response: OrgTypes.Integrations.SettingsGetResponseType = JSON.parse(
        fixtures.response.integrations.settings.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .settings.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/settings - PUT method', async () => {
    try {
      const response: OrgTypes.Integrations.SettingsPutResponseType = JSON.parse(
        fixtures.response.integrations.settings.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .settings.put(fixtures.request.integrations.settings.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/import - POST method', async () => {
    try {
      const response: OrgTypes.Integrations.ImportPostResponseType = JSON.parse(
        fixtures.response.integrations.import.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .import()
        .post(fixtures.request.integrations.import.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/integrations/{integrationId}/import/{jobId} - GET method', async () => {
    try {
      const response: OrgTypes.Integrations.ImportGetResponseType = JSON.parse(
        fixtures.response.integrations.import.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .integrations({ integrationId: fixtures.integrationId })
        .import({ jobId: fixtures.jobId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/projects - POST method', async () => {
    try {
      const response: OrgTypes.ProjectsPostResponseType = JSON.parse(
        fixtures.response.projects.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).projects.post(
        fixtures.request.projects.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId} - GET method', async () => {
    try {
      const response: OrgTypes.ProjectGetResponseType = JSON.parse(
        fixtures.response.project.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId} - PUT method', async () => {
    try {
      const response: OrgTypes.ProjectPutResponseType = JSON.parse(
        fixtures.response.project.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .put(fixtures.request.project.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId} - DELETE method', async () => {
    try {
      const response: OrgTypes.ProjectDeleteResponseType = JSON.parse(
        fixtures.response.project.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/deactivate - POST method', async () => {
    try {
      const response: OrgTypes.Project.DeactivatePostResponseType = JSON.parse(
        fixtures.response.project.deactivate.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .deactivate.post();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/activate - POST method', async () => {
    try {
      const response: OrgTypes.Project.ActivatePostResponseType = JSON.parse(
        fixtures.response.project.activate.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .activate.post();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/aggregated-issues - POST method', async () => {
    try {
      const response: OrgTypes.Project.AggregatedissuesPostResponseType = JSON.parse(
        fixtures.response.project.aggregatedissues.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .aggregatedissues.post(
          fixtures.request.project.aggregatedissues.post.body,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/issue/{issueId}/paths - GET method', async () => {
    try {
      const response: OrgTypes.Project.Issue.PathsGetResponseType = JSON.parse(
        fixtures.response.project.issue.paths.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .issue({ issueId: fixtures.issueId })
        .paths.get(
          fixtures.request.project.issue.paths.get.snapshotId,
          fixtures.request.project.issue.paths.get.perPage,
          fixtures.request.project.issue.paths.get.page,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/issue/{issueId}/jira-issue - POST method', async () => {
    try {
      const response: OrgTypes.Project.Issue.JiraissuePostResponseType = JSON.parse(
        fixtures.response.project.issue.jiraissue.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .issue({ issueId: fixtures.issueId })
        .jiraissue.post(fixtures.request.project.issue.jiraissue.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/history - POST method', async () => {
    try {
      const response: OrgTypes.Project.HistoryPostResponseType = JSON.parse(
        fixtures.response.project.history.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .history()
        .post(
          fixtures.request.project.history.post.body,
          fixtures.request.project.history.post.perPage,
          fixtures.request.project.history.post.page,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/history/{snapshotId}/aggregated-issues - POST method', async () => {
    try {
      const response: OrgTypes.Project.History.AggregatedissuesPostResponseType = JSON.parse(
        fixtures.response.project.history.aggregatedissues.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .history({ snapshotId: fixtures.snapshotId })
        .aggregatedissues.post(
          fixtures.request.project.history.aggregatedissues.post.body,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/history/{snapshotId}/issue/{issueId}/paths - GET method', async () => {
    try {
      const response: OrgTypes.Project.History.Issue.PathsGetResponseType = JSON.parse(
        fixtures.response.project.history.issue.paths.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .history({ snapshotId: fixtures.snapshotId })
        .issue({ issueId: fixtures.issueId })
        .paths.get(
          fixtures.request.project.history.issue.paths.get.perPage,
          fixtures.request.project.history.issue.paths.get.page,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/dep-graph - GET method', async () => {
    try {
      const response: OrgTypes.Project.DepgraphGetResponseType = JSON.parse(
        fixtures.response.project.depgraph.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .depgraph.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/ignores - GET method', async () => {
    try {
      const response: OrgTypes.Project.IgnoresGetResponseType = JSON.parse(
        fixtures.response.project.ignores.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .ignores.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/ignore/{issueId} - GET method', async () => {
    try {
      const response: OrgTypes.Project.IgnoreGetResponseType = JSON.parse(
        fixtures.response.project.ignore.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .ignore({ issueId: fixtures.issueId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/ignore/{issueId} - POST method', async () => {
    try {
      const response: OrgTypes.Project.IgnorePostResponseType = JSON.parse(
        fixtures.response.project.ignore.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .ignore({ issueId: fixtures.issueId })
        .post(fixtures.request.project.ignore.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/ignore/{issueId} - PUT method', async () => {
    try {
      const response: OrgTypes.Project.IgnorePutResponseType = JSON.parse(
        fixtures.response.project.ignore.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .ignore({ issueId: fixtures.issueId })
        .put(fixtures.request.project.ignore.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/ignore/{issueId} - DELETE method', async () => {
    try {
      const response: OrgTypes.Project.IgnoreDeleteResponseType = JSON.parse(
        fixtures.response.project.ignore.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .ignore({ issueId: fixtures.issueId })
        .delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/jira-issues - GET method', async () => {
    try {
      const response: OrgTypes.Project.JiraissuesGetResponseType = JSON.parse(
        fixtures.response.project.jiraissues.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .jiraissues.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/settings - GET method', async () => {
    try {
      const response: OrgTypes.Project.SettingsGetResponseType = JSON.parse(
        fixtures.response.project.settings.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .settings.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/settings - PUT method', async () => {
    try {
      const response: OrgTypes.Project.SettingsPutResponseType = JSON.parse(
        fixtures.response.project.settings.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .settings.put(fixtures.request.project.settings.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/settings - DELETE method', async () => {
    try {
      const response: OrgTypes.Project.SettingsDeleteResponseType = JSON.parse(
        fixtures.response.project.settings.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .settings.delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/move - PUT method', async () => {
    try {
      const response: OrgTypes.Project.MovePutResponseType = JSON.parse(
        fixtures.response.project.move.put,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .move.put(fixtures.request.project.move.put.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/tags - POST method', async () => {
    try {
      const response: OrgTypes.Project.TagsPostResponseType = JSON.parse(
        fixtures.response.project.tags.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .tags.post(fixtures.request.project.tags.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/tags/remove - POST method', async () => {
    try {
      const response: OrgTypes.Project.Tags.RemovePostResponseType = JSON.parse(
        fixtures.response.project.tags.remove.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .tags.remove.post(fixtures.request.project.tags.remove.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/attributes - POST method', async () => {
    try {
      const response: OrgTypes.Project.AttributesPostResponseType = JSON.parse(
        fixtures.response.project.attributes.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .attributes.post(fixtures.request.project.attributes.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/dependencies - POST method', async () => {
    try {
      const response: OrgTypes.DependenciesPostResponseType = JSON.parse(
        fixtures.response.dependencies.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).dependencies.post(
        fixtures.request.dependencies.post.body,
        fixtures.request.dependencies.post.sortBy,
        fixtures.request.dependencies.post.order,
        fixtures.request.dependencies.post.page,
        fixtures.request.dependencies.post.perPage,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/licenses - POST method', async () => {
    try {
      const response: OrgTypes.LicensesPostResponseType = JSON.parse(
        fixtures.response.licenses.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).licenses.post(
        fixtures.request.licenses.post.body,
        fixtures.request.licenses.post.sortBy,
        fixtures.request.licenses.post.order,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/entitlements - GET method', async () => {
    try {
      const response: OrgTypes.EntitlementsGetResponseType = JSON.parse(
        fixtures.response.entitlements.get,
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

      const result = await new Org({
        orgId: fixtures.orgId,
      }).entitlements.get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/entitlement/{entitlementKey} - GET method', async () => {
    try {
      const response: any = JSON.parse(fixtures.response.entitlement.get);

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

      const result = await new Org({ orgId: fixtures.orgId })
        .entitlement({ entitlementKey: fixtures.entitlementKey })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/audit - POST method', async () => {
    try {
      const response: OrgTypes.AuditPostResponseType = JSON.parse(
        fixtures.response.audit.post,
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

      const result = await new Org({ orgId: fixtures.orgId }).audit.post(
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
  it('Testing endpoint: /org/{orgId}/webhooks - POST method', async () => {
    try {
      const response: OrgTypes.WebhooksPostResponseType = JSON.parse(
        fixtures.response.webhooks.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .webhooks()
        .post(fixtures.request.webhooks.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/webhooks - GET method', async () => {
    try {
      const response: OrgTypes.WebhooksGetResponseType = JSON.parse(
        fixtures.response.webhooks.get,
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

      const result = await new Org({ orgId: fixtures.orgId }).webhooks().get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/webhooks/{webhookId} - GET method', async () => {
    try {
      const response: OrgTypes.WebhooksGetResponseType = JSON.parse(
        fixtures.response.webhooks.get,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .webhooks({ webhookId: fixtures.webhookId })
        .get();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/webhooks/{webhookId} - DELETE method', async () => {
    try {
      const response: OrgTypes.WebhooksDeleteResponseType = JSON.parse(
        fixtures.response.webhooks.delete,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .webhooks({ webhookId: fixtures.webhookId })
        .delete();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/webhooks/{webhookId}/ping - POST method', async () => {
    try {
      const response: OrgTypes.Webhooks.PingPostResponseType = JSON.parse(
        fixtures.response.webhooks.ping.post,
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

      const result = await new Org({ orgId: fixtures.orgId })
        .webhooks({ webhookId: fixtures.webhookId })
        .ping.post();

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/issue/{issueId}/paths - GETALL method', async () => {
    try {
      const response: OrgTypes.Project.Issue.PathsGetResponseType = JSON.parse(
        fixtures.response.project.issue.paths.getAll,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      const responseArray: OrgTypes.Project.Issue.PathsGetResponseType[] = [];
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .issue({ issueId: fixtures.issueId })
        .paths.getAll(fixtures.request.project.issue.paths.getAll.snapshotId);

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/history - POSTALL method', async () => {
    try {
      const response: OrgTypes.Project.HistoryPostResponseType = JSON.parse(
        fixtures.response.project.history.postAll,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      const responseArray: OrgTypes.Project.HistoryPostResponseType[] = [];
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .history()
        .postAll(fixtures.request.project.history.postAll.body);

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/project/{projectId}/history/{snapshotId}/issue/{issueId}/paths - GETALL method', async () => {
    try {
      const response: OrgTypes.Project.History.Issue.PathsGetResponseType = JSON.parse(
        fixtures.response.project.history.issue.paths.getAll,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      const responseArray: OrgTypes.Project.History.Issue.PathsGetResponseType[] = [];
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

      const result = await new Org({ orgId: fixtures.orgId })
        .project({ projectId: fixtures.projectId })
        .history({ snapshotId: fixtures.snapshotId })
        .issue({ issueId: fixtures.issueId })
        .paths.getAll();

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/dependencies - POSTALL method', async () => {
    try {
      const response: OrgTypes.DependenciesPostResponseType = JSON.parse(
        fixtures.response.dependencies.postAll,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      const responseArray: OrgTypes.DependenciesPostResponseType[] = [];
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

      const result = await new Org({
        orgId: fixtures.orgId,
      }).dependencies.postAll(
        fixtures.request.dependencies.postAll.body,
        fixtures.request.dependencies.postAll.sortBy,
        fixtures.request.dependencies.postAll.order,
      );

      expect(result).toEqual(responseArray);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /org/{orgId}/audit - POSTALL method', async () => {
    try {
      const response: OrgTypes.AuditPostResponseType = JSON.parse(
        fixtures.response.audit.postAll,
      );

      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      const responseArray: OrgTypes.AuditPostResponseType[] = [];
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

      const result = await new Org({ orgId: fixtures.orgId }).audit.postAll(
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
