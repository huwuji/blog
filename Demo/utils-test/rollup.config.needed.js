import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

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
  ];
};
