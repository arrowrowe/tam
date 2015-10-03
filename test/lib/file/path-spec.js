var utilPath = require('../../../lib/file/path');
var getRealPkgSrc = require('../../../lib/file/get-real-pkg-src');
var expect = require('chai').expect;

var runtimeSrcPath = require('../../util').runtimePath + 'src/';

describe('Get real paths of the package\'s files', function () {

  var optG = {src: runtimeSrcPath};

  function T(pkg, files) {
    var ret = utilPath(optG, pkg);
    expect(ret).to.eql(files.map(function (file) {
      return runtimeSrcPath + file;
    }));
    if (ret.length) {
      expect(pkg.realSrc).to.equal(getRealPkgSrc(optG, pkg));
    }
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
