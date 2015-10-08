// Convert strings like 'copy, 1' to config-priority array like ['copy', 1]
function stringToCP(raw) {
  if (raw instanceof Array) {
    return raw;
  }
  raw = raw.split(',');
  raw[0] = raw[0].trim();
  raw[1] = Number(raw[1].trim());
  return raw;
}

module.exports = [{
  name: 'assets',
  alias: 'a',
  type: String,
  defaultOption: true,
  defaultValue: 'assets.json',
  description: 'The tam-assets you want to build. Default is `assets.json`.'
}, {
  name: 'mode',
  alias: 'm',
  type: stringToCP,
  defaultValue: undefined,
  description: 'Build-mode and priority, e.g. `copy,1`, `compress,3`, overriding option.mode of tam-assets.'
}, {
  name: 'hash',
  alias: 's',
  type: function (raw) {
    var ret = stringToCP(raw);
    ret[0] = Number(ret[0]);
    return ret;
  },
  defaultValue: undefined,
  description: 'Hash-length and priority, e.g. `0,1`, `8,3`, overriding option.hash of tam-assets.'
}, {
  name: 'log',
  alias: 'l',
  type: String,
  defaultValue: 'info',
  description: 'Set log level: trace / debug / info / warn / error / fatal.'
}, {
  name: 'help',
  alias: 'h',
  type: Boolean,
  defaultValue: false,
  description: 'Display this guide.'
}, {
  name: 'version',
  alias: 'v',
  type: Boolean,
  defaultValue: false,
  description: 'Show Tam\'s version.'
}];
