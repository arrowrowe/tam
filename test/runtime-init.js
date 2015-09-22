var rimraf = require('rimraf');
var fs = require('fs');

var runtime = require('./runtime');

rimraf(runtime.path, function () {
  fs.mkdir(runtime.path, function () {

    function mkFiles(path, files) {
      for (var name in files) {
        mkFile(path, name, files[name]);
      }
    }

    function mkFile(path, name, content) {
      var filepath = path + '/' + name;
      if (typeof content === 'string') {
        fs.writeFile(filepath, content);
      } else if (typeof content === 'object') {
        fs.mkdir(filepath, function () {
          mkFiles(filepath, content);
        });
      }
    }

    mkFiles(runtime.path, runtime.files);

  });
});
