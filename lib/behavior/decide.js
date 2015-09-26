var extend = require('../option/extend');

module.exports = function (option, classified) {

  var mode = option.mode;

  var isModeCopy = mode === 'copy';
  var isModeCompress = mode === 'compress';

  if (!(isModeCopy || isModeCompress)) {
    throw new Error('Unrecognized mode [' + mode + ']!');
  }

  function pushCommand(command) {
    if (command.args && option[command.behavior]) {
      command.args = extend(command.args, option[command.behavior]);
    }
    commands.push(command);
  }

  function pushCommands(commands) {
    commands.forEach(pushCommand);
  }

  var commands = [];

  if (isModeCopy) {
    pushCommands([{
      behavior: 'copy',
      files: classified.else.concat(classified.js).concat(classified.css)
    }, {
      behavior: 'compile',
      args: {
        'pretty': true
      },
      files: classified.scss
    }]);
  }

  if (isModeCompress) {
    pushCommands([{
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
    }]);
  }

  return commands.filter(function (command) {
    return command.files.length > 0;
  });

};
