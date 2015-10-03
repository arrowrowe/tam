var Set = require('../../../lib/util/set');
var expect = require('chai').expect;

describe('A simple set', function () {

  it('Normal use', function () {
    var a = new Set();
    a.add('a');
    a.addBatch(['a', 'b']);
    a.add('c');
    a.addBatch(['b', 'c', 'd', 'e']);
    expect(a.array).to.eql(['a', 'b', 'c', 'd', 'e']);
  });

});
