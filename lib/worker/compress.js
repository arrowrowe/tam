var fs = require('fs-extra');
var log = require('../log');

var open = function (files) {
  return files.map(function (file) {
    return fs.readFileSync(file, 'utf8');
  }).join('\n');
};

// NOTE: `output.length === 1` MUST hold.
module.exports = function (files, output, args) {
  if (!(args && (args.type in this.tools.compressors))) {
    throw new Error('Compressor for [' + (args ? args.type : 'undefined') + '] not found!');
  }
  log.trace('Load compressor [%s]', args.type);
  var compressor = this.tools.compressors[args.type];
  var compressed = '';
  var argsForCompressor = args[args.type] || {};
  try {
    log.trace('Call compressor with %j', argsForCompressor);
    compressed = compressor(open(files), argsForCompressor);
  } catch (e) {
    log.warn('[%s:%d,%d] %s', e.file, e.line, e.column, e.message || e.msg);
  }
  this.hands.write.call(this, [compressed], output);
};
