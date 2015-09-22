var fs = require('fs');

module.exports = function (optG, pkg) {
  var pkgSrc = pkg.src || pkg.name;
  return fs.realpathSync(optG.src + '/' + pkgSrc) + '/';
};
