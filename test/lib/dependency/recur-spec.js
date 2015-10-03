var utilRecur = require('../../../lib/dependency/recur');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Recur dependencies', function () {

  function T(pkgs, name, recurred) {
    expect(utilRecur(pkgs, pkgs[name].dependencies, name)).to.eql(recurred);
  }

  it('Empty', function () {
    T({'a': {}}, 'a', []);
    T({'a': {dependencies: []}}, 'a', []);
  });

  it('Package not found', function () {
    expect(function () {
      T({
        'a': {},
        'b': {
          dependencies: ['a', 'c']
        },
        'c': {
          dependencies: ['a', 'd']
        }
      }, 'b');
    }).to.throw('Package [d] not found!');
  });

  it('Normal use, including omitted or empty dependencies', function () {
    T({
      'a': {},
      'b': {
        dependencies: ['a', 'c']
      },
      'c': {
        dependencies: ['a', 'd']
      },
      'd': {
        dependencies: []
      }
    }, 'b', ['a', 'd', 'c']);
  });

  it('Circular dependencies', function () {
    var log = require('../../../lib/log');
    var stub = sinon.stub(log, 'warn');
    T({
      'a': {},
      'b': {
        dependencies: ['a', 'c']
      },
      'c': {
        dependencies: ['a', 'd']
      },
      'd': {
        dependencies: ['b']
      }
    }, 'b', ['a', 'd', 'c']);
    expect(stub.calledWith('Package [%s] dependents on itself!', 'b')).to.equal(true);
    log.warn.restore();
  });

});
