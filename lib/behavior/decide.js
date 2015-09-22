module.exports = function (mode, classified) {
  var isModeCopy = mode === 'copy';
  var isModeCompress = mode === 'compress';

  if (!(isModeCopy || isModeCompress)) {
    throw new Error('Unrecognized mode [' + mode + ']!');
  }

  var commands = [];

  if (isModeCopy) {
    commands.push({
      behavior: 'copy',
      files: classified.else.concat(classified.js).concat(classified.css)
    }, {
      behavior: 'compile',
      args: {
        'pretty': true
      },
      files: classified.scss
    });
  }

  if (isModeCompress) {
    commands.push({
      behavior: 'compress',
      args: {
        'type': 'js'
      },
      files: classified.js
    }, {
      behavior: 'compress',
      args: {
        'type': 'css'
      },
      files: classified.css
    }, {
      behavior: 'compile',
      args: {
        'pretty': false
      },
      files: classified.scss
    }, {
      behavior: 'copy',
      files: classified.else
    });
  }

  return commands;

};
