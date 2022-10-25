#### react-redux-generator

从 0 开始搭建一个 react 应用架构

- react v18 用户界面
- redux 数据管理-- react-redux 库+redux-saga 中间件
- router 前端路由 -- react-router v6
- webpack v5 构建，打包器
- pnpm 包管理器

### 目录结构

- src
  - index.js 入口文件
  - containers 每个页面入口
  - components 组件
  - index.html
- mock
- scripts

### 步骤

1. 安装搭建基础 react

```
    pnpm add react react-dom -D
```

构建对应目录，搭建基础的 react 入口
部分代码
/src/index.js

```
import { createRoot } from "react-dom/client";

import Home from "./containers/home";

const root = createRoot(document.getElementById("container"));
root.render(<Home />);

```

准备好后，我们需要测试我们的代码逻辑。这是，需要安装配置 webpack，将我们目前的应用打包，构建起来；

2. 安装配置 webpack

```
pnpm add webpack webpack-cli -D
```

配置 webpack.config.js ，构建打包指令

```
scripts": {
    "dev": "webpack --env=dev"
  }
```

dev 配置查看 scripts/dev.js

配置需要考虑

- 对 html 文件的创建 html-webpack-plugin
- 对 js 语法的兼容处理 babel

  ```
  pnpm add @babel/core @babel/preset-env @babel/preset-react   babel-loader @babel/plugin-transform-runtime
  @babel/plugin-transform-react-jsx
  -D
  ```

注意：
目前的配置下，如果 jsx 语法模块没有主动引用 react 如

```
import React from 'react';
```

打开 html 页面时引用报错--React 没有被定义

可以在.babelrc 中，

```
presets: ["@babel/preset-react", { runtime: "automatic" }]

```

也可以在 webpack.config.js 对 js ｜ jsx 处理的 loader 中

```

{
test: /\.(js|jsx)$/,
use: {
loader: "babel-loader",
options: {
presets: ["@babel/preset-react", { runtime: "automatic" }],
plugins: ["@babel/transform-runtime"],
},
},
include: [path.join(__dirname, "../src")],
},

```

---

到目前为止，我们搭建了一个及其简单的 react 应用；

3. 启动本地服务---
   配置 devServer 利用 webpack-dev-server 启动
   如 scripts/dev.js 中 devServer 的配置

   补充对 webpack 的 devServer 涉及 mock 的配置

4. 完善对 css ，图片等格式的打包处理；
   到目前为止我们对 js 的模块代码处理了。但是还有关于 css，图片，json 资源等的处理；
   接下来我们继续完善我们的文件打包部分；

- 添加 对 css 文件的处理。包括对预处理器处理

  ```
  pnpm add less less-loader css-loader style-loader -D

  ```

  利用 mini-css-extract-plugin 将第三方的 css 直接打出文件
  具体配置参见 scripts/dev.js 中 module rules 对 lesshe css 的 loader 配置

- 添加图片
  url-loader

- 视频，音频资源
  file-loader

5. 配置路由
   这里我们选择 react-router v6
   React Router 的三个主要功能：

   - 订阅和操作 history stack
   - 匹配 URL routes
   - 根据路由的匹配 route matches 来构建用户界面

6. 创建 dataService
   基于对 axios 或 fetch 的封装实现：

   - 拦截请求并设置请求头
   - 拦截响应并对响应信息处理
   - 常见错误信息处理

   参见

   - /src/commons/dataService_axios.js
   - /src/commons/dataService.js

7. 接入 redux，通过@reduxjs/toolkit
   参见

- /src/containers/home/redux.js 配置各页面的数据
- /src/store.js 收集统一处理
- index.js 利用 react-redux 的 Provider 方法注入 store 到 react 中

8. 配置 lazyCompilation---进一步提升开发体验

- 配置 webpack.config.js
  ```
   experiments: {
  // 开启懒编译--及访问时编译，提升启动速度，特别是第一次启动速度
  lazyCompilation: true,
  },
  ```
- routers.js 中路由引入时使用 React.lazy 来加载，同时使用 Suspense 包裹渲染;如下

  ```
  // import Intro from "./containers/intro/index.js";
  const IntroPage = lazy(() => import("./containers/intro/index.js"));
  // import NoPage from "./containers/404";
  const NoPage = lazy(() => import("./containers/404"));

  ---
  {/* <Route path="intro" element={<Intro />} /> */}
    <Route
      path="intro"
      element={
        <Suspense fallback="loading...">
          <Intro />
        </Suspense>
      }
    />

  ```

  验证的话：
  可以查看 DevTool 界面，Network 在点击的时候会重新发起资源拉取请求