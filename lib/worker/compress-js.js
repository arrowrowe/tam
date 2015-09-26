var UglifyJS = require('uglify-js');

// COPYRIGHT: Copied from http://lisperator.net/uglifyjs/compress
module.exports = function (code, args) {
  var ast = UglifyJS.parse(code);
  ast.figure_out_scope();
  ast = ast.transform(UglifyJS.Compressor(args));
  return ast.print_to_string();
};
