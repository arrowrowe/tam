var fs = require('fs-extra');

// NOTE: `files.length === output.length` MUST hold.
module.exports = function (files, output, args) {
  var compiler = this.tools.compilers.scss;
  this.hands.write.call(this, files.map(function (file) {
    var compiled = '';
    try {
      compiled = compiler(fs.readFileSync(file, 'utf8'), args);
    } catch (e) {
      // TODO: warn this error
    }
    return compiled;
  }), output);
};
