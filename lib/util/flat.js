module.exports = function (array) {
  return Array.prototype.concat.apply([], array);
};
