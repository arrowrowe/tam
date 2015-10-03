var utilDecide = require('../../../lib/behavior/decide');
var expect = require('chai').expect;

describe('Decide behaviors for a specified mode and classified files', function () {

  function T(option, classified, commands) {
    expect(utilDecide(option, classified)).to.eql(commands);
  }

  it('Unrecognized mode', function () {
    expect(function () {
      T({'mode': 'whatever'});
    }).to.throw('Unrecognized mode [whatever]!');
  });

  it('Normal use (mode copy)', function () {
    T({
      'mode': 'copy'
    }, {
      js: ['a.js', 'b.js'],
      css: ['a.css'],
      scss: ['b.scss'],
      else: ['b.json']
    }, [{
      behavior: 'copy',
      files: ['b.json', 'a.js', 'b.js', 'a.css']
    }, {
      behavior: 'compile',
      args: {
        'pretty': true
      },
      files: ['b.scss']
    }]);
  });

  it('Normal use (mode compress)', function () {
    T({
      'mode': 'compress'
    }, {
      js: ['a.js', 'b.js'],
      css: ['a.css'],
      scss: ['b.scss'],
      else: ['b.json']
    }, [{
      behavior: 'compress',
      args: {
        'type': 'js'
      },
      files: ['a.js', 'b.js']
    }, {
      behavior: 'compress',
      args: {
        'type': 'css'
      },
      files: ['a.css']
    }, {
      behavior: 'compile',
      args: {
        'pretty': false
      },
      files: ['b.scss']
    }, {
      behavior: 'copy',
      files: ['b.json']
    }]);
  });

});
