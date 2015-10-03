var worker = require('../../../lib/worker');
var expect = require('chai').expect;

describe('Compress', function () {

  it('Compressor not found', function () {
    expect(function () {
      worker.perform({
        'behavior': 'compress',
        'args': {
          'type': 'whatever'
        }
      });
    }).to.throw('Compressor for [whatever] not found!');
    expect(function () {
      worker.perform({
        'behavior': 'compress'
      });
    }).to.throw('Compressor for [undefined] not found!');
  });

});
