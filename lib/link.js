var flat = require('./util/flat');
var Set = require('./util/set');

function getOutput(pkg, www) {
  return flat(pkg.commands.map(function (command) {
    return command.output;
  })).map(function (file) {
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

  fr(function (pkg) {
    pkg.output = getOutput(pkg, www);
  });

  fr(function (pkg, pkgName) {
    var output = new Set();
    output.addBatch(pkg.output);
    pkg.dependencies.forEach(function (name) {
      output.addBatch(report[name].output);
    });
    linked[pkgName] = output.array;
  });

  return linked;

};
