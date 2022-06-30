/**
 * 打包工具库，打包 umd和esm两种形式，不打包依赖；
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

const { visualizer } = require('rollup-plugin-visualizer');

const lib = require('./package.json');

const outputFileName = 'index';
const name = 'utils-api';
const input = 'src/index.js';

const buildConfig = config => {
  console.log('process.env.NODE_ENV=', process.env.NODE_ENV);
  const build = ({ minified }) => ({
    input,
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
  });

  return [build({ minified: false }), build({ minified: true })];
};

export default async () => {
  return [
    ...buildConfig({
      output: {
        file: `lib/${outputFileName}`,
        name,
        format: 'umd',
        exports: 'default',
      },
      external: ['lodash', 'decimal.js'],
    }),

    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
      },
      plugins: [
        process.env.ANALYSE &&
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
      ],
      external: ['lodash', 'decimal.js'],
    }),
  ];
};
