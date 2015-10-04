var config = require('./config');

module.exports = function (option) {
  if (option === undefined) {
    return config.dict;
  }
  config.list.forEach(function (arg) {
    if (option[arg.name] === undefined) {
      option[arg.name] = arg.defaultValue;
    }
  });
  return option;
};
