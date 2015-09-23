var Set = require('../../../lib/util/set');
var expect = require('expect');

describe('A simple set', function () {

  it('Normal use', function () {
    var a = new Set();
    a.add('a');
    a.addBatch(['a', 'b']);
    a.add('c');
    a.addBatch(['b', 'c', 'd', 'e']);
    expect(a.array).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

});
