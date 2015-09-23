var flat = require('../../../lib/util/flat');
var expect = require('expect');

describe('Flat arrays', function () {

  it('Normal use', function () {
    expect(flat([
      ['a', 'b'],
      ['c', 'd', 'e'],
      ['f']
    ])).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

});
