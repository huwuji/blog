const Koa = require("koa");
const React = require("react");
const { renderToString } = require("react-dom/server");
import koaStatic from "koa-static";
import { StaticRouter } from "react-router-dom/server";
import { Routes, matchRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
const { exec } = require("child_process");
import routersConfig from "./routers.jsx";
import { renderRouters } from "./utils";
import getStore from "./store";
const http = require("http");
import { Server } from "socket.io";

const app = new Koa();

// server io
const httpServer = http.createServer(app.callback());
const io = new Server(httpServer, {
  path: "/my-custom-path/",
});

app.use(koaStatic("dist"));

app.use(async (ctx) => {
  console.log("-path01--", ctx.request.path);
  const store = getStore();
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

  //   /**
  //    * todo 中间存储
  //    * content = read('path','rx');
  //    * http.response.html(content);
  //    */
  //   // ctx.body = html;

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
          <script type="module">
          // socket io client
          import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
            const socket = io("http://localhost:3004", {
              path: "/my-custom-path/"
            });
        
            console.log('socket client run!',socket);
            window.$socket=socket;
        
            //收到server的连接确认
            socket.on('open', () => {
              console.log('socket io is open !');
            });
        
            socket.on('change',function(){
              console.log('client change');
              // 重新加载文件
            const Spt =  document.createElement('script');
            Spt.type = "text/javascript";
            Spt.src="./index.js";
            document.body.appendChild(Spt);
            // Spt.onload=function(){
            //   document.body.removeChild(Spt);
            // };

             
            })
        
            socket.emit('change', { test: 'data' });
          </script>
    </body>
  </html>
  `;
});

io.on("connection", (socket) => {
  console.log("connection");
  // todo
  socket.emit("open");
  // io.emit('change');
  socket.on("change", function (data) {
    console.log("server change===");
  });
});

// 开启监听
const { watcher } = require("../watcher");
watcher(() => {
  console.log("watcher=");

  exec("webpack-cli --config webpack.client.js", () => {
    exec("webpack-cli --config webpack.server.js", () => {
      console.log("打包完成");
      // fork(serverFile);
      // precess.exec();
      // precess = fork(serverFile);

      // 同步数据到Client
      io.emit("change", { data: "000" });
    });
  });
})();

httpServer.listen(3004, () => {
  console.log("listen:3004");
});
