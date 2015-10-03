#!/usr/bin/env node

var cli = require('../lib/util/cli');
var option = cli.parse();

if (option.help) {
  /* eslint-disable no-console */
  console.log(cli.getUsage({
    title: 'Tam',
    description: 'Tam is your Assets Manager.',
    footer: 'Project home: [underline]{https://github.com/arrowrowe/tam}'
  }));
  /* eslint-enable no-console */
  return;
}

var tam = require('../index');
tam.log.setLevel(option.log);
tam.log.info('Tam', option);

var read = require('../lib/file/read');
var assets = read(option.assets);

var report = tam.build(tam.prepare(assets));
var linked = tam.link(report, assets.www);

var fs = require('fs');
fs.writeFileSync(assets.linked, JSON.stringify(linked));
