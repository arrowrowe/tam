var fs = require('fs');
var stripJsonComments = require('strip-json-comments');

module.exports = function (path) {
  var raw = fs.readFileSync(path, 'utf8');
  raw = stripJsonComments(raw);
  return JSON.parse(raw);
};
