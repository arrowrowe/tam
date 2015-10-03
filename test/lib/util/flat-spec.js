var flat = require('../../../lib/util/flat');
var expect = require('chai').expect;

describe('Flat arrays', function () {

  it('Normal use', function () {
    expect(flat([
      ['a', 'b'],
      ['c', 'd', 'e'],
      ['f']
    ])).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
  });

});
