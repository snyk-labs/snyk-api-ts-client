#!/bin/bash

APIBFILE=$1

sed -i 's/+ Body//g' $APIBFILE
sed -i 's/Ignore rules (array)/Ignore rules (array, fixed-type)/g' $APIBFILE
sed -i 's/+ issueId: `npm:qs:20140806-1` (string, required) - The issue ID to create Jira issue for./+ orgId: `4a18d42f-0706-4ad0-b127-24078731fbed` (string, required)\n    + projectId: `463c1ee5-31bc-428c-b451-b79a3270db08` (string, required)\n    + issueId: `npm:qs:20140806-1` (string, required)/g' $APIBFILE