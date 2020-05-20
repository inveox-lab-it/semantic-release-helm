const helmVersion = require('./lib/update-helm-version');

async function prepare(pluginConfig, {nextRelease: {version}, logger}) {
  return helmVersion(version, '.', logger);
}

module.exports = { prepare };
