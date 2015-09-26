var worker = require('../../../lib/worker');
var expect = require('expect');

describe('Compress', function () {

  it('Compressor not found', function () {
    expect(function () {
      worker.perform({
        'behavior': 'compress',
        'args': {
          'type': 'whatever'
        }
      });
    }).toThrow('Compressor for [whatever] not found!');
    expect(function () {
      worker.perform({
        'behavior': 'compress'
      });
    }).toThrow('Compressor for [undefined] not found!');
  });

});
