function removeLastIf(s) {
  return s.substr(-1) === '/' ? s.substr(0, s.length - 1) : s;
}

module.exports = function (path, rel) {
  rel = removeLastIf(rel);
  path = removeLastIf(path);
  if (rel === '.') {
    return path;
  }
  if (rel.substr(0, 2) === './') {
    rel = rel.substr(2);
  }
  return path + '/' + rel;
};
