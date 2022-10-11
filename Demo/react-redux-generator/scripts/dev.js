const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const defaultPublicPath = "/";
const defaultPort = "8080";

//  代理
let proxy = {
  "/api/*": {
    target: "http://192.168.0.1:8888", // 开发环境
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
      console.info(`测试请求地址：${proxy["/api/*"].target}${req.originalUrl}`);
    },
  },
  // todo 如下配置需要再启动mock服务,
  // "/mock/api/*": {
  //   target: `http://127.0.0.1:${defaultPort}`, //指向mock环境
  //   pathRewrite(paths, req) {
  //     console.info(`本地请求地址：${req.originalUrl}`);
  //     return `${paths.replace(/^\/api/, "/")}.json`;
  //   },
  //   changeOrigin: true,
  //   onProxyReq(proxyReq, req, res) {
  //     proxyReq.method = "GET";
  //     proxyReq.setHeader("Access-Control-Allow-Origin", true);
  //   },
  // },
};

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
    filename: "[name]_[contenthash].js",
    // publicPath: "./", // 大多是当前路径下
    publicPath: defaultPublicPath, //'https://cdn.example.com/'
    clean: true, // 替代以前的CleanWebpackPlugin
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              import: true,
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        include: [path.join(__dirname, "../src")],
      },
      {
        test: /\.less$/,
        // 第三方的css直接打出文件
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        include: [path.join(__dirname, "../node_modules")],
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(mp4|ogg)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify("develop"),
      __DEV__: true,
    }),
  ],
  devServer: {
    // server: 'http',// 允许设置服务器和配置项（默认为 'http'）
    // https: true,// 使用的话，需要自己提供证书
    // watchFiles,//该配置项允许你配置 globs/directories/files 来监听文件变化
    // static: path.join(process.cwd(), "public"),
    // static 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用
    static: {
      directory: path.join(__dirname, "dist"),
      watch: false, //通过 static.directory 配置项告诉 dev-server 监听文件。默认启用，文件更改将触发整个页面重新加载。可以通过将 watch 设置为 false 禁用。
      publicPath: "/", //默认‘/’， 告诉服务器在哪个 URL 上提供 告诉服务器在哪个 URL 上提供 static 或static.directory 的内容
    },
    historyApiFallback: true, // 单页应用，使用 HTML5 History API 时，提供 index.html 页面来代替任何 404 响应
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/views/landing.html' },
    //     { from: /^\/subpage/, to: '/views/subpage.html' },
    //     { from: /./, to: '/views/404.html' },
    //   ],
    // },
    // host: "0.0.0.0",
    hot: true, //启用 webpack 的 热模块替换 特性
    open: true,
    port: defaultPort, //指定监听请求的端口号
    proxy: proxy, // 配置代理
    compress: false,
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      // todo mock-- 后面改成从mock文件夹中匹配json文件
      devServer.app.get("/mock/api/*", function (req, res) {
        res.json({ id: 1, username: "name", sex: 6 });
      });
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "../src/assets/"),
      "@containers": path.resolve(__dirname, "../src/containers/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@commons": path.resolve(__dirname, "../src/commons/"),
      "@URL": path.resolve(__dirname, "../src/constant/URL.js"),
      "@src": path.resolve(__dirname, "../src/"),
    },
  },
};
