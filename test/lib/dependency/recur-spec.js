var utilRecur = require('../../../lib/dependency/recur');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('lib/dependency/recur', function () {

  function T(pkgs, name, recurred) {
    expect(utilRecur(pkgs, pkgs[name].dependencies, name)).to.eql(recurred);
  }

  it('works out all dependencies of a package', function () {
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

  it('works well with no dependency', function () {
    T({'a': {}}, 'a', []);
    T({'a': {dependencies: []}}, 'a', []);
  });

  it('throws package not found', function () {
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

  it('works well with circular dependencies, warning', function () {
    var log = require('../../../lib/log');
    sinon.stub(log, 'warn');
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
    expect(log.warn.calledWith('Package [%s] dependents on itself!', 'b')).to.equal(true);
    log.warn.restore();
  });

});
