var runtimePath = process.env.PWD + '/runtime/';
var r = function (files) {
  return files.map(function (file) {
    return runtimePath + file;
  });
};

module.exports = {
  'some-pkg': {
    'dependencies': [],
    'commands': [{
      'behavior': 'compress',
      'args': {
        'type': 'js'
      },
      'files': r(['a.js']),
      'output': ['fake/some-pkg/some-pkg.js']
    }]
  }
};
