var fs = require('fs');
var glob = require('glob');

module.exports = function (optG, pkg) {

  var files = pkg.files;
  if (files === undefined || files.length === 0) {
    return [];
  }

  var pkgSrc = pkg.src || pkg.name;
  var src = fs.realpathSync(optG.src + '/' + pkgSrc) + '/';

  return Array.prototype.concat.apply([], files.map(function (file) {
    return glob.sync(src + file);
  }));

};
