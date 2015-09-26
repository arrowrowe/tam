var r = require('../../util').addRuntimePathPrefixBatch;

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['src/a.js']),
      'output': ['fake/some-pkg/a.js']
    }]
  },
  'another-pkg': {
    'dependencies': ['some-pkg'],
    'commands': [{
      'behavior': 'copy',
      'files': r(['src/b/a.css', 'src/b/a.js', 'src/b/b.json', 'src/b/c/a.css', 'src/b/c/a.js']),
      'output': ['fake/another-pkg/a.css', 'fake/another-pkg/a.js', 'fake/another-pkg/b.json', 'fake/another-pkg/c/a.css', 'fake/another-pkg/c/a.js']
    }, {
      'behavior': 'compile',
      'args': {'pretty': true },
      'files': r(['src/b/b.scss']),
      'output': ['fake/another-pkg/b.css']
    }]
  }
};
