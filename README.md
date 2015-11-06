# Tam

[![npm-version][npm-badge]][npm-url]
[![build status][build-badge]][build-url]
[![coverage][coverage-badge]][coverage-url]

[npm-badge]: https://img.shields.io/npm/v/tam.svg
[npm-url]: https://www.npmjs.com/package/tam
[build-badge]: https://api.travis-ci.org/arrowrowe/tam.svg
[build-url]: https://travis-ci.org/arrowrowe/tam
[coverage-badge]: http://codecov.io/github/arrowrowe/tam/coverage.svg?branch=master
[coverage-graph]: http://codecov.io/github/arrowrowe/tam/branch.svg?branch=master
[coverage-url]: http://codecov.io/github/arrowrowe/tam?branch=master

> **T**am is the **A**ssets **M**anager for you. ~~(Tam is a tame lamb!~~

<!-- *** -->

![Tam is a tame lamb!](tam.png)

## What is Tam?

Use Tam to copy, compress, combine, compile and hash static files for packages with dependencies, providing a resource list for each package.

## Why Tam?

Tam is yet young and thus lightweighted. You can take full control of what Tam is doing.

And you can contribute to make Tam better! ;) Tam is still evolving. (Always 100% coverage!)

[![coverage][coverage-graph]][coverage-url]

## Install

```sh
# Install as a library by
npm i --save-dev tam

# or as a command-line tool by
npm i -g tam

# It may be more convenient to clone this repository (so you can update it easily by pulling) and link it globally.
git clone https://github.com/arrowrowe/tam.git && cd tam && npm link
# thus you can use it as a command-line tool, or link it in your project directory
cd /path/to/your/project && npm link tam
```

## Demo

Tam works following a JSON file, by default named `assets.json`.

Below is a minimal case:
```javascript
{
  "packages": {
    "angular": {
      "option": {"export": false},
      "src": "node_modules/angular",
      "files": ["angular.min.js"]
    },
    "core": {
      "dependencies": ["angular"],
      "files": ["app.js", "base.css"]
    },
    /* Below are pages */
    "home": {
      "src": "page",
      "dependencies": ["core"],
      "files": ["home.*"]
    },
    "about": {
      "src": "page",
      "dependencies": ["core"],
      "files": ["about.*"]
    }
  }
}
```

Suppose we have the following files:
```
├── package.json
├── node_modules [+]
├── assets.json
├── core
│   ├── app.js
│   └── base.css
└── page
    ├── about.css
    ├── about.js
    ├── home.scss
    └── home.js
```

After running Tam by command line `tam` or programmatically `require('tam').run()`, following files will be generated:
```
...
├── linked.json
├── dist
│   ├── about
│   │   ├── about.css
│   │   └── about.js
│   ├── angular
│   │   └── angular.min.js
│   ├── core
│   │   ├── app.js
│   │   └── base.css
│   └── home
│       ├── home.css
│       └── home.js
...
```

Content of `linked.json` is the linked list of all resources:
```sh
$ jq . linked.json
{
  "about": [
    "/angular/angular.min.js",
    "/core/app.js",
    "/core/base.css",
    "/about/about.js",
    "/about/about.css"
  ],
  "home": [
    "/angular/angular.min.js",
    "/core/app.js",
    "/core/base.css",
    "/home/home.js",
    "/home/home.css"
  ],
  "core": [
    "/angular/angular.min.js",
    "/core/app.js",
    "/core/base.css"
  ]
}
```

In this demo, Tam works out the dependencies, copies static files, compiles scss to css.

With more options set, Tam can also compresses css and js and hashes them.

## Documentation

### Command-line Usage

```sh
tam                       # Build and output linked.json according to assets.json
tam whatever.json         # Same as the above except reading whatever.json
tam -a whatever.json      # Same as the above
tam -m compress,3 -s 8,3  # Same as the first except forcing assets.option.mode = ['compress', 3], assets.option.hash = [8, 3]
tam -l info               # Same as the first except setting log level to info

tam -h      # Display a command-line guide
tam -v      # Show Tam's current version
```

### Programmatical Usage

```javascript
require('tam').run({
  assets: 'whatever.json',  // Default is assets.json
  mode: ['compress', 3],    // If omitted, Tam will follow assets.option.mode
  hash: [8, 3],             // If omitted, Tam will follow assets.option.hash
  log: 'info'               // Set log level to info
});
```

### Assets, Packages and Options

