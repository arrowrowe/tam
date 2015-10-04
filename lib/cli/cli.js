var commandLineArgs = require('command-line-args');

module.exports = commandLineArgs([{
  name: 'assets',
  alias: 'a',
  type: String,
  defaultOption: true,
  defaultValue: 'assets.json',
  description: 'The tam-assets you want to build. Default is `assets.json`.'
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
}]);
