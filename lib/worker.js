var fs = require('fs-extra');
var path = require('path');

var crypto = require('crypto');
var clone = require('clone');

var log = require('./log');

var worker = {
  build: function (reportOrigin) {
    var report = clone(reportOrigin);
    for (var pkgName in report) {
      log.info('Package [%s] begins building...', pkgName);
      worker.hashLength = report[pkgName].hash;
      report[pkgName].commands.forEach(worker.perform);
      log.info('Package [%s] builded.', pkgName);
    }
    return report;
  },
  perform: function (command) {
    var behavior = command.behavior;
    log.debug('Perform [%s] with argument %j', command.behavior, command.args || {});
    if (!(behavior in worker.tools)) {
      throw new Error('Behavior [' + behavior + '] not found!');
    }
    worker.tools[behavior].apply(worker, [command.files, command.output, command.args]);
  },
  hash: {
    file: require('hash-file').sync,
    string: function (s) {
      return crypto.createHash('sha1').update(s).digest('hex');
    }
  },
  rename: function (file, hash, hashLength) {
    var stat = path.parse(file);
    return path.join(
      stat.dir,
      stat.name + '-' + hash.substr(0, hashLength) + stat.ext
    );
  }
};

// NOTE: files or contents MUST have the same length as output.
worker.hands = {
  copy: function (files, output) {
    var self = this;
    files.forEach(function (file, index) {
      if (self.hashLength && ['.js', '.css'].indexOf(path.extname(file)) >= 0) {
        output[index] = self.rename(output[index], self.hash.file(file), self.hashLength);
      }
      fs.copySync(file, output[index]);
    });
  },
  write: function (contents, output) {
    var self = this;
    contents.forEach(function (content, index) {
      if (self.hashLength) {
        output[index] = self.rename(output[index], self.hash.string(content), self.hashLength);
      }
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
