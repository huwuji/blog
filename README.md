该工程目前分三部分：

1. issues 文章及整理总结
2. Demo 该目录是个人实践 demos

   - ssr-react-generator
     -- 从 0 开始搭建一个基于 koa + react v18 + redux + router(react-router v6) + webpack v5 + pnpm 的 SSR 应用框架
   - koa 服务
   - UI 层面：利用 react 的水合实现,尝试复用浏览器现有的 dom 节点，并相互关联 dom 实例和 fiber；
   - router 层面：react-router v6，实现服务端和客户端路由
   - 数据层面：
     1）接入 redux，并同步服务端 store 数据到客户端；
     2）服务端提前加载异步请求；由于服务端 react 只会之后 mount 阶段 render 及之前的生命周期，而异步请求通常在 didmount 中，不会被请求到，所以要配合路由配置，在加载匹配路由时处理服务端希望加载的异步请求；

   - css 层面：css 同构：
     利用 isomorphic-style-loader 实现 css 同构；
     由于 style-loader 原理是往浏览器中插入 style 标签，但是服务端就不能适用；

   - 热更新 ：使用 chokidar 和 socket.io 实现基础的开发环境热更新；

   - react-redux-generator
     -- 从 0 开始搭建一个 react 应用架构

     - react v18 用户界面
     - redux 数据管理-- react-redux 库+redux-saga 中间件
     - router 前端路由 -- react-router v6
     - webpack v5 构建，生产环境配置。开发环境配置，以及配置优化开发体验，如 lazyCompilation 等
     - pnpm 包管理器

   - fe-lighthouse-monitor
     -- 关于 lighthouse 的学习和对 url 生成一些自定义审计指标的报告实践；
     关于自定义搜集器（如 resource-gatherer.js）和审计器（resource-audit.js）的自定义

   - micro-fe
     -- 利用 Webpack5 的 Module Federation 实践一个简易的微前端实现；

   - simple-webpack
     -- 实现一个简易的 webpack，模拟一个简单的 compiler 对象

   - ssg-test
     -- 这是一个关于基于 React CSR 的基础上实现一个 SSG 渲染的方案， 包含前端端工程和相关 Docker 部署的 Demo 工程。

   - test-inspector
     -- 介绍一个简易的前端巡检系统开发，以及基于 Puppeteer 的工具包实现；

   - utils-test
     -- 实现一个工具库； 提供按需加载能力和 cli 调用；使用 npm link 和 npm link <'工具包'>来调试或验证；

   - test-chrome-max-requests
     -- 测试 chrome 浏览器默认的最大请求连接数：

   - rich-editer
     -- 自定义一个简易的富文本编辑器

3. notes 记录一些笔记
