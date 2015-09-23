var utilRecur = require('../../../lib/dependency/recur');
var expect = require('expect');

describe('Recur dependencies', function () {

  function T(pkgs, name, recurred) {
    expect(utilRecur(pkgs, pkgs[name].dependencies, name)).toEqual(recurred);
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
    }).toThrow(/^Package \[d\] not found!$/);
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
    }, 'b', ['a', 'c', 'd']);
  });

  it('Circular dependencies', function () {
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
    }, 'b', ['a', 'c', 'd']);
  });

});
