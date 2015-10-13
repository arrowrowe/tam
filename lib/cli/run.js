var fs = require('fs');
var read = require('../file/read');
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
  this.log.info(title, option);

  var assets = read(option.assets);
  if (option.mode !== undefined) {
    assets.option.mode = option.mode;
  }
  if (option.hash !== undefined) {
    assets.option.hash = option.hash;
  }

  var report = this.build(this.prepare(assets));
  if (assets.linked === undefined) {
    this.log.warn('No `linked` found in [%s]. Linked\'s output fails.', option.assets);
  } else {
    var linked = this.link(report, assets.www);
    fs.writeFileSync(assets.linked, JSON.stringify(linked));
  }

};
