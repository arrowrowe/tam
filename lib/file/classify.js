module.exports = function (files) {
  var classified = {
    js: [],
    css: [],
    scss: [],
    else: []
  };
  files.forEach(function (file) {
    if (file.substr(-3) === '.js') {
      classified.js.push(file);
    } else if (file.substr(-4) === '.css') {
      classified.css.push(file);
    } else if (file.substr(-5) === '.scss') {
      classified.scss.push(file);
    } else {
      classified.else.push(file);
    }
  });
  return classified;
};
