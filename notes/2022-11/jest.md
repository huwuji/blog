#### Jest + Testing Library React

### 关于 Jest

> Jest 是一款优雅、简洁的 JavaScript 测试框架。Jest 支持 Babel、TypeScript、Node、React、Angular、Vue 等诸多框架！
>
> - 无需测试；
> - 并行隔离测试；
> - 实时快照追踪；
> - 文档齐全；

1. 匹配器及使用
   <https://jestjs.io/docs/using-matcher>

   toBe
   toEqual

   toBeNull
   toBeUndefined
   toBeDefined
   toBeTruthy
   toBeFalsy

2. 测试异步代码：
   常见情况比较简单，参考： <https://jestjs.io/docs/asynchronous>
   考虑异步的情况，根据异步函数可以考虑使用 return，async-await,cb 回调，以及通过 resolve/reject 转变成 promise，再进行断言。

3. 钩子函数及其作用域
   beforeAll(cb):只执行一次，在测试用例开始前
   afterAll(cb):只执行一次，在测试用例开始后
   beforeEach(cb):可以执行多次，在每个执行测试用例前调用
   afterEach(cb):可以执行多次，在每个执行测试用例后调用

   作用域规则： 1)钩子函数在父级分组可作用子集，类似继承 2)钩子函数同级别分组作用域互不干涉，各自分组内起作用 3)先执行外部的钩子函数，再执行内部的钩子函数

4. 测试用例分组
   利用 describe 包裹来分组；

5. 给 React 应用写单元测试
   React Testing Library

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

   总结下，对于具体的测试方法，可以在编写测试用例的过程中，站在用户的行为角度，遍写边翻阅以上提到的文档，自然的就会不断熟悉。

   > 参考
   > React Testing Library:
   https://testing-library.com/docs/react-testing-library/intro/

   > Dom Testing Library: https://testing-library.com/docs/dom-testing-library/intro/

   > React Test :https://reactjs.org/docs/testing-recipes.html
