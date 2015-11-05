var log = require('../log');
var chalk = require('chalk');

module.exports = function (assets, option) {
  if (option.mode !== undefined) {
    log.trace('Running option mode [%j] overrides assets option mode [%j].', option.mode, assets.option.mode);
    assets.option.mode = option.mode;
  }
  if (option.hash !== undefined) {
    log.trace('Running option hash [%j] overrides assets option hash [%j].', option.hash, assets.option.hash);
    assets.option.hash = option.hash;
  }
  if (!assets.src) {
    assets.src = '.';
    log.warn('Assets ' + chalk.blue('src') + ' not set, assume %s.', chalk.blue(assets.src));
  }
  if (!assets.dist) {
    assets.dist = 'dist';
    log.warn('Assets ' + chalk.blue('dist') + ' not set, assume %s.', chalk.blue(assets.dist));
  }
  if (!assets.www) {
    assets.www = assets.dist;
    log.warn('Assets ' + chalk.blue('www') + ' not set, assume %s.', chalk.blue(assets.www));
  }
  if (!assets.linked) {
    assets.linked = 'linked.json';
    log.warn('Assets ' + chalk.blue('linked') + ' not set, assume %s.', chalk.blue(assets.linked));
  }
  return assets;
};
