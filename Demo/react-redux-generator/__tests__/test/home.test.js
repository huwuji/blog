/**
 * 组件测试
 */
import { renderHook, render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Home from "../../src/containers/home/index.js";
import { add } from "../../src/utils";

describe("Comp test", () => {
  afterEach(cleanup);

  it("fn test", () => {
    expect(add(1, 2)).toBe(3);
  });
  // 测试初始快照
  it("测试初始快照", async () => {
    // const { result } = renderHook(() => <Home />);
    // console.log("result==", result.current.props);
    // expect(screen.getByText("my home page")).toBeVisible();
  });
});
