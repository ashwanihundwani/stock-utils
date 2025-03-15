/* eslint-disable @typescript-eslint/no-var-requires */
import { execSync } from 'child_process';

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

/**
 * Ensures branch starts with "feature/" or "bugfix/", 
 * contains exactly one hyphen (not at the start or end).
 */
const branchPattern = /^(feature|bugfix)\/[a-zA-Z0-9]+-[a-zA-Z0-9]+$/;

if (!branchPattern.test(branchName)) {
    console.error(`Invalid branch name: "${branchName}"`);
    console.error('Allowed format: "feature/xyz-abc" or "bugfix/xyz-abc" (one hyphen, not at start/end)');
    process.exit(1);
} else {
    console.log(`Valid branch name: "${branchName}"`);
}
