import { add, sub } from "./utils";

class Utils {
  constructor() {
    console.log("init utils");
  }

  add(a, b) {
    return add(a, b);
  }

  sub(a, b) {
    return sub(a, b);
  }
}

export default Utils;
