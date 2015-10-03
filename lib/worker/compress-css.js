var CleanCSS = require('clean-css');
var log = require('../log');

module.exports = function (code, args) {
  log.trace('Call CleanCSS with %j', args);
  return new CleanCSS(args).minify(code).styles;
};
