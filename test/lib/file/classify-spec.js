var utilClassify = require('../../../lib/file/classify');
var expect = require('expect');

describe('Classify different types of files', function () {

  function T(files, classified) {
    expect(utilClassify(files)).toEqual(classified);
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
