import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
// import _ from "lodash";
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const lib = require("./package.json");
const outputFileName = "add";
const name = "utils/add";
const input = "./components/add.js";

const buildConfig = (config) => {
  const build = ({ minified }) => ({
    input,
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? "min.js" : "js"}`,
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      minified && terser(),
      ...(config.plugins || []),
    ],
    external: ["lodash", "decimal.js"],
  });

  return [build({ minified: false }), build({ minified: true })];
};

const targetFile = "components";

// 读文件，生成包含文件名列表
const readFilesNames = () => {
  return new Promise((resolve, reject) => {
    const thePath = path.resolve(targetFile);
    fs.readdir(thePath, (err, file) => {
      if (!err) {
        resolve(file);
      } else {
        reject(err);
      }
    });
  })
    .then((value) => {
      return value;
    })
    .catch((e) => {
      reject("readFilesNames-error=", reject);
    });
};

export default async () => {
  const list = await readFilesNames();
  let configList = [];
  _.forEach(list, (v) => {
    configList = [
      ...configList,
      ...buildConfig({
        output: {
          file: `lib/${path.basename(v, ".js")}`,
          name,
          format: "umd",
          exports: "default",
        },
      }),
    ];
  });

  return configList;
};
