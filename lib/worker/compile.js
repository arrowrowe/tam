var clone = require('clone');
var log = require('../log');

// NOTE: `files.length === output.length` MUST hold.
module.exports = function (files, output, args) {
  log.trace('Load compiler [scss]');
  var compiler = this.tools.compilers.scss;
  this.hands.write.call(this, files.map(function (file) {
    var compiled = '';
    try {
      log.trace('Call compiler with %j', args);
      compiled = compiler(file, clone(args));
    } catch (e) {
      log.warn('[%s:%d,%d] %s', e.file, e.line, e.column, e.message);
    }
    return compiled;
  }), output);
};
