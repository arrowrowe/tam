var link = require('../../lib/link');
var expect = require('chai').expect;

describe('lib/link for generating relative paths to the www directory', function () {

  var report = {
    'a': {
      'dependencies': [],
      'commands': [{
        'behavior': 'copy',
        'files': ['/repo/fake/src/a.js'],
        'output': ['/www/fake/src/a.js']
      }]
    }
  };

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

});
