// This test specify `prepare`, `link` and `build`.

var tam = require('../../index');
var expect = require('chai').expect;
var sinon = require('sinon');

var tree = require('../util').tree;

var samples = {
  'copy': {
    'assets': require('../samples/copy/assets'),
    'report': require('../samples/copy/report'),
    'linked': require('../samples/copy/linked'),
    'build': require('../samples/copy/build')
  },
  'compress': {
    'assets': require('../samples/compress/assets'),
    'report': require('../samples/compress/report'),
    'linked': require('../samples/compress/linked'),
    'build': require('../samples/compress/build')
  }
};

describe('The prepare-build-link workflow', function () {

  beforeEach(function () {
    sinon.stub(tam.log, 'info');
  });

  afterEach(function () {
    tam.log.info.restore();
  });

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
    it('works well with sample [' + key + ']', function () {

      var prepared = tam.prepare(sample.assets);
      sortReport(prepared);
      expect(prepared).to.eql(sample.report, 'lib/prepare works');

      var report = tam.build(prepared);
      expect(tree(sample.assets.dist)).to.eql(sample.build, 'lib/worker\'s build wroks');

      var linked = tam.link(report, sample.assets.www);
      sortLinked(linked);
      expect(linked).to.eql(sample.linked, 'lib/link works');

    });
  }

  for (var key in samples) {
    T(key, samples[key]);
  }

});
