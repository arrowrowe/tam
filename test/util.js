var util = module.exports = {
  runtimePath: process.env.PWD + '/runtime/',
  addRuntimePathPrefix: function (file) {
    return util.runtimePath + file;
  },
  addRuntimePathPrefixBatch: function (files) {
    return files.map(util.addRuntimePathPrefix);
  }
};
