var tam = {
  version: require('./package.json').version,
  prepare: require('./lib/prepare'),
  link: require('./lib/link'),
  worker: require('./lib/worker'),
  log: require('./lib/log')
};

tam.tools = tam.worker.tools;
tam.build = tam.worker.build;

module.exports = tam;
