var mode = require('./mode');

module.exports = function (optionGloabl, optionLocal) {
  for (var key in optionGloabl) {
    optionLocal[key] = mode(optionGloabl[key], optionLocal[key]);
  }
  return optionLocal;
};
