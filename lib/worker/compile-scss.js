var sass = require('node-sass');

module.exports = function (code, args) {
  args.data = code;
  args.outputStyle = args.pretty ? 'expanded' : 'compressed';
  delete args.pretty;
  return sass.renderSync(args).css.toString();
};
