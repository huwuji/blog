/**
 * 打包工程，抽离依赖lodash，自定义提取包方式（配置manualChunks）
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';

const { visualizer } = require('rollup-plugin-visualizer');

const input = 'src/index.js';

const buildConfig = config => {
  console.log('process.env.NODE_ENV=', process.env.NODE_ENV);
  const build = ({ minified }) => ({
    input,
    ...config,
    output: {
      ...config.output,
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      minified && terser(),
      ...(config.plugins || []),
    ],
  });

  return build({ minified: false });
};

export default async () => {
  return buildConfig({
    output: {
      format: 'amd',
      preferConst: true,
      exports: 'named',
      dir: 'dist',
      entryFileNames: '[name]-[hash].js',
      manualChunks(id) {
        console.log('manualChunks-id-path==', id);
        if (id.includes('node_modules')) {
          if (id.includes('lodash')) {
            return 'lodash';
          }
          return 'vendor';
        }
      },
    },
    plugins: [
      process.env.ANALYSE &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      babel({
        // babelrc: false,
        exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
    external: ['decimal.js'],
  });
};
