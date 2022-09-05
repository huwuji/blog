#### 前端性能监控器

### 目的

提供一个**监控服务**，在模拟情况下，监控前端项目的各种场景下的性能表现，**输出监控报告**；

### 方案：todo

一般的监控素材主要由两方面提供：

- 真实用户数据：需提供 SDK 包注入到客户端，获取用户真实数据；
- 合成监控数据：及在模拟场景中，通过工具，搭配规则和性能审计条目，获取到一个合成的监控数据报告；

这里我们的方案是合成监控方案；

利用 lighthouse，puppeteer，express

todo:
具体方案流程：
业务工程测试部署后-->调用服务接口-->启动 lighthouse 生成报告-->分析数据-->返回分析结果

### 执行

- 开发：
  yarn demo // 利用该命令来测试单个页面任务；执行后，可以在 reports 文件夹中掺看中查看相关输出的数据；

- 测试：
  yarn start // 启动服务，通过调用服务接口来生成性能报告，以及查看报告，具体参照./src/service 定义

### lighthouse

lighthouse 的组成：

- Driver（驱动）—— 通过 Chrome Debugging Protocol (Chrome 远程调试协议) 和 Chrome 进行交互。
- Gatherer（采集器）—— 决定在页面加载过程中采集哪些信息，将采集的信息输出为 Artifact。可自定义。
- Audit（审查器）—— 将 Gatherer 采集的 Artifact 作为输入，审查器会对其测试，然后得出相应的测评结果。可自定义
- Reporte（报告）—— 将审查的结果通过指定的方式报告出来。

lighthouse 的工作流程
指定浏览器页面打开 url-利用 chrome 远程调试协议连接对应 chrome 页面端口-收集数据-审查数据-生成报告；

> 参考：
> <https://buddy.works/tutorials/automated-lighthouse-reporting-using-puppeteer>

> lighthouse 配置<https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md>

> lighthouse 性能审核 <https://web.dev/lighthouse-performance/>

> lighthouse 审核得分以及权重 <https://web.dev/performance-scoring/> lighthouse default config 默认配置<https://github.com/GoogleChrome/lighthouse/blob/master/core/config/default-config.js>

> lighthouse chrome 资料 <https://developer.chrome.com/docs/lighthouse/overview/>

> lighthouse web.dev 资料 <https://web.dev/learn/#lighthouse>

> chrome devtools <https://github.com/ChromeDevTools/devtools-frontend>

> <https://buddy.works/tutorials/automated-lighthouse-reporting-using-puppeteer>
