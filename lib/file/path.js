var flat = require('../util/flat');
var glob = require('glob');
var log = require('../log');
var chalk = require('chalk');

var getRealPkgSrc = require('./get-real-pkg-src');

module.exports = function (assets, pkg) {

  var files = pkg.files;
  if (files === undefined || files.length === 0) {
    return [];
  }

  var src = pkg.realSrc = getRealPkgSrc(assets, pkg);

  if (!src) {
    log.error('Cannot get src of package %s, assumed empty.', chalk.red(pkg.name));
    return [];
  }

  return flat(files.map(function (file) {
    var globs = glob.sync(src + file);
    if (globs.length === 0) {
      log.warn('Package %s cannot find any file matching "%s".', chalk.red(pkg.name), chalk.red(file));
    }
    return globs;
  }));

};
