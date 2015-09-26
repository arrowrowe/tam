var fs = require('fs');
var path = require('path');

var util = module.exports = {
  runtimePath: process.env.PWD + '/runtime/',
  addRuntimePathPrefix: function (file) {
    return util.runtimePath + file;
  },
  addRuntimePathPrefixBatch: function (files) {
    return files.map(util.addRuntimePathPrefix);
  },
  tree: function (root) {
    var tree = Object.create(null);
    try {
      fs.readdirSync(root).forEach(function (name) {
        var file = path.join(root, name);
        var stat = fs.lstatSync(file);
        tree[name] = stat.isDirectory() ? util.tree(file) : stat.size;
      });
    } catch (e) {/**/}
    return tree;
  }
};
