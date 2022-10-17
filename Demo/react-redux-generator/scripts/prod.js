/**
 * 打包，涉及一些对构建过程的分析，也可以并入开发流程分析
 */
const path = require("path");
const os = require("os");
// const chalk = require("chalk");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 打包进度条
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// 编译速度分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 打包体积分析
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// todo： thread-loader 用于处理一些耗时的loader。使用时，需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
// 关于thread-loader更过使用，参见webpack文档
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const cpus = os.cpus().length;
console.log("cpus=", cpus);
const cpusUsed = cpus > 4 ? 4 : cpus - 1;

const resolveApp = (file) => {
  console.log("path=", file + path.resolve(process.cwd(), file));
  return path.resolve(process.cwd(), file);
};

const config = {
  // 入口
  entry: {
    index: "./src/index.js",
  },
  // 输出
  output: {
    // 区分版本和变动，目的是清缓存
    filename: "[name].[contenthash].bundle.js",
    // bundle 文件路径
    path: resolveApp("dist"),
    // 编译前清除目录
    clean: true,
  },
  mode: "production",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "../src/assets/"),
      "@containers": path.resolve(__dirname, "../src/containers/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@commons": path.resolve(__dirname, "../src/commons/"),
      "@URL": path.resolve(__dirname, "../src/constant/URL.js"),
      "@src": path.resolve(__dirname, "../src/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [resolveApp("src")],
        type: "asset/resource",
      },
      {
        test: /\.less$/i,
        include: resolveApp("src"),
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: "css-loader",
            options: {
              // Enable CSS Modules features
              modules: true,
              importLoaders: 2,
            },
          },
          // 将 PostCSS 编译成 CSS
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        // 第三方的css直接打出文件
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
        include: [path.join(__dirname, "../node_modules")],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: resolveApp("src"),
        use: [
          // 加载 ES2015+ 代码并使用 esbuild 转译到 ES6+
          //   {
          //     loader: "esbuild-loader",
          //     options: {
          //       loader: "tsx",
          //       target: "es2015",
          //     },
          //   },
          //   使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
          {
            loader: "babel-loader",
            // babelrc已经设置了
            // options: {
            //   presets: ["@babel/preset-react", { runtime: "automatic" }],
            //   plugins: ["@babel/transform-runtime"],
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin(),
    // 进度条
    new ProgressBarPlugin({
      //   format: `  :msg [:bar] ${chalk.green(":percent")} (:elapsed s)`,
      format: `  :msg [:bar] (:percent) (:elapsed s)`,
    }),
    // 打包体积分析
    new BundleAnalyzerPlugin(),
    // IgnorePlugin 在构建模块时直接剔除那些需要被排除的模块，如moment的国际化；(node_modules/moment/locale/*.js)
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  devtool: "eval-cheap-module-source-map",
  externals: {
    lodash: {
      commonjs: "lodash",
      amd: "lodash",
      root: "_", // 指向全局变量
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: cpusUsed,
      }),
      new CssMinimizerPlugin({
        parallel: cpusUsed,
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          reuseExistingChunk: true,
        },
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
      },
    },
  },
};

module.exports = smp.wrap(config);
