module.exports = function (modeGlobal, modeLocal) {
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
