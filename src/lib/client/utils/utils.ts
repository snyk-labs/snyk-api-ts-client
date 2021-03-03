import { Org, ProjectsPostBodyType } from '../generated/org';

export const getProjectUUID = async (
  orgID: string,
  nonUUIDProjectID: string,
  projectType = 'cli',
): Promise<string> => {
  const body: ProjectsPostBodyType = { filters: {} };
  const allProjects = await new Org({ orgId: orgID }).projects.post(body);

  const allProjectsArray = allProjects.projects as Array<any>;
  const selectedProjectArray: Array<any> = allProjectsArray.filter(
    (project) =>
      project.name == nonUUIDProjectID && project.origin == projectType,
  );
  if (selectedProjectArray.length == 0) {
    throw new Error('Snyk API - Could not find a monitored project matching.');
  } else if (selectedProjectArray.length > 1) {
    throw new Error(
      'Snyk API - Could not find a monitored project matching accurately.',
    );
  }
  return selectedProjectArray[0].id;
};

export const getTotalPaginationCount = (linkHeaderLine: string): number => {
  const regExp = /(\?|&)page=([0-9]+)/;
  let count = 1;
  let linkLastPage: string[] = linkHeaderLine
    .replace('link: ', '')
    .split(',')
    .filter((link) => link.indexOf('rel=last') > 0);
  if (
    linkLastPage &&
    linkLastPage.length == 1 &&
    linkLastPage[0].match(regExp)
  ) {
    const lastPageMatch = linkLastPage[0].match(regExp);
    count = lastPageMatch ? parseInt(lastPageMatch[2]) : 1;
  } else {
    throw new Error(
      `Error unable to parse extract total page count from links in request header ${linkHeaderLine}`,
    );
  }

  return count;
};
