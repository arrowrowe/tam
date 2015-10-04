var config = require('./config');

module.exports = function (option) {
  if (option === undefined) {
    option = Object.create(null);
  }
  config.forEach(function (arg) {
    var value = option[arg.name];
    if (value === undefined) {
      option[arg.name] = arg.defaultValue;
      return;
    }
    option[arg.name] = arg.type(value);
  });
  return option;
};
