module.exports = function (pkgs, dependencies, pkgName) {

  if (dependencies === undefined || dependencies.length === 0) {
    return [];
  }

  var dict = {};
  var loop = function (name) {
    if (!(name in pkgs)) {
      throw new Error('Package [' + name + '] not found!');
    }
    if (name === pkgName) {
      // TODO: warn this circular dependency
      return;
    }
    if (!dict[name]) {
      dict[name] = true;
      var subDep = pkgs[name].dependencies;
      if (subDep && subDep.forEach) {
        subDep.forEach(loop);
      }
    }
  };

  dependencies.forEach(loop);

  var ret = [];
  for (var key in dict) {
    ret.push(key);
  }
  return ret;

};
