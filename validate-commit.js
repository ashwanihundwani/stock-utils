/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import {execSync} from 'child_process';
const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  console.error('Error: Commit message file path is missing.');
  process.exit(1);
}
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();
if (!commitMsg.startsWith(branchName)) {
  console.error(`Commit message must start with branch name: ${branchName}`);
  process.exit(1);
}
console.log('Commit message is valid');

