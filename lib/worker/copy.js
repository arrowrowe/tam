var fs = require('fs-extra');

// NOTE: `files.length === output.length` MUST hold.
module.exports = function (files, output) {
  files.forEach(function (file, index) {
    fs.copySync(file, output[index]);
  });
};
