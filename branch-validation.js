/* eslint-disable @typescript-eslint/no-var-requires */
import {execSync} from 'child_process';

const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();

const allowedPattterns = [/^feature\//, /^bugfix\//];

const isAllowed = allowedPattterns.some(pattern => pattern.test(branchName));

if (!isAllowed) {
  console.error(`Invalid branch name: "${branchName}"`);
  console.error('Allowed branch names: "feature/*", "bugfix/*"');
  process.exit(1);
} else {
  console.log(`Valid branch name: "${branchName}"`);
}
