import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const lib = require("./package.json");
const outputFileName = "bundle";
const name = "utils-api";
const input = lib.main;

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
  });

  return [build({ minified: false }), build({ minified: true })];
};

export default async () => {
  return [
    ...buildConfig({
      output: {
        file: `lib/${outputFileName}`,
        name,
        format: "umd",
        exports: "default",
      },
    }),

    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: "esm",
        preferConst: true,
        exports: "named",
      },
    }),
  ];
};
