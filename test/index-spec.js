var tam = require('../index');
var expect = require('expect');

var r = require('./util').addRuntimePathPrefixBatch;

describe('Require tam', function () {

  it('Check tam\'s version', function () {
    expect(tam.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('Simplest case', function () {
    var assets = {
      'src': './runtime',
      'dist': '/repo/fake/www/static/',
      'www': '/repo/fake/www/',
      'packages': {
        'some-pkg': {
          'name': 'some-pkg',
          'src': '.',
          'files': ['a.js']
        }
      }
    };
    var report = {
      'some-pkg': {
        'dependencies': [],
        'commands': [{
          'behavior': 'copy',
          'files': r(['a.js']),
          'output': ['/repo/fake/www/static/some-pkg/a.js']
        }]
      }
    };
    var linked = {
      'some-pkg': ['static/some-pkg/a.js']
    };
    expect(tam.prepare(assets)).toEqual(report);
    expect(tam.link(report, assets.www)).toEqual(linked);
  });

});
