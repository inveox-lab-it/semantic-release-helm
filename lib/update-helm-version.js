const path = require('path');
const yaml = require('yaml');
const fs = require('fs');
const { execSync } = require('child_process');

module.exports = async (semanticVersion, basePath, logger) => {
  try {
    const chartPath = path.join(basePath, 'Chart.yaml');
    const yamlData = fs.readFileSync(chartPath, 'utf8');
    const chart = yaml.parse(yamlData);
    chart.version = semanticVersion;

    fs.writeFileSync(chartPath, yaml.stringify(chart));
    execSync(`git add ${chartPath}`)

    logger.log('Wrote version %s to %s', semanticVersion, chartPath);
  } catch (e) {
    logger.log('There was an error upstaing file', e)
  }
};
