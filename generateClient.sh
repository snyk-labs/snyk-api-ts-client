#!/bin/bash

printf '\n ===> 0 - backup some stuff'
mv src/lib/index.ts src/lib/index.ts.backup

printf '\n ===> 1 - Compile code generators\n'
npx tsc

printf '\n ===> 2 - Download API Blueprint (snyk.apib)\n'
curl https://snyk.docs.apiary.io/api-description-document -o snyk.apib

printf '\n ===> 2 bis - Prepare API Blueprint (snyk.apib)\n'
./prepare-apib.sh snyk.apib


printf '\n ===> 3 - Convert into swagger spec (snyk.json)\n'
## Ignores (array) into ## Ignores (object)
npx apib2swagger -i ./snyk.apib -o ./snyk.json

printf '\n ===> 4 - Shuffle spec to reflect class hierarchy we want\n'
node dist/preprocessors/prepare.js > snyk-prepared.json

printf '\n ===> 5 - Generate API client classes\n'
node dist/generators/generate.js

printf '\n ===> 6 - Compile API client classes\n'
npm run format
npx tsc

printf '\n ===> 7 - Generate Test Cases and fixtures\n'
node dist/generators/generateTestCases.js
node dist/generators/generateTestFixtures.js

printf '\n ===> 8 - Put index.ts back\n'
mv src/lib/index.ts.backup src/lib/index.ts
npx tsc
npm run format

printf '\n ===> 9 - Run tests\n'
npm run test


