/**
 * 自定义采集器
 */
const Gatherer = require("lighthouse").Gatherer; // 引入 lighthouse 的标准采集器
class ResourceGatherer extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    return driver
      .evaluateAsync("JSON.stringify(window.performance.getEntries())")
      .then((loadMetrics) => {
        if (!loadMetrics) {
          throw new Error("无法获取资源");
        }
        return loadMetrics;
      });
  }
}

module.exports = ResourceGatherer;
