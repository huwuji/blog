/**
 * 针对打出来的lib/bundle.js包的测试
 * 目前是没有提供按需加载的功能
 */
const Utils = require("../lib/bundle.js");

describe("Utils instance", () => {
  const utilsObj = new Utils();

  test("integer add 1+2=3", () => {
    const result = utilsObj.add(1, 2);
    expect(result).toEqual(3);
  });

  test("float add 0.1+0.2=0.3", () => {
    const result = utilsObj.add(0.1, 0.2);
    expect(result).toEqual(0.3);
  });

  test("integer sub 1+2=3", () => {
    const result = utilsObj.sub(3, 2);
    expect(result).toEqual(1);
  });
});
