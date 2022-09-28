"use strict";
const path = require("path");
const args = require("minimist")(process.argv.slice(2));
// console.log(args);

// 设置环境变量
let env = args.env || "dev";

function buildConfig(targetEnv) {
  const config = require(path.join(__dirname, "scripts/" + targetEnv));
  return config;
}

module.exports = buildConfig(env);
