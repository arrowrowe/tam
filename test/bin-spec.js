var expect = require('chai').expect;
var sinon = require('sinon');
var path = require('path');

var cli = require('../lib/util/cli');
var tam = require('../index');
var fs = require('fs');

describe('The Tam\'s bin', function () {

  var binPath = path.resolve('./bin/tam.js');

  beforeEach(function () {
    sinon.stub(cli, 'parse');
    sinon.stub(tam, 'prepare');
    sinon.stub(tam, 'build');
    sinon.stub(tam, 'link');
    sinon.stub(fs, 'writeFileSync');
  });

  afterEach(function () {
    delete require.cache[binPath];
    cli.parse.restore();
    tam.prepare.restore();
    tam.build.restore();
    tam.link.restore();
    fs.writeFileSync.restore();
  });

  function T(option, timesPrepare, timesBuild, timesLink, timesWrite) {
    cli.parse.returns(option);
    require('../bin/tam');
    expect(tam.prepare.callCount).to.equal(timesPrepare);
    expect(tam.build.callCount).to.equal(timesBuild);
    expect(tam.link.callCount).to.equal(timesLink);
    expect(fs.writeFileSync.callCount).to.equal(timesWrite);
  }

  it('shows a guide', function () {
    T({
      help: true
    }, 0, 0, 0, 0);
  });

  it('calls Tam\'s prepare-build-link workflow', function () {
    T({
      assets: 'test/samples/copy/assets.json',
      log: 'info',
      help: false
    }, 1, 1, 1, 1);
  });

});

