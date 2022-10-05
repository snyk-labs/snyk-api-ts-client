![Snyk logo](https://snyk.io/style/asset/logo/snyk-print.svg)

***

[![Known Vulnerabilities](https://snyk.io/test/github/snyk-tech-services/snyk-api-ts-client/badge.svg)](https://snyk.io/test/github/snyk-tech-services/snyk-api-ts-client)
[![Inactively Maintained](https://img.shields.io/badge/Maintenance%20Level-Inactively%20Maintained-yellowgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)


**This repository is in maintenance mode, no new features are being developed. Bug & security fixes will continue to be delivered. Open source contributions are welcome for small features & fixes (no breaking changes)**

# Documentation based generated Snyk API TypeScript client

Taking as input a swagger definition we convert from the api blueprint, it generates a client for all Snyk API v1 endpoints.
APIv3 endpoints are currently not supported.

Generated from [Snyk APIs](https://snyk.docs.apiary.io/)

## Requirements
Node 14 or above

## Installation
`npm i snyk-api-ts-client`

## Usage

Find which endpoint is of interest to you in the [API Reference](https://snyk.docs.apiary.io/).\
Then import and use.

```
import {Orgs} from 'snyk-api-ts-client'


const main = async () => {
    const result = await new Orgs().get()
    console.log(result)
}
main()
```

If POST|PUT based requests, the types are available and should be inferred automatically by your IDE
Should look something like this

```
import {Org} from 'snyk-api-ts-client'
import { ProjectsPostBodyType } from 'snyk-api-ts-client/dist/client/generated/org'


const main = async () => {
    const body: ProjectsPostBodyType = {filters: {}}
    const result = await new Org({orgId: '12345678-1234-1234-1234-123456789012'}).projects.post(body)
    console.log(result)
}
main()
```

Pass a boolean true/false to see the full response or just the data. Default is false, showing you only the response body.


### Endpoint deprecation notice
As of 1.7.3, the `/issues` endpoint is decommissioned. The `aggregated-issues` endpoint is the replacement to use.
Vulnerable paths can be retrieved using the [paths endpoint](https://snyk.docs.apiary.io/#reference/projects/project-issue-paths/list-all-project-issue-paths) which also contain the `fixVersion` info to know how to fix that particular path.
The supporting methods are available in the client generated.
