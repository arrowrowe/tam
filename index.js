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
  if (option.help) {
    var cli = require('./lib/util/cli');
    /* eslint-disable no-console */
    console.log(cli.getUsage({
      title: PACKAGE.name + '@' + PACKAGE.version,
      description: PACKAGE.description,
      footer: 'Project home: [underline]{' + PACKAGE.homepage + '}'
    }));
    /* eslint-enable no-console */
    return;
  }
  this.log.setLevel(option.log || 'info');
  this.log.info('Tam', option);
  var assets = read(option.assets || 'assets.json');
  var report = this.build(this.prepare(assets));
  var linked = this.link(report, assets.www);
  fs.writeFileSync(assets.linked, JSON.stringify(linked));
};

module.exports = tam;
