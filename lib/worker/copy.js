var fs = require('fs-extra');

module.exports = function (files, output) {
  // NOTE: here we do NOT check if `files.length === output.length`.
  files.forEach(function (file, index) {
    fs.copySync(file, output[index]);
  });
};
