const path = require("path");
// const resolve = (dir) => path.resolve(__dirname, "./src", dir);
module.exports = {
  mode: "development",
  entry: "./src/client.jsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
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
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
