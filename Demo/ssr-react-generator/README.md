## 从 0 开始搭建一个基础的基于 react 的 SSR 应用

### 一. 什么是服务端渲染（SSR）?

不用于客户端渲染（CSR），服务端渲染及在服务器端优先进行渲染出 html，再发送到客户端，客户端直接渲染，同时再进行同构渲染；

优点：
更利于 SEO；及 html 资源是一个内容比较完整的；
更快的首页加载：较比与 CSR 的首页加载，整个加载渲染链路更短；

缺点：
需要额外的服务端资源开销；
局部渲染不好实现（所以 SSR 一般都会涉及同构）；
（较 CSR 来说 ttfb 更靠后一点，同时 tti 也会延长）

建议：
我们要了解 SSR 的实现，但要不是使用 SSR 需要考虑；
此外，针对 SSR+同构+CSR 的方式，我们还可以尝试 SSG+同构+CSR 来实现，及提升了 SEO 和首页加载，又不需要服务一个后端服务（通常是 node 服务），只需要构建一个爬取静态页面的服务（及构建/爬取静态 html 页面），然后利用 nginx 部署这些 html 静态资源；
关于 CSR 怎么改造成 SSG+同构+CSR 的方式可以看个人的 ssg-test 的项目；这里就不扩展了。

### 二. 技术栈

koa + react v18 + redux + router(react-router v6) + webpack v5 + pnpm ...

### 三. 目录结构

    - build
    - dist
    - package.json

    - src
        - containers  (页面文件)
            - index.jsx
            - index.less
            - redux.js (该页面关联的redux数据)
        - server.jsx (node服务)
        - client.jsx (客户端的入口文件)
        - routers.js (路由配置文件)
        - store.js (redux 数据)
        - utils.js (工具包)

### 四. 步骤：

1. 搭建一个基础的 koa 服务
   /src/server.js

   ```
   const Koa = require("koa");
   const app = new Koa();

   app.use(async (ctx) => {
   console.log("ctx==", ctx.request, ctx.response);
   ctx.body = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>SSR React</title>
   </head>
   <body>
       <div id='root'>SSR Reac</div>
   </body>
   </html>
   `;
   });
   app.listen(3004, () => {
   console.log("3004");
   });
   ```

   node 启动脚本查看

2. 构建前端 UI--及引入前端 UI 框架 React

   ```
   pnpm add react-dom  react -S
   ```

   2.1) 搭建好前端组件后，利用 renderToString，直接在服务端渲染出来。

   ```
    const Koa = require("koa");
    const React = require("react");
    const { renderToString } = require("react-dom/server");

    import Home from "./containers/Home/index.jsx";

    const app = new Koa();

    app.use(async (ctx) => {
    console.log("ctx==", ctx.request, ctx.response);

    const content = renderToString(
        <div id="root">
        <Home />
        </div>
    );
    ctx.body = ` <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SSR React</title>
    </head>
    <body>
        ${content}
    </body>
    </html>
    `;
    });

    app.listen(3004, () => {
    console.log("3004");
    });


   ```

   但是会发现有报错，原因是这里的 jsx 没有被识别，所以这里我们还要对 server.js 进行打包；

   2.2) 构建服务端打包配置。--利用 webpack 处理服务端 js 代码文件；
   服务端入口文件如下：
   参见 webpack.server.js
   同时配置.babelrc

   之后我们的启动脚本是打包后的脚本，所以更改启动命令为

   ```
   //package.json
   {
       "scripts": {
           "start": "pnpm build-node && node ./build/server.bundle.js",
           "build-node": "webpack-cli --config webpack.server.js",
       },
   }
   ```

   2.3) 构建客户端--利用 React hydrate 实现同构渲染；-----利用 webpack 打包客户端 js 代码文件；

   客户端渲染入口文件如下：
   参见 src/client.jsx

   同时也要对该 client.jsx（客户端应用）进行打包；
   参见 webpack.client.js
   同时需要在 server 返回的 html 中加入加载 client.js 的代码
   `<script src="./index.js"></script>`

   以上处理完，关于一个简单 React 18 框架的 ssr 就实现了；
   接下来是扩展；

3. 接入 router---react-redux
   前后端 路由的改造
   特别注意 server.jsx 中对路由设置的处理，
   涉及后面数据同步；
   及
   server.js

   ```
    <StaticRouter location={ctx.request.path}>
         {/* <App /> */}
         {/* 注意id的节点要在这里面 */}
         <div id="root">
           <Routes>{renderRouters(routersConfig)}</Routes>
         </div>
       </StaticRouter>
   ```

4. 接入 redux
   store 的创建要每次请求时创建一个，避免使用单例，造成共用
   这么使用@reduxjs/toolkit,涉及它的配置
   同时涉及到怎么在服务端提前发起异步请求，并加载其数据，以及同步到客户端（注意这里同步要利用 configureStore 的 preloadedState 属性设置）

   ```
      <!-- routers.js 中新增 getInitialProps -->
    import React from "react";
    import Home from "./containers/Home/index";
    import Desc from "./containers/Desc/index";

    export default [
    {
        path: "/",
        element: <Home />,
        getInitialProps: Home.getInitialProps,

    },
    {
        path: "/desc",
        element: <Desc />,
    },
    ];

   ```

   server.jsx

   ```
   <!-- 对路由匹配及预加载请求处理 -->
     // 对数据预加载和数据同步处理
    const matchRouteConfig = matchRoutes(routersConfig, ctx.request.path);
    // console.log("-routeConfig--", matchRouteConfig);
    if (matchRouteConfig && matchRouteConfig.length) {
        // 调用异步请求，加载后更新store后，再渲染html；
        let promiseArr = [];
        matchRouteConfig.forEach(({ route }) => {
        if (route?.getInitialProps) {
            promiseArr.push(route.getInitialProps(store));
        }
        });
        await Promise.all(promiseArr);
    }

   <!-- html中插入服务端store的数据 -->
       <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
      </script>
   ```

5. css 注入服务端的改造
   解决页面的 FOUC 闪屏问题；--及样式在客户端同构后再加载，如果后续加载的样式与之前加载 html 的样式差距过大，可能会造成闪屏；
   所以解决方法是在服务端生成的 html 模版中插入 css 样式；

todo-----

6. 接入热更新

   1） 热更新的流程一般是怎样的呢？

   - 本地服务器 koa
   - 监听本地文件变化，并重新打包 watch (chokidar)
   - 通信，把服务端新的 bundle 发送到客户端 socket
   - 客户端接受 bundle 后，触发渲染

   2）参见 webpack-dev-server
   组成：

   - server 本地服务
   - webpack-dev-middleware: watch & bundle
   - webpack-hot-middleware: communication & reflash

   接下来我们先实现一个简单的热更新：
   基于 chokidar 和 socket.io

----TODO----

---

参考：

1. webpack-dev-middleware: https://webpack.js.org/guides/development/#using-webpack-dev-middleware

1. webpack-hot-middleware: https://github.com/webpack-contrib/webpack-hot-middleware

1. koa-webpack: https://github.com/shellscape/koa-webpack

1. react-hot-loader: https://github.com/gaearon/react-hot-loader
