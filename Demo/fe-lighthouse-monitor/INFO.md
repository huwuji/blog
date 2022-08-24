<!--  todo -->

1. [关于 level-jobs](https://github.com/pgte/level-jobs#readme)

2. lighthouse
   2.1） lighthouse 的组成：

   - Driver（驱动）—— 通过 Chrome Debugging Protocol (Chrome 远程调试协议) 和 Chrome 进行交互。
   - Gatherer（采集器）—— 决定在页面加载过程中采集哪些信息，将采集的信息输出为 Artifact。可自定义。
   - Audit（审查器）—— 将 Gatherer 采集的 Artifact 作为输入，审查器会对其测试，然后得出相应的测评结果。可自定义
   - Reporte（报告）—— 将审查的结果通过指定的方式报告出来。

     2.2） lighthouse 的工作流程
     指定浏览器页面打开 url-利用 chrome 远程调试协议连接对应 chrome 页面端口-收集数据-审查数据-生成报告；

> <https://buddy.works/tutorials/automated-lighthouse-reporting-using-puppeteer>

> lighthouse 配置<https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md>

> lighthouse 性能审核 <https://web.dev/lighthouse-performance/>

> lighthouse 审核得分以及权重 <https://web.dev/performance-scoring/> lighthouse default config 默认配置<https://github.com/GoogleChrome/lighthouse/blob/master/core/config/default-config.js>

> lighthouse chrome 资料 <https://developer.chrome.com/docs/lighthouse/overview/>

> lighthouse web.dev 资料 <https://web.dev/learn/#lighthouse>

> chrome devtools <https://github.com/ChromeDevTools/devtools-frontend>
