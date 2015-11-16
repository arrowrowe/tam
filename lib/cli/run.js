var fs = require('fs');
var PACKAGE = require('../../package');

var cliOption = require('./option');

var title = PACKAGE.name + ' @ ' + PACKAGE.version;

module.exports = function (option) {

  option = cliOption(option);

  /* eslint-disable no-console */
  if (option.version) {
    console.log(title);
    return;
  }
  if (option.help) {
    var cli = require('./cli');
    console.log(cli.getUsage({
      title: title,
      description: PACKAGE.description,
      footer: 'Project home: [underline]{' + PACKAGE.homepage + '}'
    }));
    return;
  }
  /* eslint-enable no-console */

  this.log.setLevel(option.log);
  this.log.info('%s "%s" - mode %j, hash %j, log %s.', title, option.assets, option.mode, option.hash, option.log);

  var assets = this.read(option.assets);
  if (!assets) {
    this.log.error('Fail to read assets "%s".', option.assets);
    return false;
  }

  assets = this.fillAssets(assets, option);

  var report = this.build(this.prepare(assets));
  var linked = this.link(report, assets.www);
  fs.writeFileSync(assets.linked, JSON.stringify(linked));
  return true;

};
