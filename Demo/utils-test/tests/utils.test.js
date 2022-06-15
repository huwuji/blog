import { add, sub } from "../utils";

describe("math methods", () => {
  test("integer add 1+2=3", () => {
    const result = add(1, 2);
    expect(result).toEqual(3);
  });

  test("float add 0.1+0.2=0.3", () => {
    const result = add(0.1, 0.2);
    expect(result).toEqual(0.3);
  });

  test("integer sub 1+2=3", () => {
    const result = sub(3, 2);
    expect(result).toEqual(1);
  });
});
