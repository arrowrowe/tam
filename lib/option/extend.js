module.exports = function (low, high) {
  high = high || Object.create(null);
  for (var key in low) {
    if (!(key in high)) {
      high[key] = low[key];
    }
  }
  return high;
};
