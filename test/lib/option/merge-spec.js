var utilMerge = require('../../../lib/option/merge');
var expect = require('chai').expect;

describe('lib/option/merge for merging options', function () {

  function T(modeG, modeL, mode) {
    expect(utilMerge(modeG, modeL)).to.eql(mode);
  }

  it('agrees on the same opinion', function () {
    T(['a', 0], ['a', 1], 'a');
    T(['a', 1], ['a', 0], 'a');
    T(['a', 1], ['a', 1], 'a');
  });

  it('allows the high to override the low', function () {
    T(['a', 1], ['b', 0], 'a');
    T(['a', 0], ['b', 1], 'b');
  });

  it('allows the local to override the global', function () {
    T(['a', 1], ['b', 1], 'b');
  });

  it('wraps a value to [value, priority] before merging', function () {
    T('a', 'b', 'b');
    T(['a', 2], 'b', 'a');
    T('a', ['b', -1], 'a');
  });

  it('supports deep merging', function () {
    T([{
      a: ['x', 1],
      b: 'y'
    }, 3], [{
      a: 'u',
      b: 'v',
      c: ['w', 4]
    }, 2], {
      a: 'u',
      b: 'y',
      c: 'w'
    });
  });

});
