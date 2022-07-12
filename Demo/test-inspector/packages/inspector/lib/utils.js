const moment = require('moment');

const log = function (text) {
  console.log(`${moment().format('HH:mm:ss')}  ${text}`);
};

module.exports = {
  log
}