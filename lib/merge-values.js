
const path = require('path');
const yaml = require('yaml');
const fs = require('fs');
const { execSync } = require('child_process');
const merge = require('@alexlafroscia/yaml-merge');
const glob = require('glob-promise');

const filterMerged = (valuePaths, env) => {
  return valuePaths.filter(x => !x.includes(`values/${env}/values.yaml`));
}

const saveMerged = (valuesPath, env, version, basePath, logger) => {
    logger.info('Trying to merge values ', env, valuesPath);
    const mergedValue = `# created by CI ver: ${version} DO NOT EDIT #\n` + merge(...valuesPath);
    const mergePath = path.resolve(basePath, `values/${env}/values.yaml`)
    fs.writeFileSync(mergePath,  mergedValue);
}


module.exports = async (basePath, version, logger) => {
  logger.info('Trying to merge values in', basePath);

  const devValues = filterMerged(await glob(path.resolve(basePath, 'values/dev/**/*.yaml')), 'dev');
  if (devValues.length > 1) {
    saveMerged(devValues, 'dev', version, basePath, logger)
  }

  const uatValues = filterMerged(await glob(path.resolve(basePath, 'values/uat/**/*.yaml')), 'uat');
  if (uatValues.length > 1) {
    saveMerged(uatValues, 'uat', version, basePath, logger)
  }

  const prodValues = filterMerged(await glob(path.resolve(basePath, 'values/prod/**/*.yaml')), 'prod');
  if (prodValues.length > 1) {
    saveMerged(prodValues, 'prod', version, basePath, logger)
  }

  const valuesPath = path.resolve(basePath, 'values')
  execSync(`git add ${valuesPath}`)
};
