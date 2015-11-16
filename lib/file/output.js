var namer = require('./namer');

// NOTE: It does NOT actually output. It just generates the output paths.
// It does not return. The argument `commands` will change.
module.exports = function (assets, pkg, commands) {
  if (commands.length === 0) {
    return;
  }
  commands.forEach(namer(assets, pkg));
};
