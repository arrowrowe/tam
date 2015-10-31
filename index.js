var tam = {
  version: require('./package').version,
  read: require('./lib/file/read'),
  prepare: require('./lib/prepare'),
  link: require('./lib/link'),
  worker: require('./lib/worker'),
  log: require('./lib/log'),
  run: require('./lib/cli/run')
};

tam.tools = tam.worker.tools;
tam.build = tam.worker.build;

module.exports = tam;
