module.exports = {
  version: require('./package.json').version,
  prepare: require('./lib/prepare'),
  link: require('./lib/link')
};
