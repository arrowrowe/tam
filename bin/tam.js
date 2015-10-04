#!/usr/bin/env node

var tam = require('../index');
var cli = require('../lib/cli/cli');
var option = cli.parse();

tam.run(option);
