
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
    const mergePath = path.resolve(basePath, 'values/dev/values.yaml')
    if (!fs.existsSync(mergePath)) {
      fs.writeFileSync(mergePath,  devValue);
    }
  }

  const uatValues = await glob(path.resolve(basePath, 'values/uat/**'));
  if (uatValues.length > 1) {
    logger.info('Trying to merge values ', uatValues);
    const uatValue = merge(...uatValues);
    const mergePath = path.resolve(basePath, 'values/uat/values.yaml')
    if (!fs.existsSync(mergePath)) {
      fs.writeFileSync(mergePath,  uatValue);
    }
  }

  const prodValues = await glob(path.resolve(basePath, 'values/prod/**'));
  if (prodValues.length > 1) {
    const prodValue = merge(...prodValues);
    const mergePath = path.resolve(basePath, 'values/prod/values.yaml')
    if (!fs.existsSync(mergePath)) {
      fs.writeFileSync(mergePath,  prodValue);
    }
  }

  const valuesPath = path.resolve(basePath, 'values')
  execSync(`git add ${valuesPath}`)
};
