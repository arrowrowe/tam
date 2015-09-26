var link = require('../../lib/link');
var expect = require('expect');

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
    }).toThrow(/Output \[.+?\] out of www \[.*?\]!/);

    expect(link(report, '/www/')).toEqual({
      'a': ['fake/src/a.js']
    });

  });

  it('Keep the ending splash', function () {
    expect(link(report, '/www')).toEqual({
      'a': ['/fake/src/a.js']
    });
  });

});
