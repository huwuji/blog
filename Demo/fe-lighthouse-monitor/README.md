### 前端性能监控器

#### 目的

提供一个**监控服务**，在模拟情况下，监控前端项目的各种场景下的性能表现，**输出监控报告**；

#### 方案：todo

一般的监控素材主要由两方面提供：

- 真实用户数据：需提供 SDK 包注入到客户端，获取用户真实数据；
- 合成监控数据：及在模拟场景中，通过工具，搭配规则和性能审计条目，获取到一个合成的监控数据报告；

这里我们的方案是合成监控方案；

利用 lighthouse，puppeteer，express

todo:
具体方案流程：
业务工程测试部署后-->调用服务接口-->启动 lighthouse 生成报告-->分析数据-->返回分析结果

> 参考：
> <https://buddy.works/tutorials/automated-lighthouse-reporting-using-puppeteer>
