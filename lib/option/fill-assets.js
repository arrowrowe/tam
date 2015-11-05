module.exports = function (assets, option) {
  if (option.mode !== undefined) {
    assets.option.mode = option.mode;
  }
  if (option.hash !== undefined) {
    assets.option.hash = option.hash;
  }
  return assets;
};
