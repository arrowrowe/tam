var tam = {
  version: require('./package').version,
  read: require('./lib/file/read'),
  prepare: require('./lib/prepare'),
  link: require('./lib/link'),
  worker: require('./lib/worker'),
  log: require('./lib/log'),
  run: require('./lib/cli/run'),
  fillAssets: require('./lib/option/fill-assets'),
  namer: require('./lib/file/namer')
};

tam.tools = tam.worker.tools;
tam.build = tam.worker.build;

module.exports = tam;
