var worker = module.exports = {
  tools: {
    copy: require('./worker/copy'),
    compress: require('./worker/compress'),
    compressors: {
      js: require('./worker/compress-js'),
      css: require('./worker/compress-css')
    },
    compile: require('./worker/compile'),
    compilers: {
      scss: require('./worker/compile-scss')
    }
  },
  build: function (report) {
    for (var pkgName in report) {
      report[pkgName].commands.forEach(worker.perform);
    }
  },
  perform: function (command) {
    var behavior = command.behavior;
    if (!(behavior in worker.tools)) {
      throw new Error('Behavior [' + behavior + '] not found!');
    }
    worker.tools[behavior].apply(worker, [command.files, command.output, command.args]);
  }
};
