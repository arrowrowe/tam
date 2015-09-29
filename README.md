# Tam

[![npm-version](https://img.shields.io/npm/v/tam.svg)](https://www.npmjs.com/package/tam)
[![build status](https://api.travis-ci.org/arrowrowe/tam.svg)](https://travis-ci.org/arrowrowe/tam)
[![coverage](http://codecov.io/github/arrowrowe/tam/coverage.svg?branch=master)](http://codecov.io/github/arrowrowe/tam?branch=master)

> **T**am is the **A**ssets **M**anager for you. ~~(Tam is a tame lamb!~~

## What is Tam?

Use Tam to copy, compress, combine, compile and hash static files for packages with dependencies, providing a resource list for each package.

Tam is still evolving. (Always 100% coverage!)

## Install

```sh
npm i --save-dev tam
```

## Usage

### Sample Assets

```javascript
// assets.js
// We use js here only to comment.
module.exports = {
  'src': 'resources/assets',  // Required.
  'dist': 'public/static',    // Required. All output files will be generated here.
  'www': 'public',            // Required. It MUST be under dist.
  'option': {                 // Optional. The global option.
    'mode': ['copy', 1],      // Optional. Set to mode `copy` with priority 1. It is default.
    'hash': [0, 0]            // Optional. Hash output files with 0-length hash. (i.e., do not hash.) It is default.

    // Other option you may find useful:
    // 'mode': ['compress', 2]
    // 'mode': ['copy', 100]
    // 'hash': [8, 1]
  },
  'packages': {   // Required. Below are sample packages.
    'angular': {
      'src': '../../node_modules/angular',  // Optional. Will be set to the package's name if left blank.
      'dist': '.',                          // Optional. Will be set to the package's name if left blank.
      'option': { // Optional.
        'mode': ['compress', 2],
        'compress': { // Pass arguments to the compressor. Tam uses UglifyJS for default.
          'warnings': false
        }
      },
      'files': ['angular.js'] // Required. MUST be a array.
    },
    'core': {
      'dependencies': ['angular'],  // Optional.
      'files': ['angular-app.js']
    },
    'page/welcome': {
      'dependencies': ['core'],
      'files': ['app.js']
    }
  }
}
```

If mode set to `compress`, a package named `some-pkg` with many js and css files will be compressed to only two files, `some-pkg.js` and `some-pkg.css`.

SCSS files are always compiled. The output style (expanded or compressed) depends on the mode (copy or compress). It will not be compressed into `some-pkg.js`.

Wildcard is allowed for files, `**/*.js` for example.

If hash set to a positive integer, all js and css will be renamed appended with their hashes (cut to the length set).

### With Gulp

```javascript
// gulpfile.js
var gulp = require('gulp');
var fs = require('fs');
var tam = require('tam');

gulp.task('build', function () {
  var assets = require('./assets');

  // Custom Tam if you want. See `lib/worker.js` for details.
  // Tam.worker.tools.compressors.js = WhateverJSCompressorYouWant;
  // Tam.worker.tools.compilers.scss = WhateverSCSSCompilerYouWant;

  // One-line version, output `linked.json` only.
  fs.writeFileSync('linked.json', JSON.stringify(tam.link(tam.build(tam.prepare(assets)), assets.www)));

  /* Output `report` if you want to know what Tam is doing exactly.
  var report = tam.build(tam.prepare(assets));
  var linked = tam.link(report, assets.www);
  fs.writeFileSync('linked.json', JSON.stringify(linked));
  */

});
```

### Then what?

In the Gulp sample, after `gulp build`, all js and css any package needs can be found in `linked.json`.

If you use Laravel's Blade, you can write some helper functions (called `LoadCSS` and `LoadJS` maybe) in `AppServiceProvider` to generate proper link and script tags, given a package's name, then simply write `@LoadCSS('page/welcome')` and `@LoadJS('page/welcome')` in `welcome.blade.php`.

## Contribution

Feel free to open issues or send pull requests!

