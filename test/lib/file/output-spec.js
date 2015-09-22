var utilOutput = require('../../../lib/file/output');
var expect = require('expect');

describe('Generate output paths according to behaviors', function () {

  var optG = {
    dist: 'fake/dist'
  };

  function T(pkg, commands, outputs) {
    utilOutput(optG, pkg, commands);
    expect(commands.map(function (command) {
      return command.output;
    })).toEqual(outputs);
  }

  it('Unrecognized behavior', function () {
    expect(function () {
      T({
        name: 'some-pkg',
        realSrc: 'fake-real-src/'
      }, [{
        behavior: 'whatever'
      }]);
    }).toThrow(/^Unrecognized behavior \[whatever\]!$/);
  });

  it('Normal use (mode copy)', function () {
    T({
      name: 'another-pkg',
      realSrc: 'another-fake/'
    }, [{
      behavior: 'copy',
      files: ['another-fake/b.json', 'another-fake/a.js', 'another-fake/b.js', 'another-fake/a.css']
    }, {
      behavior: 'compile',
      args: {
        'pretty': true
      },
      files: ['another-fake/b.scss']
    }], [
      ['fake/dist/another-pkg/b.json', 'fake/dist/another-pkg/a.js', 'fake/dist/another-pkg/b.js', 'fake/dist/another-pkg/a.css'],
      ['fake/dist/another-pkg/b.css']
    ]);
  });

  it('Normal use (mode compress)', function () {
    T({
      name: 'one-more-pkg',
      realSrc: 'one-more-fake/'
    }, [{
      behavior: 'compress',
      args: {
        'type': 'js'
      },
      files: ['one-more-fake/a.js', 'one-more-fake/b.js']
    }, {
      behavior: 'compress',
      args: {
        'type': 'css'
      },
      files: ['one-more-fake/a.css']
    }, {
      behavior: 'compile',
      args: {
        'pretty': false
      },
      files: ['one-more-fake/b.scss']
    }, {
      behavior: 'copy',
      files: ['one-more-fake/b.json']
    }], [
      ['fake/dist/one-more-pkg/one-more-pkg.js'],
      ['fake/dist/one-more-pkg/one-more-pkg.css'],
      ['fake/dist/one-more-pkg/b.css'],
      ['fake/dist/one-more-pkg/b.json']
    ]);
  });

});