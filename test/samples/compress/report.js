var r = require('../../util').addRuntimePathPrefixBatch;

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'compress',
      'args': {
        'type': 'js'
      },
      'files': r(['src/a.js']),
      'output': ['./runtime/dist/sample-compress/some-pkg/some-pkg.js']
    }]
  }
};
