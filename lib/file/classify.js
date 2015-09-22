module.exports = function (files) {
  var classified = {
    input: {
      js: [],
      css: [],
      scss: [],
      else: []
    },
    output: {
      js: [],
      css: [],
      scss: [],
      else: []
    }
  };
  files.input.forEach(function (file, index) {
    var output = files.output[index];
    if (file.substr(-3) === '.js') {
      classified.input.js.push(file);
      classified.output.js.push(output);
    } else if (file.substr(-4) === '.css') {
      classified.input.css.push(file);
      classified.output.css.push(output);
    } else if (file.substr(-5) === '.scss') {
      classified.input.scss.push(file);
      classified.output.scss.push(output);
    } else {
      classified.input.else.push(file);
      classified.output.else.push(output);
    }
  });
  return classified;
};
