var utilClassify = require('../../../lib/file/classify');
var expect = require('chai').expect;

describe('Classify different types of files', function () {

  function T(files, classified) {
    expect(utilClassify(files)).to.eql(classified);
  }

  it('Normal use', function () {
    T([
      'a.js',
      'b/a.js',
      'b/b.json',
      'b/b.scss',
      'b/c/a.css'
    ], {
      js: [
        'a.js',
        'b/a.js'
      ],
      css: [
        'b/c/a.css'
      ],
      scss: [
        'b/b.scss'
      ],
      else: [
        'b/b.json'
      ]
    });
  });

});
