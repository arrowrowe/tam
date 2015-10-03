var fs = require('fs');

module.exports = function (assets, pkg) {
  var pkgSrc = pkg.src || pkg.name;
  return fs.realpathSync(assets.src + '/' + pkgSrc) + '/';
};
