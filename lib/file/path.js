var fs = require('fs');
var glob = require('glob');

var combine = require('./combine');

module.exports = function (optG, pkg) {

  var files = pkg.files;
  if (files === undefined || files.length === 0) {
    return {
      input: [],
      output: []
    };
  }

  var pkgSrc = pkg.src || pkg.name;
  var src = fs.realpathSync(optG.src + '/' + pkgSrc) + '/';
  var srcLength = src.length;

  var pkgDist = pkg.dist || pkg.name;
  // NOTE: this does NOT ensure that the dist directory exists.
  var dist = combine(optG.dist, pkgDist) + '/';

  var input = [];
  var output = [];
  files.forEach(function (file) {
    glob.sync(src + file).forEach(function (f) {
      input.push(f);
      output.push(dist + f.substr(srcLength));
    });
  });
  return {
    input: input,
    output: output
  };

};
