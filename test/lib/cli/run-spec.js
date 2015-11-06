var expect = require('chai').expect;
var sinon = require('sinon');
var clone = require('clone');

var fs = require('fs');
var tam = require('../../../index');

describe('lib/cli/run', function () {

  beforeEach(function () {
    sinon.stub(tam.log, 'info');
    sinon.stub(tam.log, 'warn');
    sinon.stub(tam.log, 'error');
  });

  afterEach(function () {
    tam.log.info.restore();
    tam.log.warn.restore();
    tam.log.error.restore();
  });

  function T(assets, optionRun, optionActual) {

    sinon.stub(fs, 'readFileSync').returns(JSON.stringify(assets));
    sinon.stub(tam, 'prepare');
    sinon.stub(tam, 'build');
    sinon.stub(tam, 'link');
    sinon.stub(fs, 'writeFileSync');

    tam.run(clone(optionRun));

    if (optionActual) {
      expect(tam.prepare.calledWith({
        src: '.',
        dist: 'dist',
        www: 'dist',
        linked: 'linked.json',
        option: optionActual
      })).to.equal(true);
    }

    fs.readFileSync.restore();
    tam.prepare.restore();
    tam.build.restore();
    tam.link.restore();
    fs.writeFileSync.restore();

  }

  it('allows to override option.mode and option.hash of assets, with string or array', function () {
    var assets = {option: {
      mode: ['copy', 1],
      hash: [0, 1]
    }};
    var option = {
      mode: ['compress', 3],
      hash: [0, 1]
    };
    var optionString = {
      mode: ' compress, 3 ',
      hash: ' 0, 1 '
    };
    T(assets, optionString, option);
    T(assets, option, option);
  });

  it('uses the option in assets if not specified', function () {
    var option = {
      mode: ['copy', 1],
      hash: [0, 1]
    };
    T({option: option}, {}, option);
  });

  function TError(e) {
    sinon.stub(JSON, 'parse').throws(e);
    T({}, {assets: 'i-dont-exist.json'});
    expect(tam.log.error.calledWith('Fail to read and parse json file "%s". Check its existence and json syntax. %s')).to.equal(true);
    expect(tam.log.error.calledWith('Fail to read assets "%s".')).to.equal(true);
    JSON.parse.restore();
  }

  it('throws if assets fails', function () {
    TError('some strange error');
  });

  it('throws if assets fails with an unrecognized error', function () {
    TError(Object.create(null));
  });

});
