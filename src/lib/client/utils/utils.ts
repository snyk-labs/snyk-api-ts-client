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