- **Assets**
  - **.linked** (default `'linked.json'`): where to output the linked list.
  - **.src** (default `'.'`): base directory of source files.
  - **.dist** (default `'dist'`): base directory of dist files.
  - **.www** (default `assets.dist`): the prefix to remove before outputting to the linked list. Note: whether `assets.www` ends with `'/'` decides whether paths in the linked list begins with `'/'`.
  - **.option** (default `{mode: ['copy', 0], hash: [0, 0], export: [true, 0]}`): the global option. See also the Option part.
  - **.packages** (required): a dictionary of all packages, e.g. `{'some-package': {...}, 'another-package': {...}}`.
- **Package**
  - **.dependencies** (default `[]`): Names of the packages this package dependents on.
  - **.src** (default the package's name): directory of its source files. Based on `assets.src`.
  - **.dist** (default the package's name): directory of its dist files. Based on `assets.dist`.
  - **.files** (default `[]`): file matchers, e.g. `['base.css', '*.js', '**/*']`. Based on `package.src`.
  - **.option** (default `{mode: ['copy', -1], hash: [0, -1], export: [true, -1]}`): the local option. See also the Option part.
- **Option**
  - **.mode**: `'copy'` or `'compress'`.
  - **.hash**: integer, length of the hash adding to a file's name. If set to 0, no hashing operation will be performed.
  - **.export**: boolean, whether the package should be output to the linked list.
  - **[behavior]**: including **.compress.js**, **.compress.css** and **.compile**, see [UglifyJS](http://lisperator.net/uglifyjs/compress), [CleanCSS](https://www.npmjs.com/package/clean-css) and [Node-sass](https://www.npmjs.com/package/node-sass).
  - **.compress.js.mangle** (default `true`): mangle JavaScript variable names when compressing.
  - **.compress.js.prefix** and **.compress.js.suffix** (default `''` and `''`): add prefix and suffix to combined JavaScript files when compressing.
  - Priority: to merge global and local options, Tam supports priority mode. Instead of `option[key] = value`, use `option[key] = [value, priority]`. By default, global priority is 0 and local priority is 1. With same priority, local overrides global. Of course you can simply use the old-fashioned `option[key] = value` and let Tam decides the priority.

## Then What?

Make use of the linked list Tam presents.

For SPA developers, we recommend [TamHTML](https://github.com/arrowrowe/tam-html). A example is [arrowrowe.github.io](https://github.com/arrowrowe/arrowrowe.github.io), please look into its [gulpfile.js](https://github.com/arrowrowe/arrowrowe.github.io/blob/dev/gulpfile.js) and [assets.json](https://github.com/arrowrowe/arrowrowe.github.io/blob/dev/assets.json).

For other framework users, just get files a package needs from the linked list and output the css and js files to link and script tags. See also [#2: Bundle with frameworks](https://github.com/arrowrowe/tam/issues/2).

## License and Acknowledgements

[MIT](LICENSE) &copy; [arrowrowe](https://github.com/arrowrowe).

Dependencies:
- [CleanCSS](https://www.npmjs.com/package/clean-css), [UglifyJS](https://www.npmjs.com/package/uglify-js) and [Node-sass](https://www.npmjs.com/package/node-sass) for building.
- [fs-extra](https://www.npmjs.com/package/fs-extra), [glob](https://www.npmjs.com/package/glob) and [hash-file](https://www.npmjs.com/package/hash-file) for other file-related operations.
- [command-line-args](https://www.npmjs.com/package/command-line-args), [log4js](https://www.npmjs.com/package/log4js), [chalk](https://www.npmjs.com/package/chalk) and [strip-json-comments](https://www.npmjs.com/package/strip-json-comments) for extra features including cli, log and json that supports comments.
- [clone](https://www.npmjs.com/package/clone) for keeping configuration immutable.

Dev-dependencies:
- [ESLint](http://eslint.org/) and [JSCS](http://jscs.info/) for linting.
- [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/) and [Istanbul](https://www.npmjs.com/package/istanbul) for tests.
- [ghooks](https://www.npmjs.com/package/ghooks) for local linting and tests.

Other servies and integrations:
- [TravisCI](https://travis-ci.org/) and [Codecov](http://codecov.io/) for tests and coverage reports.
- [Shields.io](http://shields.io/) for badges.
- [Waffle.io](https://waffle.io/) for the throughput graph.

## Contribution

Feel free to open [issues](https://github.com/arrowrowe/tam/issues) or send pull requests!
See more [here](CONTRIBUTING.md).

[![Throughput Graph](https://graphs.waffle.io/arrowrowe/tam/throughput.svg)](https://waffle.io/arrowrowe/tam/metrics)
