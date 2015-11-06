var wrapToPriority = function (raw, priority) {
  return raw instanceof Array && raw.length === 2 && typeof raw[1] === 'number' ?
    raw :
    [raw, priority];
};

module.exports = function (modeGlobalRaw, modeLocalRaw) {
  var modeGlobal = wrapToPriority(modeGlobalRaw, 0);
  var modeLocal = wrapToPriority(modeLocalRaw, 1);
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
