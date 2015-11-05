var getRealPkgSrc = require('../../../lib/file/get-real-pkg-src');
var expect = require('chai').expect;

var sinon = require('sinon');
var fs = require('fs');
var log = require('../../../lib/log');

describe('lib/file/get-real-pkg-src', function () {

  it('catches fs\'s error', function () {

    var fsErrorMessage = 'fs error';
    var pkgName = 'some-pkg';
    sinon.stub(fs, 'realpathSync').throws({
      message: fsErrorMessage
    });
    sinon.stub(log, 'error');

    getRealPkgSrc({}, {name: pkgName});
    expect(log.error.calledWith('Error occurs for package %s: %s')).to.equal(true);

    fs.realpathSync.restore();
    log.error.restore();

  });

});
