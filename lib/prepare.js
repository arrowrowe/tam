var util = {
  extend: require('./option/extend'),
  merge: require('./option/merge'),
  path: require('./file/path'),
  classify: require('./file/classify'),
  decide: require('./behavior/decide'),
  recur: require('./dependency/recur'),
  output: require('./file/output')
};

module.exports = function (optG) {

  var pkgs = optG.packages;
  var report = Object.create(null);

  var optionGlobal = util.extend({
    mode: ['copy', 0],
    hash: [0, 0]
  }, optG.option);

  for (var pkgName in pkgs) {

    var pkg = pkgs[pkgName];
    var option = util.merge(optionGlobal, util.extend({
      mode: ['copy', 0],
      hash: [0, 0]
    }, pkg.option));

    report[pkgName] = {
      dependencies: util.recur(pkgs, pkg.dependencies, pkgName),
      commands: util.decide(option, util.classify(util.path(optG, pkg)))
    };

    util.output(optG, pkg, report[pkgName].commands, option);

  }

  return report;

};
