### CSR 优化 SEO，切换 ssg

1. 此项目是 CSR 客户端渲染项目，为提升项目的 SEO，需要优化项目；
   1）优化为 SSR 项目：但是需要而外的服务器资源，管理和维护前端项目的渲染，需要更多的精力关注服务器抗并发能力等；
   2）SSG：及静态页面生成。基于 react，使用 react 框架提供的 hydrate 功能（基于现有 dome 节点再构建和渲染）；首次直接访问返回 html 页面，供 seo 搜索。再加载 js 代码（通过 hydrate 渲染），提供更丰富的前端交互功能。
   3）nginx 利用 UA 识别爬虫 or 正常用户

   这里我们使用方式二。

2. 方案流程如下：

   [方案时序图](./static/fd_logic.png)

   [前台逻辑图](./static/fd_logic.png)

3. 具体改造方式：

   1）上面说到我们做静态化改造，需要两部分。
   一个是页面 html 内容，这个可以通过另起服务，从目标服务上爬取配置的页面内容，使用 pupeteer;

   二则是需要使用 hydrate 方式渲染的脚本。这里我们通过设置全局变量\_useSsg 来判断，如果\_useSsg===true，则启动 hydrate 渲染。

   2） 部署：
   这里需要注意对于单页面应用的部署:
   这里我们使用 docker 部署，
   这里执行 run.sh 脚本部署：(打包镜像，创建和启动容器)；
   这个时候访问页面的子路后刷新当前页会出现 404，原因是并没有在静态文件中找到这个文件。所以单页面部署需要将所有的页面请求都返回 index.html，浏览器下载了 index.html 后 js 会自动解析并导航到对应页面。
   需要在 nginx 配置 404 到首页:

   ```
   控制台进入容器
       docker exec -it [容器id] /bin/sh

       exit 退出

   替换容器的nginx的default.conf
   dockcer cp default.conf [容器id|name]:/etc/nginx/conf.d/default.conf
   ```

   同时配置 nginx 的默认先访问 app.html（及我们的改造页面）

   ```
     location / {
       root   /usr/share/nginx/html;
       index app.html index.html index.htm;
   }

   ```
