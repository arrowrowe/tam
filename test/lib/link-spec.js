var link = require('../../lib/link');
var expect = require('chai').expect;

describe('Edge use of link', function () {

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

  it('Warn output out of www', function () {

    expect(function () {
      link(report, 'repo/www/');
    }).to.throw(/Output \[.+?\] out of www \[.*?\]!/);

    expect(link(report, '/www/')).to.eql({
      'a': ['fake/src/a.js']
    });

  });

  it('Keep the ending splash', function () {
    expect(link(report, '/www')).to.eql({
      'a': ['/fake/src/a.js']
    });
  });

});
