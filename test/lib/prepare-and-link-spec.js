var prepare = require('../../lib/prepare');
var link = require('../../lib/link');
var expect = require('expect');

var samples = {
  'copy': {
    'assets': require('../samples/copy/assets'),
    'report': require('../samples/copy/report'),
    'linked': require('../samples/copy/linked')
  },
  'compress': {
    'assets': require('../samples/compress/assets'),
    'report': require('../samples/compress/report'),
    'linked': require('../samples/compress/linked')
  }
};

describe('Prepare a report and link the result', function () {

  function sortReport(report) {
    for (var pkgName in report) {
      report[pkgName].commands.forEach(function (command) {
        command.files.sort();
        command.output.sort();
      });
    }
  }

  function sortLinked(linked) {
    for (var pkgName in linked) {
      linked[pkgName].sort();
    }
  }

  function T(key, sample) {
    it('Normal use: ' + key, function () {

      var report = prepare(sample.assets);
      sortReport(report);
      expect(report).toEqual(sample.report);

      var linked = link(report, sample.assets.www);
      sortLinked(linked);
      expect(linked).toEqual(sample.linked);

    });
  }

  for (var key in samples) {
    T(key, samples[key]);
  }

});
