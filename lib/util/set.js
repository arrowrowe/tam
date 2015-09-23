module.exports = function () {
  this.dict = Object.create(null);
  this.array = [];
  this.add = function (value) {
    if (!this.has(value)) {
      this.dict[value] = this.array.push(value) - 1;
    }
  };
  this.has = function (value) {
    return value in this.dict;
  };
  this.addBatch = function (values) {
    var self = this;
    values.forEach(function (value) {
      self.add(value);
    });
  };
  return this;
};
