const Koa = require("koa");
const React = require("react");
const { renderToString } = require("react-dom/server");
import koaStatic from "koa-static";
import { StaticRouter } from "react-router-dom/server";
import { Routes, matchRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";

import routersConfig from "./routers";
import { renderRouters } from "./utils";
import getStore from "./store";

const app = new Koa();

app.use(koaStatic("dist"));

app.use(async (ctx) => {
  console.log("-path--", ctx.request.path);
  const store = getStore();
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

  // css 同构
  const css = new Set();
  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()));

  let html = renderToString(
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={ctx.request.path}>
          {/* <App /> */}
          {/* 注意id的节点要在这里面 */}
          <div id="root">
            <Routes>{renderRouters(routersConfig)}</Routes>
          </div>
        </StaticRouter>
      </StyleContext.Provider>
    </Provider>
  );
  // ctx.body = html;
  ctx.body = `   
  <html>
    <head>
      <title>Server Rendered App</title>
      <style>${[...css].join("")}</style>
    </head>
    <body>
      ${html}
      <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
      </script>
      <script src="./index.js"></script>
    </body>
  </html>
  `;
});
app.listen(3004, () => {
  console.log("listen:3004");
});
