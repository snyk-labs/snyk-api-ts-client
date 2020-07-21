![Snyk logo](https://snyk.io/style/asset/logo/snyk-print.svg)

***

[![Known Vulnerabilities](https://snyk.io/test/github/snyk-tech-services/snyk-api-ts-client/badge.svg)](https://snyk.io/test/github/snyk-tech-services/snyk-api-ts-client)

# Generated Snyk Api client
> **Alpha version !!**

Taking as input a swagger definition we convert from the api blueprint, it generates a client for all endpoints.

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


