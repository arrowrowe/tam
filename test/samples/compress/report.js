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
      'output': r(['dist/sample-compress/some-pkg/some-pkg.js'])
    }, {
      'behavior': 'compress',
      'args': {
        'type': 'css'
      },
      'files': r(['src/b/a.css']),
      'output': r(['dist/sample-compress/some-pkg/some-pkg.css'])
    }]
  }
};
