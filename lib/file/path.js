var flat = require('../util/flat');
var glob = require('glob');

var getRealPkgSrc = require('./get-real-pkg-src');

module.exports = function (optG, pkg) {

  var files = pkg.files;
  if (files === undefined || files.length === 0) {
    return [];
  }

  var src = pkg.realSrc = getRealPkgSrc(optG, pkg);

  return flat(files.map(function (file) {
    return glob.sync(src + file);
  }));

};
