工具包：

提供按需加载能力和 cli 调用；使用 npm link 和 npm link <'工具包'>来调试或验证；

> yarn link 可能会遇到问题 <https://github.com/yarnpkg/yarn/issues/1297>

---todo---

- [x] 输出 npm 工具包,提供 umd 和 esm 模块标准文件； rollup.config.js

- [x] 当方法多了后，我们需要提供给使用方来按需加载提供的方法; (打包每个方法组件为单独的文件；) rollup.config.import.js

- [x] 对 todo-2 提供自动化的打包：自动把 components 下文件单独打包

- [x] 配置 lint 参照：<https://prettier.io/docs/en/install.html>

- [x] 提供支持按需打包的 babel ：my-babel-plugin-import.js（或仿照 babel-plugin-import 造一个轮子）

- [x] 配置 rollup 打包工程：自定义提取包方式（配置 manualChunks） rollup.config.project.js

- [x] 提供 cli 调用

- [ ] 发布
