var fs = require('fs');

var open = function (files) {
  return files.map(function (file) {
    return fs.readFileSync(file, 'utf8');
  }).join('\n');
};

module.exports = function (files, output, args) {
  var compressor = this.tools.compressors[args.type];
  delete args.type;
  compressor(open(files), args);
};
