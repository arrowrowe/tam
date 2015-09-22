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

  function sortFiles(report) {
    for (var pkgName in report) {
      report[pkgName].commands.forEach(function (command) {
        command.files.sort();
        command.output.sort();
      });
    }
  }

  function T(key, sample) {
    it('Normal use: ' + key, function () {
      var report = prepare(sample.assets);
      sortFiles(report);
      expect(report).toEqual(sample.report);
    });
  }

  for (var key in samples) {
    T(key, samples[key]);
  }

});
