/**
 * 提供动态加载的打包方式
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
// import _ from "lodash";
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// const lib = require('./package.json');
// const outputFileName = 'add';

const buildConfig = config => {
  const build = ({ minified }) => ({
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? 'min.js' : 'js'}`,
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      minified && terser(),
      ...(config.plugins || []),
    ],
    external: ['lodash', 'decimal.js'],
  });

  return [build({ minified: false }), build({ minified: true })];
};

const targetFile = 'src/components';

// 读文件，生成包含文件名列表
const readFilesNames = () => {
  return new Promise((_resolve, reject) => {
    const thePath = path.resolve(targetFile);
    fs.readdir(thePath, (err, file) => {
      if (!err) {
        _resolve(file);
      } else {
        reject(err);
      }
    });
  })
    .then(value => {
      return value;
    })
    .catch(e => {
      console.log('readFilesNames-error=', e);
    });
};

export default async () => {
  const list = await readFilesNames();
  let configList = [];
  _.forEach(list, v => {
    configList = [
      ...configList,
      ...buildConfig({
        input: path.resolve(targetFile, v),
        output: {
          file: `lib/${path.basename(v, '.js')}`,
          name: `${path.basename(v, '.js')}`,
          format: 'umd',
          exports: 'named',
        },
      }),
    ];
  });
  console.log('configList-0000=', configList);

  return configList;
};
