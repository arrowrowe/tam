var fs = require('fs');
var log = require('../log');
var chalk = require('chalk');

module.exports = function (assets, pkg) {
  var pkgSrc = pkg.src || pkg.name;
  try {
    return fs.realpathSync(assets.src + '/' + pkgSrc) + '/';
  } catch (e) {
    log.error('Error occurs for package %s: %s', chalk.red(pkg.name), chalk.red(e.message));
  }
};
