var fillAssets = require('../../../lib/option/fill-assets');
var expect = require('chai').expect;

var log = require('../../../lib/log');
var sinon = require('sinon');

describe('lib/option/fill-assets', function () {

  before(function () {
    sinon.stub(log, 'warn');
  });

  after(function () {
    log.warn.restore();
  });

  function T(assets, option, filled) {
    expect(fillAssets(assets, option)).to.eql(filled);
  }

  it('lets option overrides assets', function () {
    var mode = 'some-mode';
    var hash = 'some-hash';
    T({
      option: {
        mode: 'another-mode',
        hash: 'another-hash'
      }
    }, {
      mode: mode,
      hash: hash
    }, {
      src: '.',
      dist: 'dist',
      www: 'dist',
      linked: 'linked.json',
      option: {
        mode: mode,
        hash: hash
      }
    });
  });

});
