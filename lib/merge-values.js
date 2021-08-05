
const path = require('path');
const yaml = require('yaml');
const fs = require('fs');
const { execSync } = require('child_process');
const merge = require('@alexlafroscia/yaml-merge');
const glob = require('glob-promise');

module.exports = async (basePath, logger) => {
  logger.info('Trying to merge values in', basePath);
  const devValues = await glob(path.resolve(basePath, 'values/dev/**'));
  if (devValues.length > 1) {
    logger.info('Trying to merge values ', devValues);
    const devValue = merge(...devValues);
    fs.writeFileSync(path.resolve(basePath, 'values/dev/values.yaml'),  devValue);
  }

  const uatValues = await glob(path.resolve(basePath, 'values/uat/**'));
  if (uatValues.length > 1) {
    logger.info('Trying to merge values ', uatValues);
    const uatValue = merge(...uatValues);
    fs.writeFileSync(path.resolve(basePath, 'values/uat/values.yaml'),  uatValue);
  }

  const prodValues = await glob(path.resolve(basePath, 'values/prod/**'));
  if (prodValues.length > 1) {
    const prodValue = merge(...prodValues);
    fs.writeFileSync(path.resolve(basePath, 'values/prod/values.yaml'),  prodValue);
  }

  const valuesPath = path.resolve(basePath, 'values')
  execSync(`git add ${valuesPath}`)
};
