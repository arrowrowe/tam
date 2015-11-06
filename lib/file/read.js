var fs = require('fs');
var stripJsonComments = require('strip-json-comments');
var log = require('../log');
var chalk = require('chalk');

module.exports = function (path) {
  try {
    var raw = fs.readFileSync(path, 'utf8');
    raw = stripJsonComments(raw);
    return JSON.parse(raw);
  } catch (e) {
    log.error('Fail to read and parse json file "%s". Check its existence and json syntax. %s',
      chalk.red(path),
      chalk.red(e.message || e.msg || (e.toString && e.toString()) || 'Error unrecognized.')
    );
  }
};
