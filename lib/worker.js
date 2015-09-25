var worker = module.exports = {
  tools: {
    copy: require('./worker/copy'),
    compress: require('./worker/compress'),
    compile: require('./worker/compile')
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
    worker.tools[behavior](command.files, command.output, command.args);
  }
};
