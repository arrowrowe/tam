var flat = require('../../../lib/util/flat');
var expect = require('chai').expect;

describe('lib/util/flat', function () {

  it('flats arrays', function () {
    expect(flat([
      ['a', 'b'],
      ['c', 'd', 'e'],
      ['f']
    ])).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
  });

});
