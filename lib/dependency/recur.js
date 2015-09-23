var Set = require('../util/set');

module.exports = function (pkgs, dependencies, pkgName) {

  if (dependencies === undefined || dependencies.length === 0) {
    return [];
  }

  var ret = new Set();
  var loop = function (name) {
    if (name === pkgName) {
      // TODO: warn this circular dependency
      return;
    }
    if (!(name in pkgs)) {
      throw new Error('Package [' + name + '] not found!');
    }
    if (!ret.has(name)) {
      ret.add(name);
      var subDep = pkgs[name].dependencies;
      if (subDep && subDep.forEach) {
        subDep.forEach(loop);
      }
    }
  };

  dependencies.forEach(loop);

  return ret.array;

};
