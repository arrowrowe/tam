var UglifyJS = require('uglify-js');
var log = require('../log');

// COPYRIGHT: Copied from http://lisperator.net/uglifyjs/compress
module.exports = function (code, args) {
  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  log.trace('Call UglifyJS with %j', args);
  var ast = UglifyJS.parse(
    (args.prefix || '') +
    code +
    (args.suffix || '')
  );
  delete args.prefix;
  delete args.suffix;
  var mangle = args.mangle === undefined ? true : args.mangle;
  delete args.mangle;
  // compress
  ast.figure_out_scope();
  ast = ast.transform(UglifyJS.Compressor(args));
  ast.figure_out_scope();
  // mangle
  if (mangle) {
    ast.compute_char_frequency();
    ast.mangle_names();
  }
  return ast.print_to_string();
  // jscs:enable
};
