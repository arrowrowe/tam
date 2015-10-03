var sass = require('node-sass');
var log = require('../log');

module.exports = function (file, args) {
  args.file = file;
  args.outputStyle = args.pretty ? 'expanded' : 'compressed';
  delete args.pretty;
  log.trace('Call node-sass with %j', args);
  return sass.renderSync(args).css.toString();
};
