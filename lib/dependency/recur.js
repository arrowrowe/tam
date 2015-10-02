var Set = require('../util/set');
var log = require('../log');

module.exports = function (pkgs, dependencies, pkgName) {

  if (dependencies === undefined || dependencies.length === 0) {
    return [];
  }

  var ret = new Set();
  var loop = function (name) {
    if (name === pkgName) {
      log.warn('Package [%s] dependents on itself!', name);
      return;
    }
    if (!(name in pkgs)) {
      throw new Error('Package [' + name + '] not found!');
    }
    if (!ret.has(name)) {
      var subDep = pkgs[name].dependencies;
      if (subDep && subDep.forEach) {
        subDep.forEach(loop);
      }
      ret.add(name);
    }
  };

  dependencies.forEach(loop);

  return ret.array;

};
