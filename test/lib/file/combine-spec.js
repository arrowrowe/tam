var utilCombine = require('../../../lib/file/combine');
var expect = require('expect');

describe('Combine paths', function () {

  function T(path, rel, ret) {
    expect(utilCombine(path, rel)).toBe(ret);
  }

  it('Current directory', function () {
    T('a', '.', 'a');
    T('a', './', 'a');
    T('a/', '.', 'a');
    T('a/', './', 'a');
  });

  it('Normal use', function () {
    T('a', 'b', 'a/b');
    T('a', 'b/', 'a/b');
    T('a/', 'b', 'a/b');
    T('a/', 'b/', 'a/b');
  });

  it('Normal use with current directory prefix', function () {
    T('a', './b', 'a/b');
    T('a', './b/', 'a/b');
    T('a/', './b', 'a/b');
    T('a/', './b/', 'a/b');
  });

});
