var fs = require('fs-extra');

var worker = {
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

// NOTE: files or contents MUST have the same length as output.
worker.hands = {
  copy: function (files, output) {
    files.forEach(function (file, index) {
      fs.copySync(file, output[index]);
    });
  },
  write: function (contents, output) {
    contents.forEach(function (content, index) {
      fs.outputFileSync(output[index], content);
    });
  }
};

worker.tools = {
  copy: worker.hands.copy,
  compress: require('./worker/compress'),
  compressors: {
    js: require('./worker/compress-js'),
    css: require('./worker/compress-css')
  },
  compile: require('./worker/compile'),
  compilers: {
    scss: require('./worker/compile-scss')
  }
};

module.exports = worker;
