var r = require('../../util').addRuntimePathPrefixBatch;

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['a.js']),
      'output': ['fake/some-pkg/a.js']
    }]
  },
  'another-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['b/a.css', 'b/a.js', 'b/c/a.css', 'b/c/a.js']),
      'output': ['fake/another-pkg/a.css', 'fake/another-pkg/a.js', 'fake/another-pkg/c/a.css', 'fake/another-pkg/c/a.js']
    }]
  }
};
