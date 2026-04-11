const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaConfig = singleSpaAngularWebpack(config, options);
  
  singleSpaConfig.output.libraryTarget = 'system';
  
  return singleSpaConfig;
};
