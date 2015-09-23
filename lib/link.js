var flat = require('./util/flat');
var Set = require('./util/set');

function getOutput(pkg) {
  return flat(pkg.commands.map(function (command) {
    return command.output;
  }));
}

module.exports = function (report) {

  var linked = Object.create(null);

  function fr(fn) {
    for (var pkgName in report) {
      fn(report[pkgName], pkgName);
    }
  }

  fr(function (pkg) {
    pkg.output = getOutput(pkg);
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
