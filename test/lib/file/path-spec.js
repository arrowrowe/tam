var utilPath = require('../../../lib/file/path');
var getRealPkgSrc = require('../../../lib/file/get-real-pkg-src');
var expect = require('chai').expect;

var runtimeSrcPath = require('../../util').runtimePath + 'src/';

describe('lib/file/path', function () {

  var assets = {src: runtimeSrcPath};

  function T(pkg, files) {
    var ret = utilPath(assets, pkg);
    expect(ret).to.eql(files.map(function (file) {
      return runtimeSrcPath + file;
    }));
    if (ret.length) {
      expect(pkg.realSrc).to.equal(getRealPkgSrc(assets, pkg));
    }
  }

  it('works out real paths of the package\'s files, supporting src overriding name', function () {
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

  it('supports file wildcard', function () {
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

  it('works well with empty files', function () {
    T({}, []);
    T({files: []}, []);
  });

});
