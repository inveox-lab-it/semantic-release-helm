const helmVersion = require('./lib/update-helm-version');
const mergeValues = require('./lib/merge-values');

async function prepare(pluginConfig, {cwd, nextRelease: {version}, logger}) {
  mergeValues(cwd, version, logger);
  return helmVersion(version, cwd, logger);
}

module.exports = { prepare };
