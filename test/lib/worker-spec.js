var worker = require('../../lib/worker');
var expect = require('chai').expect;

describe('Tam worker', function () {
  it('Behavior not found', function () {
    expect(function () {
      worker.build({
        'some-pkg': {
          'commands': [{
            'behavior': 'whatever'
          }]
        }
      });
    }).to.throw('Behavior [whatever] not found!');
  });
});
