import { Org, Project } from '../../generated/org';
import { createFromJSON, DepGraph, DepGraphData } from '@snyk/dep-graph';

interface IssuesWithVulnsPaths {
  issues: {
    pkgVersionsWithPaths: { [key: string]: Array<Array<string>> }[];
  }[];
}

export type AggregatedIssuesWithVulnPaths = IssuesWithVulnsPaths &
  Project.AggregatedissuesPostResponseType;

export const getAggregatedIssuesWithVulnPaths = async (
  classContext: Object,
  body: Project.AggregatedissuesPostBodyType,
): Promise<AggregatedIssuesWithVulnPaths> => {
  const projectAggregatedIssues = await new Org({
    orgId: Object(classContext)['orgId'],
  })
    .project({ projectId: Object(classContext)['projectId'] })
    .aggregatedissues.post(body);

  const projectDepGraph = await new Org({
    orgId: Object(classContext)['orgId'],
  })
    .project({ projectId: Object(classContext)['projectId'] })
    .depgraph.get();

  const depGraph = createFromJSON(projectDepGraph.depGraph as DepGraphData);
  let returnData: AggregatedIssuesWithVulnPaths = {
    issues: [],
  };

  projectAggregatedIssues?.issues?.map((issue) => {
    const returnVulnPathsData = issue.pkgVersions.map((version) => {
      const pkg = {
        name: issue.pkgName,
        version: version as string,
      };
      return {
        [`${pkg.version}`]: getVulnPathsForPkgVersionFromGraph(
          pkg.name,
          pkg.version,
          depGraph,
        ),
      };
    });

    let newIssue = {
      pkgVersionsWithPaths: returnVulnPathsData,
      ...issue,
    };

    returnData.issues.push(newIssue);
  });

  return returnData;
};

const getVulnPathsForPkgVersionFromGraph = (
  pkgName: string,
  version: string,
  depGraph: DepGraph,
): Array<Array<string>> => {
  const pkg = {
    name: pkgName,
    version: version,
  };

  // Handle binaries vulns that aren't always in the depgraph (like base image stuff). Adding them as top level path.
  if (
    !depGraph
      .getPkgs()
      .map((depPkgInfo) => `${depPkgInfo.name}@${depPkgInfo.version}`)
      .includes(`${pkgName}@${version}`)
  ) {
    return [[`${pkgName}@${version}`]];
  } else {
    const pkgVulnPaths = depGraph.pkgPathsToRoot(pkg) as Array<
      Array<{ name: string; version?: string }>
    >;
    return pkgVulnPaths.map((vulnPath) =>
      vulnPath
        .map((vulnPathPkg) => `${vulnPathPkg.name}@${vulnPathPkg.version}`)
        .reverse()
        .slice(1),
    );
  }
};
