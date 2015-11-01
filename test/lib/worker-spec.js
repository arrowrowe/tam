var worker = require('../../lib/worker');
var log = require('../../lib/log');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Tam\'s worker', function () {

  it('throws behavior not found', function () {
    sinon.stub(log, 'info');
    expect(function () {
      worker.build({
        'some-pkg': {
          'commands': [{
            'behavior': 'whatever'
          }]
        }
      });
    }).to.throw('Behavior [whatever] not found!');
    log.info.restore();
  });

});
