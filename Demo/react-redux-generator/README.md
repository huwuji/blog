#### react-redux-generator

从 0 开始搭建一个 react 应用架构

- react v18 用户界面
- redux 数据管理-- @reduxjs/toolkit
- router 前端路由 -- react-router v6
- webpack v5 构建，开发环境构建速度优化，开启懒编译，配置打包构建插件等。（详情看/scripts/dev.js,/scripts/prod.js）
- pnpm 包管理器
- 封装数据请求 fetch/axios
- 单元测试
- Ts ---TODO
- 监控 ---TODO

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

9. 单元测试

- 单元测试的框架选择---Jest+React Testing Library

  Jest: 相信大家都有所了解。

  > Jest 是一款优雅、简洁的 JavaScript 测试框架。Jest 支持 Babel、TypeScript、Node、React、Angular、Vue 等诸多框架！
  >
  > - 无需测试；
  > - 并行隔离测试；
  > - 实时快照追踪；
  > - 文档齐全；

  Enzyme：原本是想选择这个 React 测试库的，Enzyme 提供一种测试 React 组件内部的能力。但是考虑到当前项目是 React18，然后了解了一番后， 可以了解下这篇小文，[Enzyme is dead. Now what?](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl),
  决定使用[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/);

  [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

  > React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.
  > The React Testing Library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practices. Its primary guiding principle is:
  > The more your tests resemble the way your software is used, the more confidence they can give you.
  > React Testing Library 是一个 DOM 测试库，它不能直接处理 React 组件实例，而是站在应用的角度去测试，测试产物及 Dom；

  React Testing Library 具体给用户提供哪些能力及可调用的 API？
  具体参看：https://testing-library.com/docs/react-testing-library/api#renderhook-result

  同时我们也参考 React 提供的测试：https://reactjs.org/docs/testing-recipes.html

  主要关注：

  - render:
    渲染组件，
    - asFragment： 执行生成当前组件快照；
  - renderHook：
    渲染 hooks 函数
    返回 - result：当前执行的结果。 - rerender：再次执行渲染

  - cleanup
    卸载使用 render 挂载的 React 树。也是防止内存泄露

  - act
    在编写 UI 测试时，可以将渲染、用户事件或数据获取等任务视为与用户界面交互的“单元”。react-dom/test-utils 提供了一个名为 act() 的 helper，它确保在进行任何断言之前，与这些“单元”相关的所有更新都已处理并应用于 DOM：

  ```
  act(() => {
    // 渲染组件
  });
  // 进行断言
  ```

  - fireEvent
    触发事件

  - waitForElement
    等待异步操作

    ```
    import {
    render,
    cleanup,
    fireEvent,
    waitForElement,
    } from "@testing-library/react";

    // 每个测试单元后卸载Dom，清理内存。
    afterEach(cleanup);

    it("waitForElement test", async () => {
    const { getByTestId, getByText } = render(<TestAsync />);

        fireEvent.click(getByTestId("button-add"));

        const counter = await waitForElement(() => getByText("1"));

        expect(counter).toHaveTextContent("1");
        });

    ```

    测试用例 Demo 路径如下：
    **[__tests__/test/home.test.js]**
    包含方法，React 组件和 hooks 的测试栗子：

  总结下，对于具体的测试方法，可以在编写测试用例的过程中，站在用户的行为角度，遍写边翻阅以上提到的文档，自然的就会不断熟悉。

9. Jest 测试配置
   这里参考 create-react-app，我们通过 create-react-app 创建项目后，直接 eject 出来，查看具体的配置，供我们参考。
   create-react-app 的 jest 配置在 package.json 中的 jest 属性;

   配置需要注意：

   - 对于 less 的解析
     安装：jest-css-modules
     配置
     ```
     moduleNameMapper: {
     "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
     },
     ```
   - 静态资源引用
     配置别名
     ```
     moduleNameMapper: {
       "^@(.*)$": "<rootDir>/src/$1",
     },
     rootDir: path.join(__dirname),
     ```
     同时也可以根据 testMatch 属性来更精确的筛选

10. 测试问题汇总：

- 问题一：关于引用 Redux 的测试问题：

  > 问题：could not find react-redux context value; please ensure the component is wrapped in a <Provider>

  > 参考：https://redux.js.org/usage/writing-tests#components

  这里就需要配置引入 react-redux

- 问题二： 关于引入 Router
  > useHref() may be used only in the context of a <Router> component.

对于问题一二应用后代码如下：

```
import React from "react";
import {  render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import getStore from "../../src/store";
import Layout from "../../src/containers/layout";
import Home from "../../src/containers/home/index.js";

it("测试初始快照", async () => {
    const { asFragment, getByText } = render(
      <Provider store={getStore()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    console.log("result==", asFragment());
    expect(getByText("my home page")).toBeInTheDocument;
```
