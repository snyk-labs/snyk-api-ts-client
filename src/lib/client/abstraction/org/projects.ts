import { ClientError } from '../../errors/clientError';
import {
  ProjectsPostBodyType,
  ProjectsPostResponseType,
} from '../../generated/org';
import { requestsManager } from 'snyk-request-manager';
import { ProjectAttributes, ProjectsData } from './projectsTypes';

const requestManager = new requestsManager({
  burstSize: 100,
  period: 100,
  maxRetryCount: 10,
  userAgentPrefix: 'snyk-api-ts-client',
});

export const getV3 = async (
  classContext: Object,
): Promise<ProjectsPostResponseType> => {
  const response: ProjectsPostResponseType = {};
  let url = '';
  let urlQueryParams: Array<string> = ['version=2023-05-29', 'limit=10'];
  url = `/orgs/${Object(classContext)['orgId']}/projects`;

  if (urlQueryParams.length > 0) {
    url += `?${urlQueryParams.join('&')}`;
  }

  try {
    const resultSet: ProjectsData[][] = [];
    let isThereNextPage: boolean = false;
    do {
      const result = await requestManager.request({
        verb: 'get',
        url: url,
        useRESTApi: true,
      });
      isThereNextPage = result.data.links.next ? true : false;
      if (isThereNextPage) {
        url = result.data.links.next;
      }
      resultSet.push(result.data.data);
    } while (isThereNextPage);


    let v1TypedResult: ProjectsPostResponseType = {};
    v1TypedResult.projects = []
    
    if (resultSet.length > 0) {
      
      v1TypedResult.org = {id: resultSet[0][0].relationships?.organization.data.id};
    }
    for (let page = 0; page < resultSet.length; page++) {
     
      for(let i=0; i< resultSet[page].length;i++){
        v1TypedResult.projects?.push({
          id: resultSet[page][i].id,
          name: resultSet[page][i].attributes.name,
          type: resultSet[page][i].type,
          origin: resultSet[page][i].attributes.origin,
          created: resultSet[page][i].attributes.created.toString(),
          testFrequency: resultSet[page][i].attributes.settings.recurring_tests.frequency || undefined,
          importingUser: {id: resultSet[page][i].relationships?.importer?.data.id},
          targetReference: resultSet[page][i].attributes.target_reference,
          isMonitored: resultSet[page][i].attributes.status == "active" ? true : false
        });
      }
      
    }

    return v1TypedResult;
    
  } catch (err) {
    throw new ClientError(err);
  }
};
