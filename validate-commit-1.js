/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import { execSync } from 'child_process';

const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
    console.error('Error: Commit message file path is missing.');
    process.exit(1);
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();
const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

/**
 * Ensures commit message follows the required format:
 * - Starts with the branch name
 * - Follows the pattern: branch-name: Capitalized message
 */
const commitPattern = new RegExp(`^${branchName}: [A-Z].*`);

if (!commitPattern.test(commitMsg)) {
    console.error(`Invalid commit message: "${commitMsg}"`);
    console.error(`Expected format: "${branchName}: Capitalized message"`);
    process.exit(1);
} else {
    console.log('Valid commit message.');
}
