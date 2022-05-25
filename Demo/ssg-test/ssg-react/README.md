一. CSR 优化 SEO，切换 ssg

1. 此项目是 CSR 客户端渲染项目，为提升项目的 SEO，需要优化项目；
   1）优化为 SSR 项目：但是需要而外的服务器资源，管理和维护前端项目的渲染，需要更多的精力关注服务器抗并发能力等；
   2）SSG：及静态页面生成。基于 react，使用 react 框架提供的 hydrate 功能（基于现有 dome 节点再构建和渲染）；首次直接访问返回 html 页面，供 seo 搜索。再加载 js 代码（通过 hydrate 渲染），提供更丰富的前端交互功能。
   3）nginx 利用 UA 识别爬虫 or 正常用户

   这里我们使用方式二。

2. 具体改造方式：

   1. 上面说到我们做静态化改造，需要两部分。
      一个是页面 html 内容，这个可以通过另起服务，从目标服务上爬取配置的页面内容，使用 pupeteer;

   二则是需要使用 hydrate 方式渲染的脚本。这里我们通过设置全局变量\_useSsg 来判断，如果\_useSsg===true，则启动 hydrate 渲染。

   3. 部署：
      这里需要注意对于单页面应用的部署:
      这里我们使用 docker 部署，
      这里执行 run.sh 脚本部署：(打包镜像，创建和启动容器)；

      ```
      <!-- 利用Dockerfile生成镜像 -->
       docker build -t test-image .
       <!-- 查找容器 -->
       docker images /docker image ls
      <!-- 运行容器 -->
      docker run -p [宿主机端口]:[容器端口] --name test-image test-container
      ```

      这个时候访问页面的子路后刷新当前页会出现 404，原因是并没有在静态文件中找到这个文件。所以单页面部署需要将所有的页面请求都返回 index.html，浏览器下载了 index.html 后 js 会自动解析并导航到对应页面。
      需要在 nginx 配置 404 到首页:
      或者利用 try_files

      ```
        location / {
           root /usr/share/nginx/html; # 解决单页应用服务端路由的问题
           try_files ssg_routers/$uri.html $uri $uri/ index.html index.htm;
      }
      ```

   nginx 配置参见（/ssg-react/default.conf）

   ```
   控制台进入容器
      docker exec -it [容器 id] /bin/sh

          exit 退出

   替换容器的 nginx 的 default.conf
   dockcer cp default.conf [容器 id|name]:/etc/nginx/conf.d/default.conf

   ```

   同时配置 nginx 的默认先访问 app.html（及我们的改造页面）

   ```
   location / {
      root /usr/share/nginx/html;
      # 解决单页应用服务端路由的问题
      try_files ssg_routers/$uri.html $uri $uri/ index.html index.htm;
      # 需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
      expires -1;
   }

   ```

3. 使用 shell 脚本部署
   ./run.sh

4. 使用 docker-compose 构建及部署
   构建 docker-compose.yaml 配置文件，使用 docker-compose up 命令替代以前关于构建及运行容器的所有命令。

> up: 创建并启动容器
> $ docker-compose up
> --build: 每次启动容器前构建镜像
> $ docker-compose up --build

---

其他补充

1. docker build --progress plain
   在使用 docker build 进行构建时，通过 RUN 指令可以通过打印一些关键信息进行调试，可以通过 --progress plain 来查看其输出结果,输出 echo 信息

1. 加入了检测站点指标的脚本

   ```
   const reportWebVitals = onPerfEntry => {

   if (onPerfEntry && onPerfEntry instanceof Function) {
       import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
       getCLS(onPerfEntry);
       getFID(onPerfEntry);
       getFCP(onPerfEntry);
       getLCP(onPerfEntry);
       getTTFB(onPerfEntry);
       });
   }
   };

   export default reportWebVitals;
   ```

---

## 怎么做单元测试

1. 测试框架选择？
   Jest:
   是一个简易的，安全的，全面的 JavaScript 测试框架

2. 安装和使用
   参考官网：<https://jestjs.io/docs/getting-started>
   yarn add --dev jest
   <!-- 生成配置项 -->

   npx jest --init

   <!-- jest 测试时，使用es模式等,jest默认是只支持common.js规范的语法 -->

   yarn add --dev babel-jest @babel/core @babel/preset-env

   ```
   <!-- babel.config.js -->
   module.exports = {
       presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
   };
   ```

3. 匹配器及使用
   <https://jestjs.io/docs/using-matcher>

   toBe
   toEqual

   toBeNull
   toBeUndefined
   toBeDefined
   toBeTruthy
   toBeFalsy

4. 测试异步代码：
   常见情况比较简单，参考： <https://jestjs.io/docs/asynchronous>
   考虑异步的情况，根据异步函数可以考虑使用 return，async-await,cb 回调，以及通过 resolve/reject 转变成 promise，再进行断言。

5. 钩子函数及其作用域
   beforeAll(cb):只执行一次，在测试用例开始前
   afterAll(cb):只执行一次，在测试用例开始后
   beforeEach(cb):可以执行多次，在每个执行测试用例前调用
   afterEach(cb):可以执行多次，在每个执行测试用例后调用

   作用域规则： 1)钩子函数在父级分组可作用子集，类似继承 2)钩子函数同级别分组作用域互不干涉，各自分组内起作用 3)先执行外部的钩子函数，再执行内部的钩子函数

6. 测试用例分组
   利用 describe 包裹来分组；

7. 给 React 应用写单元测试
   使用@testing-library/react 来做 react 模块的单元测试

   ```
   import { render, screen } from '@testing-library/react';

   import App from '../src/App';

   test('renders learn react link', () => {
   render(<App />);
   const linkElement = screen.getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
   });
   ```
