var CleanCSS = require('clean-css');

module.exports = function (code, args) {
  return new CleanCSS(args).minify(code).styles;
};
