var path = require('path');

var flat = require('./util/flat');
var Set = require('./util/set');

function getOutput(pkg, www) {
  return flat(pkg.commands.map(function (command) {
    return command.output;
  })).filter(function (file) {
    return file.substr(-3) === '.js' || file.substr(-4) === '.css';
  }).map(function (file) {
    // NOTE: here we do NOT use `path.relative`, cause all output MUST stay in the www directory.
    if (file.substr(0, www.length) !== www) {
      throw new Error('Output [' + file + '] out of www [' + www + ']!');
    }
    return file.substr(www.length);
  });
}

module.exports = function (report, www) {

  var linked = Object.create(null);

  function fr(fn) {
    for (var pkgName in report) {
      fn(report[pkgName], pkgName);
    }
  }

  // Ensure `www.substr(-1) === '/'` is constant.
  www = path.resolve(www) + (www.substr(-1) === '/' ? '/' : '');

  fr(function (pkg) {
    pkg.output = getOutput(pkg, www);
  });

  fr(function (pkg, pkgName) {
    var output = new Set();
    pkg.dependencies.forEach(function (name) {
      output.addBatch(report[name].output);
    });
    output.addBatch(pkg.output);
    linked[pkgName] = output.array;
  });

  return linked;

};
