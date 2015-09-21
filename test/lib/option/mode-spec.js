var utilMode = require('../../../lib/option/mode');
var expect = require('expect');

describe('Merge option: mode', function () {

  function T(modeG, modeL, mode) {
    expect(utilMode(modeG, modeL)).toBe(mode);
  }

  it('Agree', function () {
    T(['a', 0], ['a', 1], 'a');
    T(['a', 1], ['a', 0], 'a');
    T(['a', 1], ['a', 1], 'a');
  });

  it('High override low', function () {
    T(['a', 1], ['b', 0], 'a');
    T(['a', 0], ['b', 1], 'b');
  });

  it('Local override global', function () {
    T(['a', 1], ['b', 1], 'b');
  });

});
