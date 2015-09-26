var fs = require('fs-extra');

// NOTE: `files.length === output.length` MUST hold.
module.exports = function (files, output, args) {
  var compiler = this.tools.compilers.scss;
  files.forEach(function (file, index) {
    var compiled = '';
    try {
      compiled = compiler(fs.readFileSync(file, 'utf8'), args);
    } catch (e) {
      // TODO: warn this error
    }
    fs.outputFileSync(output[index], compiled);
  });
};
