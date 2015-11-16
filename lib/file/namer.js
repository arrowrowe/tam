var path = require('path');
var getRealPkgSrc = require('./get-real-pkg-src');

function trans(files, dist, srcLength) {
  return files.map(function (file) {
    return path.resolve(dist, file.substr(srcLength));
  });
}

function getCompiledPath(scss) {
  return scss.substr(0, scss.length - 4) + 'css';
}

module.exports = function (assets, pkg) {

  var srcLength = (pkg.realSrc || getRealPkgSrc(assets, pkg)).length;

  var pkgDist = pkg.dist || pkg.name;
  var dist = path.resolve(assets.dist, pkgDist);

  return function (command) {
    if (command.behavior === 'copy') {
      command.output = trans(command.files, dist, srcLength);
    } else if (command.behavior === 'compile') {
      command.output = trans(command.files, dist, srcLength).map(getCompiledPath);
    } else if (command.behavior === 'compress') {
      command.output = [path.resolve(dist, pkg.name + '.' + command.args.type)];
    } else {
      throw new Error('Unrecognized behavior [' + command.behavior + ']!');
    }
  };
};
