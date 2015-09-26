var fs = require('fs-extra');

var open = function (files) {
  return files.map(function (file) {
    return fs.readFileSync(file, 'utf8');
  }).join('\n');
};

module.exports = function (files, output, args) {
  if (!(args && (args.type in this.tools.compressors))) {
    throw new Error('Compressor for [' + (args ? args.type : 'undefined') + '] not found!');
  }
  var compressor = this.tools.compressors[args.type];
  delete args.type;
  fs.outputFileSync(output[0], compressor(open(files), args));
};
