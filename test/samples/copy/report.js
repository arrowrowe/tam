var fs = require('fs');
var r = function (files) {
  return files.map(fs.realpathSync);
};

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'copy',
      'files': r(['./runtime/a.js']),
      'output': ['fake/some-pkg/a.js']
    }]
  }
};
