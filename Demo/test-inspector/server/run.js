'use strict';

const testRun = require('./test');
const inspect = require('../packages/inspector/lib/inspect');

const inspector = new inspect();
try {
    testRun(inspector)
} catch (e) {
    console.log('e=', e);
}