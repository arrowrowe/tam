var utilPath = require('../../../lib/file/path');
var expect = require('expect');

var fs = require('fs');

describe('Get real paths of the package\'s files', function () {

  var optG = {src: './runtime'};
  var root = fs.realpathSync(optG.src) + '/';

  function T(pkg, files) {
    expect(utilPath(optG, pkg)).toEqual(files.map(function (file) {
      return root + file;
    }));
  }

  it('Empty', function () {
    T({}, []);
    T({files: []}, []);
  });

  it('Normal use, and that src override name', function () {
    T({
      name: 'a',
      src: '.',
      files: [
        'a.js',
        'b/a.js'
      ]
    }, [
      'a.js',
      'b/a.js'
    ]);
  });

  it('Wildcard', function () {
    T({
      name: 'b',
      files: [
        '**/*.js',
        'c/*.css'
      ]
    }, [
      'b/a.js',
      'b/b.js',
      'b/c/a.js',
      'b/c/a.css'
    ]);
  });

});
