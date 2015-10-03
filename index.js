var fs = require('fs');
var read = require('./lib/file/read');

var PACKAGE = require('./package');

var tam = {
  version: PACKAGE.version,
  prepare: require('./lib/prepare'),
  link: require('./lib/link'),
  worker: require('./lib/worker'),
  log: require('./lib/log')
};

tam.tools = tam.worker.tools;
tam.build = tam.worker.build;

tam.run = function (option) {

  option = option || {};

  var title = PACKAGE.name + ' @ ' + PACKAGE.version;

  /* eslint-disable no-console */
  if (option.version) {
    console.log(title);
    return;
  }
  if (option.help) {
    var cli = require('./lib/util/cli');
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

module.exports = tam;
