#!/usr/bin/env node

const { program } = require('commander');
// eslint-disable-next-line import/extensions
const utiler = require('../lib/index');

const pkg = require('../package.json');

// eslint-disable-next-line prettier/prettier
program
  .name('@wuji/utils_apis')
  .description('CLI to some JavaScript math utilities')
  .option('-use  <use>', 'utils name')
  .option('-a <a>', 'first value')
  .option('-b <b>', 'last value')
  .action(option => {
    const { Use, a, b } = option;
    if (Use && a && b) {
      console.log(`${a} ${Use} ${b} is`, utiler[`${Use}`](a, b));
    } else {
      console.log('please input -use "add/sub" -a "num" -b "num" ');
    }
  });

program
  .command('add')
  .description('Math add')
  .argument('<a>', 'first args')
  .argument('<b>', 'secord args')
  .action((a, b) => {
    if (a && b) {
      console.log(`${a} add ${b} is`, utiler.add(a, b));
    } else {
      console.log('please input a b');
    }
  });

program
  .command('sub')
  .description('Math sub')
  .argument('<a>', 'first args')
  .argument('<b>', 'secord args')
  .action((a, b) => {
    if (a && b) {
      console.log(`${a} sub ${b} is`, utiler.sub(a, b));
    } else {
      console.log('please input a b ');
    }
  });

program.version(pkg.version);
// program.version(pkg.version, '-v ,-V, --vers,--version', 'output the current version');

program.parse(process.argv);
