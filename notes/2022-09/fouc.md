### Flash Of Unstyled Content 文档样式闪烁

1. 什么是 FOUC？我们从 Wiki 上看一下定义：

   > A flash of unstyled content (or flash of unstyled text) is an instance where a web page appears briefly with the browser's default styles prior to loading an external CSS stylesheet, due to the web browser engine rendering the page before all information is retrieved. The page corrects itself as soon as the style rules are loaded and applied; however, the shift may be distracting. Related problems include flash of invisible text and flash of faux text;

   从上我们简单理解：
   浏览器在加载默认样式和后续样式时，页面上因为样式差异可能出现的短暂的视觉闪动；

2. 一般产生原因？

   - 引入样式表的位置过于靠后；（建议在 header 中引入）；
   - 通过@import 引入样式（@import 会 Html 解析后再执行加载）；

   ```
   <style>
       @import "../xxx.css";
   </style>
   ```

3. 拓展：还有哪些场景下需要关注这个问题？
   - 在做性能优化或用户体验的优化时，对于首页的加载，特别在 Hybrid H5 首页的加载时，很多时刻用户都是在 4G 情况下，需要特别的去关注；建议多关注弱网下的一些页面性能和体验；
   - 在做 SSR 项目时，需要关于 Css 的服务端打包处理；
     （客户端渲染时 ，通常使用 style-loader 来处理，可以将样式通过 js 调用 DOM 操作进行插入；但是在服务端的 Node 环境下不能这样处理，Node 环境下可将样式插入到生成的 html 字符串中。这里则需要 isomorphic-style-loader ，及跨平台的 loader）；
   - 针对 SSG 改造的业务，及在 CSR 的基础上，去做直出 Html 静态页面的服务，需要考虑对于页面的实时动态数据或一些动态的样式（一些利用 css-in-js 的方式展示），需要对这些模块做一些替换改造，及在静态页面生成时，对该动态部分渲染一个默认的样式（可以是一个纯背景的占位样式），目的是减少后续动态样式加载后的‘视觉跳动’；

> https://en.wikipedia.org/wiki/Flash_of_unstyled_content
