import { Test, TestTypes } from '../../src/lib/index';
import { AxiosResponse } from 'axios';
import nock from 'nock';
jest.unmock('axios');
const fixtures = require('../fixtures/test.json').fixtures;

describe('Testing Test class', () => {
  it('Testing endpoint: /test/maven/{groupId}/{artifactId}/{version} - GET method', async () => {
    try {
      const response: TestTypes.MavenGetResponseType = JSON.parse(
        fixtures.response.maven.get,
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

      const result = await new Test()
        .maven({
          groupId: fixtures.groupId,
          artifactId: fixtures.artifactId,
          version: fixtures.version,
        })
        .get(
          fixtures.request.maven.get.org,
          fixtures.request.maven.get.repository,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/maven - POST method', async () => {
    try {
      const response: TestTypes.MavenPostResponseType = JSON.parse(
        fixtures.response.maven.post,
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

      const result = await new Test()
        .maven()
        .post(
          fixtures.request.maven.post.body,
          fixtures.request.maven.post.org,
          fixtures.request.maven.post.repository,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/npm/{packageName}/{version} - GET method', async () => {
    try {
      const response: TestTypes.NpmGetResponseType = JSON.parse(
        fixtures.response.npm.get,
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

      const result = await new Test()
        .npm({ packageName: fixtures.packageName, version: fixtures.version })
        .get(fixtures.request.npm.get.org);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/npm - POST method', async () => {
    try {
      const response: TestTypes.NpmPostResponseType = JSON.parse(
        fixtures.response.npm.post,
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

      const result = await new Test()
        .npm()
        .post(fixtures.request.npm.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/golangdep - POST method', async () => {
    try {
      const response: TestTypes.GolangdepPostResponseType = JSON.parse(
        fixtures.response.golangdep.post,
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

      const result = await new Test().golangdep.post(
        fixtures.request.golangdep.post.body,
        fixtures.request.golangdep.post.org,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/govendor - POST method', async () => {
    try {
      const response: TestTypes.GovendorPostResponseType = JSON.parse(
        fixtures.response.govendor.post,
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

      const result = await new Test().govendor.post(
        fixtures.request.govendor.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/yarn - POST method', async () => {
    try {
      const response: TestTypes.YarnPostResponseType = JSON.parse(
        fixtures.response.yarn.post,
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

      const result = await new Test().yarn.post(
        fixtures.request.yarn.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/rubygems/{gemName}/{version} - GET method', async () => {
    try {
      const response: TestTypes.RubygemsGetResponseType = JSON.parse(
        fixtures.response.rubygems.get,
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

      const result = await new Test()
        .rubygems({ gemName: fixtures.gemName, version: fixtures.version })
        .get(fixtures.request.rubygems.get.org);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/rubygems - POST method', async () => {
    try {
      const response: TestTypes.RubygemsPostResponseType = JSON.parse(
        fixtures.response.rubygems.post,
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

      const result = await new Test()
        .rubygems()
        .post(fixtures.request.rubygems.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/gradle/{group}/{name}/{version} - GET method', async () => {
    try {
      const response: TestTypes.GradleGetResponseType = JSON.parse(
        fixtures.response.gradle.get,
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

      const result = await new Test()
        .gradle({
          group: fixtures.group,
          name: fixtures.name,
          version: fixtures.version,
        })
        .get(
          fixtures.request.gradle.get.org,
          fixtures.request.gradle.get.repository,
        );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/gradle - POST method', async () => {
    try {
      const response: TestTypes.GradlePostResponseType = JSON.parse(
        fixtures.response.gradle.post,
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

      const result = await new Test()
        .gradle()
        .post(fixtures.request.gradle.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/sbt/{groupId}/{artifactId}/{version} - GET method', async () => {
    try {
      const response: TestTypes.SbtGetResponseType = JSON.parse(
        fixtures.response.sbt.get,
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

      const result = await new Test()
        .sbt({
          groupId: fixtures.groupId,
          artifactId: fixtures.artifactId,
          version: fixtures.version,
        })
        .get(fixtures.request.sbt.get.org, fixtures.request.sbt.get.repository);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/sbt - POST method', async () => {
    try {
      const response: TestTypes.SbtPostResponseType = JSON.parse(
        fixtures.response.sbt.post,
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

      const result = await new Test()
        .sbt()
        .post(fixtures.request.sbt.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/pip/{packageName}/{version} - GET method', async () => {
    try {
      const response: TestTypes.PipGetResponseType = JSON.parse(
        fixtures.response.pip.get,
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

      const result = await new Test()
        .pip({ packageName: fixtures.packageName, version: fixtures.version })
        .get(fixtures.request.pip.get.org);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/pip - POST method', async () => {
    try {
      const response: TestTypes.PipPostResponseType = JSON.parse(
        fixtures.response.pip.post,
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

      const result = await new Test()
        .pip()
        .post(fixtures.request.pip.post.body);

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/composer - POST method', async () => {
    try {
      const response: TestTypes.ComposerPostResponseType = JSON.parse(
        fixtures.response.composer.post,
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

      const result = await new Test().composer.post(
        fixtures.request.composer.post.body,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
  it('Testing endpoint: /test/dep-graph - POST method', async () => {
    try {
      const response: TestTypes.DepgraphPostResponseType = JSON.parse(
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

      const result = await new Test().depgraph.post(
        fixtures.request.depgraph.post.body,
        fixtures.request.depgraph.post.org,
      );

      expect(result).toEqual(response);
    } catch (err) {
      throw new Error(err);
    }
  });
});
