var r = require('../../util').addRuntimePathPrefixBatch;

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['src/a.js']),
      'output': ['runtime/dist/sample-copy/some-pkg/a.js']
    }]
  },
  'another-pkg': {
    'dependencies': ['some-pkg'],
    'commands': [{
      'behavior': 'copy',
      'files': r(['src/b/a.css', 'src/b/a.js', 'src/b/b.json', 'src/b/c/a.css', 'src/b/c/a.js']),
      'output': ['runtime/dist/sample-copy/another-pkg/a.css', 'runtime/dist/sample-copy/another-pkg/a.js', 'runtime/dist/sample-copy/another-pkg/b.json', 'runtime/dist/sample-copy/another-pkg/c/a.css', 'runtime/dist/sample-copy/another-pkg/c/a.js']
    }, {
      'behavior': 'compile',
      'args': {'pretty': true },
      'files': r(['src/b/b.scss']),
      'output': ['runtime/dist/sample-copy/another-pkg/b.css']
    }]
  }
};
