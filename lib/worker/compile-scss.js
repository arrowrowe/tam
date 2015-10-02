var sass = require('node-sass');

module.exports = function (file, args) {
  args.file = file;
  args.outputStyle = args.pretty ? 'expanded' : 'compressed';
  delete args.pretty;
  return sass.renderSync(args).css.toString();
};
