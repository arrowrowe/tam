var clone = require('clone');
var util = {
  extend: require('./option/extend'),
  merge: require('./option/merge'),
  path: require('./file/path'),
  classify: require('./file/classify'),
  decide: require('./behavior/decide'),
  recur: require('./dependency/recur'),
  output: require('./file/output')
};

module.exports = function (assetsOrigin) {

  var assets = clone(assetsOrigin);

  var pkgs = assets.packages;
  var report = Object.create(null);

  var optionGlobal = util.extend({
    mode: ['copy', 0],
    hash: [0, 0],
    export: [true, 0]
  }, assets.option);

  for (var pkgName in pkgs) {

    var pkg = pkgs[pkgName];
    pkg.name = pkgName;
    var option = util.merge(clone(optionGlobal), util.extend({
      mode: ['copy', -1],
      hash: [0, -1],
      export: [true, -1]
    }, pkg.option));

    report[pkgName] = {
      hash: option.hash,
      export: option.export,
      dependencies: util.recur(pkgs, pkg.dependencies, pkgName),
      commands: util.decide(option, util.classify(util.path(assets, pkg)))
    };

    util.output(assets, pkg, report[pkgName].commands);

  }

  return report;

};
