module.exports = function (assets, option) {
  if (option.mode !== undefined) {
    assets.option.mode = option.mode;
  }
  if (option.hash !== undefined) {
    assets.option.hash = option.hash;
  }
  if (!assets.src) {
    assets.src = '.';
  }
  if (!assets.dist) {
    assets.dist = 'dist';
  }
  if (!assets.www) {
    assets.www = assets.dist;
  }
  return assets;
};
