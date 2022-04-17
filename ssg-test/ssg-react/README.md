一. CSR 优化SEO，切换ssg

1. 此项目是CSR客户端渲染项目，为提升项目的SEO，需要优化项目；
    1）优化为SSR项目：但是需要而外的服务器资源，管理和维护前端项目的渲染，需要更多的精力关注服务器抗并发能力等；
    2）SSG：及静态页面生成。基于react，使用react 框架提供的hydrate功能（基于现有dome节点再构建和渲染）；首次直接访问返回html页面，供seo搜索。再加载js代码（通过hydrate渲染），提供更丰富的前端交互功能。
    3）nginx利用UA识别爬虫or正常用户

    这里我们使用方式二。

2. 具体改造方式：
    1) 上面说到我们做静态化改造，需要两部分。
    一个是页面html内容，这个可以通过另起服务，从目标服务上爬取配置的页面内容，使用pupeteer;

    二则是需要使用hydrate方式渲染的脚本。这里我们通过设置全局变量_useSsg来判断，如果_useSsg===true，则启动hydrate渲染。

    3) 部署：
        这里需要注意对于单页面应用的部署:
        这里我们使用docker部署，
        这里执行run.sh脚本部署：(打包镜像，创建和启动容器)；
        这个时候访问页面的子路后刷新当前页会出现404，原因是并没有在静态文件中找到这个文件。所以单页面部署需要将所有的页面请求都返回index.html，浏览器下载了index.html后js会自动解析并导航到对应页面。
        需要在nginx配置 404到首页:

        ```
        控制台进入容器
            docker exec -it [容器id] /bin/sh

            exit 退出

        替换容器的nginx的default.conf
        dockcer cp myLocalNginx.conf [容器id]:/etc/nginx/conf.d/default.conf
        ```

    同时配置nginx的默认先访问 app.html（及我们的改造页面）

    ```
      location / {
        root   /usr/share/nginx/html;
        index app.html index.html index.htm;
    }

    ```

3. 构建shell 脚本

----------------------
其他补充

1. 加入了检测站点指标的脚本

    ```
    const reportWebVitals = onPerfEntry => {

    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
        });
    }
    };

    export default reportWebVitals;
    ```

----------

## 怎么做单元测试

1. 测试框架选择？
    Jest:
    是一个简易的，安全的，全面的 JavaScript 测试框架

2. 安装和使用
    参考官网：<https://jestjs.io/docs/getting-started>
    yarn add --dev jest
    <!-- 生成配置项 -->
    npx jest --init

    <!-- jest 测试时，使用es模式等,jest默认是只支持common.js规范的语法 -->
    yarn add --dev babel-jest @babel/core @babel/preset-env

    ```
    <!-- babel.config.js -->
    module.exports = {
        presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
    };
    ```

3. 匹配器及使用
    <https://jestjs.io/docs/using-matcher>

    toBe
    toEqual

    toBeNull
    toBeUndefined
    toBeDefined
    toBeTruthy
    toBeFalsy

4. 测试异步代码：
    常见情况比较简单，参考： <https://jestjs.io/docs/asynchronous>
    考虑异步的情况，根据异步函数可以考虑使用return，async-await,cb回调，以及通过resolve/reject转变成promise，再进行断言。

5. 钩子函数及其作用域
    beforeAll(cb):只执行一次，在测试用例开始前
    afterAll(cb):只执行一次，在测试用例开始后
    beforeEach(cb):可以执行多次，在每个执行测试用例前调用
    afterEach(cb):可以执行多次，在每个执行测试用例后调用

    作用域规则：
        1)钩子函数在父级分组可作用子集，类似继承
        2)钩子函数同级别分组作用域互不干涉，各自分组内起作用
        3)先执行外部的钩子函数，再执行内部的钩子函数

6. 测试用例分组
    利用describe包裹来分组；

7. 给React应用写单元测试
        使用@testing-library/react来做react 模块的单元测试

    ```
    import { render, screen } from '@testing-library/react';

    import App from '../src/App';

    test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
    });
    ```
