var utilPath = require('../../../lib/file/path');
var expect = require('expect');

var fs = require('fs');

describe('Get real paths of the package\'s files', function () {

  var optG = {
    src: './runtime',
    dist: 'fake'
  };
  var root = fs.realpathSync(optG.src) + '/';

  function T(pkg, filesIn, filesOut) {
    expect(utilPath(optG, pkg)).toEqual({
      input: filesIn.map(function (file) { return root + file; }),
      output: filesOut
    });
  }

  it('Empty', function () {
    T({}, [], []);
    T({files: []}, [], []);
  });

  it('Normal use, and that src override name', function () {
    T({
      name: 'a',
      src: '.',
      dist: '.',
      files: [
        'a.js',
        'b/a.js'
      ]
    }, [
      'a.js',
      'b/a.js'
    ], [
      'fake/a.js',
      'fake/b/a.js'
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
    ], [
      'fake/b/a.js',
      'fake/b/b.js',
      'fake/b/c/a.js',
      'fake/b/c/a.css'
    ]);
  });

});
