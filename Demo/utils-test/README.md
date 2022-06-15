工具包：

使用 yarn link 和 yarn link <'工具包'>来调试或验证；

---todo---

- [x] 输出 npm 工具包
      index.js 文件如下

```
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
```

- [x] 当方法多了后，我们需要提供给使用方来按需加载提供的方法;
      (打包每个方法组件为单独的文件；)

- [] 对 todo-2 提供自动化的打包：自动把 components 下文件单独打包

- [] 打包支持按需打包：使用 babel-plugin-import：（或仿照 babel-plugin-import 造一个轮子）

- [] 构建一个 monorepo

- [] 发布
