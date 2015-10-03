var utilDecide = require('../../../lib/behavior/decide');
var expect = require('chai').expect;

describe('lib/behavior/decide', function () {

  function T(option, classified, commands) {
    expect(utilDecide(option, classified)).to.eql(commands);
  }

  it('decides what to do with classified files for mode [copy]', function () {
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

  it('also decides for mode [compress]', function () {
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

  it('throws unrecognized modes', function () {
    expect(function () {
      T({'mode': 'whatever'});
    }).to.throw('Unrecognized mode [whatever]!');
  });

});
