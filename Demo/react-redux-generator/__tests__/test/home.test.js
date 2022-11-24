/**
 * 组件测试
 */
import { createRoot } from "react-dom/client";
import React from "react";
import { renderHook, render, cleanup } from "@testing-library/react";
import Home from "../../src/containers/home/index.js";
import { add } from "../../src/utils";

describe("Comp test", () => {
  afterEach(cleanup);

  it("fn test", () => {
    expect(add(1, 2)).toBe(3);
  });
  // 测试初始快照
  it("测试初始快照", async () => {
    // const { asFragment, getByText } = render(<div>999</div>);
    // console.log("result==", asFragment());
    // expect(getByText(999)).toBeInTheDocument;
    // expect(asFragment(<div>999</div>)).toMatchSnapshot();
    // const { result } = renderHook(() => <div>999</div>);
    // const rooter = createRoot(document.getElementById("root"));
    // rooter.render();
    // console.log("result==", result.current);
  });
});
