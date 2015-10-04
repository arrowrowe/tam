var fs = require('fs');
var read = require('../file/read');
var PACKAGE = require('../../package');

var title = PACKAGE.name + ' @ ' + PACKAGE.version;

module.exports = function (option) {

  option = option || {};

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

  this.log.setLevel(option.log || 'info');
  this.log.info(title, option);

  var assets = read(option.assets || 'assets.json');
  var report = this.build(this.prepare(assets));
  var linked = this.link(report, assets.www);
  fs.writeFileSync(assets.linked, JSON.stringify(linked));

};
