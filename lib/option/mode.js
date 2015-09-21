module.exports = function (modeG, modeL) {
  if (modeG[0] === modeL[0]) { return modeG[0]; }
  if (modeG[1] > modeL[1]) { return modeG[0]; }
  if (modeG[1] < modeL[1]) { return modeL[0]; }
  return modeL[0];
};
