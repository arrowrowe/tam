var worker = require('../../lib/worker');
var expect = require('expect');

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
    }).toThrow('Behavior [whatever] not found!');
  });
});
