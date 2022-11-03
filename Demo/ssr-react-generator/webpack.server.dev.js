/**
 * 对服务端执行脚本的打包
 */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  // entry: './src/devServer.jsx',
  entry: {
    serverLocal: "./src/devServer.jsx",
    // socket: './socket.js',
  },
  output: {
    // filename: 'server.bundle.js',
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        // include: path.resolve(__dirname, 'src'),
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
