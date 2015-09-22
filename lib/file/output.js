var combine = require('./combine');

// NOTE: It does NOT actually output. It just generates the output paths.
// It does not return. The argument `commands` will change.
module.exports = function (optG, pkg, commands) {

  var srcLength = pkg.realSrc.length;
  var pkgDist = pkg.dist || pkg.name;
  var dist = combine(optG.dist, pkgDist) + '/';

  function trans(files) {
    return files.map(function (file) {
      return dist + file.substr(srcLength);
    });
  }

  function getCompiledPath(scss) {
    return scss.substr(0, scss.length - 4) + 'css';
  }

  commands.forEach(function (command) {
    if (command.behavior === 'copy') {
      command.output = trans(command.files);
    } else if (command.behavior === 'compile') {
      command.output = trans(command.files).map(getCompiledPath);
    } else if (command.behavior === 'compress') {
      command.output = [dist + pkg.name + '.' + command.args.type];
    } else {
      throw new Error('Unrecognized behavior [' + command.behavior + ']!');
    }
  });

};
