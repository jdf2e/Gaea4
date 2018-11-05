#!/usr/bin/env node
const package = require('../package.json');
const program = require('commander');


program.version(package.version,'-V,--version')
       .command('init <name>','创建项目')
       .parse(process.argv)
       