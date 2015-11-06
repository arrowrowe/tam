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
  // compress
  ast.figure_out_scope();
  ast = ast.transform(UglifyJS.Compressor(args));
  // mangle
  ast.figure_out_scope();
  ast.compute_char_frequency();
  ast.mangle_names();
  return ast.print_to_string();
  // jscs:enable
};
