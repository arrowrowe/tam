var isWithPriority = function (raw) {
  return raw instanceof Array && raw.length === 2 && typeof raw[1] === 'number';
};

var removePriority = function (raw) {
  return isWithPriority(raw) ? raw[0] : raw;
};

var wrapToPriority = function (raw, priority) {
  return isWithPriority(raw) ? raw : [raw, priority];
};

var mergeOne = function (modeGlobal, modeLocal) {
  // Global and local agree
  if (modeGlobal[0] === modeLocal[0]) {
    return modeGlobal[0];
  }
  // High overrides low
  if (modeGlobal[1] > modeLocal[1]) {
    return modeGlobal[0];
  }
  if (modeGlobal[1] < modeLocal[1]) {
    return modeLocal[0];
  }
  // Local overrides global
  return modeLocal[0];
};

var forIn = function (fn, object) {
  for (var key in object) {
    fn(object[key], key);
  }
};

var mergeObject = function (modeGlobal, modeLocal) {
  forIn(function (itemGlobal, key) {
    modeLocal[0][key] = merge(itemGlobal, modeLocal[0][key], modeGlobal[1], modeLocal[1]);
  }, modeGlobal[0]);
  forIn(function (item, key) {
    modeLocal[0][key] = removePriority(item);
  }, modeLocal[0]);
  return modeLocal[0];
};

var isObject = function (raw) {
  return typeof raw === 'object' && !(raw instanceof Array);
};

var merge = module.exports = function (modeGlobalRaw, modeLocalRaw, priorityGlobal, priorityLocal) {
  priorityGlobal = priorityGlobal === undefined ? 0 : priorityGlobal;
  priorityLocal = priorityLocal === undefined ? 1 : priorityLocal;
  var modeGlobal = wrapToPriority(modeGlobalRaw, priorityGlobal);
  var modeLocal = wrapToPriority(modeLocalRaw, priorityLocal);
  return isObject(modeGlobal[0]) && isObject(modeLocal[0]) ?
    mergeObject(modeGlobal, modeLocal) :
    mergeOne(modeGlobal, modeLocal);
};
