module.exports = {
  ENOCHART: () => ({
    message: 'Missing `Chart.yaml` file.',
    details: `A Chart.yaml file at the root of your project is required to update a Helm chart.

Please follow [Helm's guide to developing charts](https://docs.helm.sh/developing_charts/) to create a valid \`Chart.yaml\` file.`,
  }),
};
