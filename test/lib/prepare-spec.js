var prepare = require('../../lib/prepare');
var expect = require('expect');

var samples = {
  'copy': {
    'assets': require('../samples/copy/assets'),
    'report': require('../samples/copy/report')
  },
  'compress': {
    'assets': require('../samples/compress/assets'),
    'report': require('../samples/compress/report')
  }
};

describe('Prepare a report', function () {

  function T(key, sample) {
    it('Normal use: ' + key, function () {
      expect(prepare(sample.assets)).toEqual(sample.report);
    });
  }

  for (var key in samples) {
    T(key, samples[key]);
  }

});
