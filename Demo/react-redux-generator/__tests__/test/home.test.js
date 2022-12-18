/**
 * 组件测试
 */
import { createRoot } from "react-dom/client";
import React from "react";
import {
  renderHook,
  render,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import getStore from "../../src/store";
import Layout from "../../src/containers/layout";
import Home from "../../src/containers/home/index.js";
import { add } from "../../src/utils";

import UseTestHook from "../../src/components/hooks/useTestHook";

const HomeComp = () => (
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
describe("Comp test", () => {
  afterEach(cleanup);

  // 方法测试
  it("fn test", () => {
    expect(add(1, 2)).toBe(3);
  });

  // 组件测试
  it("组件测试", async () => {
    const { asFragment, getByText } = render(<HomeComp />);
    expect(getByText("my home page")).toBeInTheDocument;
  });

  // 测试btnClick事件
  it("测试btnClick事件", async () => {
    const { asFragment, getByText } = render(<HomeComp />);
    fireEvent.click(getByText(/set/));
    // console.log("snapshot==", asFragment());
    expect(getByText("this is home page!")).toBeInTheDocument;
  });

  // 生成快照，比较事件按钮触发后快照有区别
  it("生成快照，比较事件按钮触发后快照有区别", async () => {
    const { asFragment, getByText } = render(<HomeComp />);
    const firstRender = asFragment();
    fireEvent.click(getByText("fetch"));
    expect(firstRender).toMatchInlineSnapshot(asFragment(), `{}`);
  });

  // 测试hooks
  it("测试hooks", async () => {
    const { result, rerender } = renderHook(UseTestHook);
    // console.log("result==", result.current);
    expect(result.current.result).toBe(1);
    act(() => {
      result.current.setResult(3);
    });
    rerender();
    expect(result.current.result).toBe(3);
  });
});
