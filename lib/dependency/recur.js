module.exports = function (pkgs, dependencies) {

  if (dependencies === undefined || dependencies.length === 0) {
    return [];
  }

  var dict = {};
  var loop = function (name) {
    if (!(name in pkgs)) {
      throw new Error('Package [' + name + '] not found!');
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
