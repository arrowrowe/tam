var fs = require('fs-extra');

// NOTE: `files.length === output.length` MUST hold.
module.exports = function (files, output, args) {
  var compiler = this.tools.compilers.scss;
  files.forEach(function (file, index) {
    fs.outputFileSync(output[index], compiler(fs.readFileSync(file, 'utf8'), args));
  });
};
