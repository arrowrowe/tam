var fs = require('fs');
var r = function (files) {
  return files.map(fs.realpathSync);
};

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'compress',
      'args': {
        'type': 'js'
      },
      'files': r(['./runtime/a.js']),
      'output': ['fake/some-pkg/some-pkg.js']
    }]
  }
};
