var util = {
  mode: require('./option/mode'),
  path: require('./file/path'),
  classify: require('./file/classify'),
  decide: require('./behavior/decide'),
  recur: require('./dependency/recur'),
  output: require('./file/output')
};

var defMode = ['copy', 0];

module.exports = function (optG) {
  var pkgs = optG.packages;
  var report = {};
  var modeG = optG.mode || defMode;
  for (var pkgName in pkgs) {
    var pkg = pkgs[pkgName];
    var mode = util.mode(modeG, pkg.mode || defMode);
    report[pkgName] = {
      dependencies: util.recur(pkgs, pkg.dependencies, pkgName),
      commands: util.decide(mode, util.classify(util.path(optG, pkg)))
    };
    util.output(optG, pkg, report[pkgName].commands);
  }
  return report;
};
