var log = require('../log');

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
    log.warn('Assets src not set, assume %s.', assets.src);
  }
  if (!assets.dist) {
    assets.dist = 'dist';
    log.warn('Assets dist not set, assume %s.', assets.dist);
  }
  if (!assets.www) {
    assets.www = assets.dist;
    log.warn('Assets www not set, assume %s.', assets.www);
  }
  if (!assets.linked) {
    assets.linked = 'linked.json';
    log.warn('Assets linked not set, assume %s.', assets.linked);
  }
  return assets;
};
