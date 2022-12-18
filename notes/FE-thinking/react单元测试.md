## 单元测试

1. 单元测试的框架选择---Jest+React Testing Library

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

2. Jest 测试配置
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
     同时也可以根据 testMatch 属性来更精确的筛选;

   **jest.config.js 的配置文件如下**

   ```
   const path = require("path");
   module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
    ],
   moduleNameMapper: {
         "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    },
    rootDir: path.join(__dirname),
    roots: ["<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/"],
    testRegex: [],
   }
   ```

3. 测试问题汇总：

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

**工程地址源码参见：** https://github.com/huwuji/blog/tree/master/Demo/react-redux-generator
