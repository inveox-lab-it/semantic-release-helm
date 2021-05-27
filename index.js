const helmVersion = require('./lib/update-helm-version');

async function prepare(pluginConfig, {cwd, nextRelease: {version}, logger}) {
  return helmVersion(version, cwd, logger);
}

module.exports = { prepare };
