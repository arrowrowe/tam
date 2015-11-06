var tam = require('../index');
var expect = require('chai').expect;

var r = require('./util').addRuntimePathPrefixBatch;

describe('Tam', function () {

  it('provides a version', function () {
    expect(tam.version).to.match(/^\d+\.\d+\.\d+$/);
  });

  it('works for a minimum case', function () {
    var assets = {
      'src': './runtime/src',
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
        'hash': 0,
        'export': true,
        'dependencies': [],
        'commands': [{
          'behavior': 'copy',
          'files': r(['src/a.js']),
          'output': ['/repo/fake/www/static/some-pkg/a.js']
        }]
      }
    };
    var linked = {
      'some-pkg': ['static/some-pkg/a.js']
    };
    expect(tam.prepare(assets)).to.eql(report);
    expect(tam.link(report, assets.www)).to.eql(linked);
  });

});
