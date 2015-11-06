var link = require('../../lib/link');
var expect = require('chai').expect;
var clone = require('clone');

describe('lib/link for generating relative paths to the www directory', function () {

  var report = {
    'a': {
      'export': true,
      'dependencies': [],
      'commands': [{
        'behavior': 'copy',
        'files': ['/repo/fake/src/a.js'],
        'output': ['/www/fake/src/a.js']
      }]
    }
  };
  var reportWithNoExport = clone(report);
  reportWithNoExport.a.export = false;

  it('throws output out of www', function () {

    expect(function () {
      link(report, 'repo/www/');
    }).to.throw(/Output \[.+?\] out of www \[.*?\]!/);

    expect(link(report, '/www/')).to.eql({
      'a': ['fake/src/a.js']
    });

  });

  it('keeps the ending splash in paths', function () {
    expect(link(report, '/www')).to.eql({
      'a': ['/fake/src/a.js']
    });
  });

  it('can hide a package by set its export to be false', function () {
    expect(link(reportWithNoExport, '/www')).to.eql({});
  });

});
