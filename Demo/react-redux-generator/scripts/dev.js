const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: {
      import: "./src/index.js",
      dependOn: "react-vendors",
    },
    "react-vendors": ["react", "react-dom"],
  },
  output: {
    path: path.join(__dirname, "/../dist/"),
    filename: "[name].js",
    // publicPath: "/dist/",
    publicPath: "./",
  },
  cache: true,
  devtool: "cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-react", { runtime: "automatic" }],
          //   plugins: ["@babel/transform-runtime"],
          // },
        },
        include: [path.join(__dirname, "../src")],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
