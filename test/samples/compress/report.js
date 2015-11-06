var r = require('../../util').addRuntimePathPrefixBatch;

module.exports = {
  'some-pkg': {
    'hash': 6,
    'export': true,
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
    }, {
      'behavior': 'compile',
      'args': {
        'pretty': false
      },
      'files': r(['src/b/b.scss']),
      'output': r(['dist/sample-compress/some-pkg/b/b.css'])
    }, {
      'behavior': 'copy',
      'files': r(['src/b/b.json']),
      'output': r(['dist/sample-compress/some-pkg/b/b.json'])
    }]
  },
  'another-pkg': {
    'hash': 6,
    'export': true,
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['src/b/b.js']),
      'output': r(['dist/sample-compress/another-pkg/b.js'])
    }]
  }
};
