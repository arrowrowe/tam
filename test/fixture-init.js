var rimraf = require('rimraf');
var fs = require('fs');

var fixture = require('./fixture');

rimraf(fixture.path, function () {
  fs.mkdir(fixture.path, function () {

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

    mkFiles(fixture.path, fixture.files);

  });
});
