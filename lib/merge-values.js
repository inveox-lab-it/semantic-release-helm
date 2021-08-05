
const path = require('path');
const yaml = require('yaml');
const fs = require('fs');
const { execSync } = require('child_process');
const merge = require('@alexlafroscia/yaml-merge');
const glob = require('glob-promise');

module.exports = async (basePath, version, logger) => {
  logger.info('Trying to merge values in', basePath);
  const devValues = await glob(path.resolve(basePath, 'values/dev/**/*.yaml'));
  if (devValues.length > 1) {
    logger.info('Trying to merge values ', devValues);
    const devValue = `# created by CI ver: ${version} \n` + merge(...devValues);
    const mergePath = path.resolve(basePath, 'values/dev/values.yaml')
    fs.writeFileSync(mergePath,  devValue);
  }

  const uatValues = await glob(path.resolve(basePath, 'values/uat/**/*.yaml'));
  if (uatValues.length > 1) {
    logger.info('Trying to merge values ', uatValues);
    const uatValue = `# created by CI ver: ${version} \n` + merge(...uatValues);
    const mergePath = path.resolve(basePath, 'values/uat/values.yaml')
    fs.writeFileSync(mergePath,  uatValue);
  }

  const prodValues = await glob(path.resolve(basePath, 'values/prod/**/*.yaml'));
  if (prodValues.length > 1) {
    logger.info('Trying to merge values ', prodValues);
    const prodValue = `# created by CI ver: ${version} \n` + merge(...prodValues);
    const mergePath = path.resolve(basePath, 'values/prod/values.yaml')
    fs.writeFileSync(mergePath,  prodValue);
  }

  const valuesPath = path.resolve(basePath, 'values')
  execSync(`git add ${valuesPath}`)
};
