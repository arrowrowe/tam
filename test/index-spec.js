var tam = require('../index');
var expect = require('expect');

describe('Require tam', function () {

  it('Check tam\'s version', function () {
    expect(tam.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

});
