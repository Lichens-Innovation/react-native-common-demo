#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');
const readline = require('node:readline');

// Configuration
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const GENERATE_VERSION_SCRIPT = 'scripts/generate-version.js';

const VALID_PLATFORMS = ['ios', 'android'];

const main = async () => {
  const readLineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    // Step 1: Get and validate platform
    const platform = process.argv[2];
    if (!VALID_PLATFORMS.includes(platform)) throw new Error(`Invalid platform: ${platform}.`);

    // Step 2: Ask for release notes
    const notes = await askQuestion({ readLineInterface, question: '\nEnter release notes: ' });
    if (!notes.trim()) throw new Error('Release notes cannot be empty');
    const releaseNotes = getReleaseNotesWithVersion(notes);

    // Step 3: Ask for confirmation
    console.info(`\nThis will release an ${platform} OTA Update having release notes:\n\t${releaseNotes}`);
    await askQuestion({ readLineInterface, question: '\t→ [Enter] to continue \n\t→ [Ctrl-C] to abort' });

    // Step 4: Update package.json releaseNotes attribute
    console.info('\nUpdating releaseNotes in package.json...');
    updatePackageJsonReleaseNotes(releaseNotes);
    console.info('\t✔️ Updated releaseNotes in package.json');

    // Step 5: Re-generate app version info (metadata)
    console.info('\nRe-generating app version info (metadata)...');
    execSync(`node ${GENERATE_VERSION_SCRIPT}`, { stdio: 'inherit' });
    console.info('\t✔️ Version generation completed');

    // Step 6: Publish EAS Update
    console.info('\nPublishing over-the-air (OTA) update...');
    const easCommand = `eas update --channel preview --platform ${platform} --message "${escapeQuotes(releaseNotes)}"`;
    console.info(`\nrunning eas update command: ${easCommand}`);
    execSync(easCommand, { stdio: 'inherit' });

    console.info(`\n✅ OTA ${platform} update released successfully: \n\t${releaseNotes}`);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    readLineInterface.close();
  }
};

const escapeQuotes = (str = '') => str.replace(/"/g, '\\"');

const getReleaseNotesWithVersion = (releaseNotes = '') => {
  const packageJson = readPackageJson();
  const currentVersion = packageJson.version;
  const releaseNotesWithVersion = `${currentVersion} - ${releaseNotes.trim()}`;

  return releaseNotesWithVersion;
};

const readPackageJson = () => {
  return JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
};

const updatePackageJsonReleaseNotes = (newReleaseNotes = '') => {
  try {
    const packageJson = readPackageJson();
    packageJson.releaseNotes = newReleaseNotes;
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
  } catch (error) {
    console.error('[updatePackageJsonReleaseNotes] Error:', error);
    throw new Error(`Could not update package.json: ${error.message}`);
  }
};

const askQuestion = ({ readLineInterface, question = '' }) => {
  return new Promise((resolve) => {
    readLineInterface.question(question, (answer) => resolve(answer));
  });
};

// Run the script
main();
