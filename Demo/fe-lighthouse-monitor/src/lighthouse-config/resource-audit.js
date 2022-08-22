/**
 * 自定义审查器
 */
const Audit = require("lighthouse").Audit; // 引入 lighthouse 的标准审查器
class ResourceAudit extends Audit {
  static get meta() {
    return {
      id: "resource-audit", // 与 audits 数组对应
      title: "资源信息",
      failureTitle: "资源加载失败",
      description: "显示所有资源",
      requiredArtifacts: ["ResourceGatherer"], // 所对应的采集器
    };
  }
  static audit(artifacts) {
    const loadMetrics = JSON.parse(artifacts.ResourceGatherer); // 获取采集内容
    if (!loadMetrics.length) {
      return {
        numericValue: 0,
        score: 1,
        displayValue: "No list found",
      };
    }
    const score100Timing = 1000;
    const durations = loadMetrics.map((d) => d.duration);
    const duration =
      durations.reduce((prev, next) => prev + next, 0) / durations.length;
    const scores = durations.map((d) => Math.min(score100Timing / d, 1)); // 计算每项得分
    const score = scores.reduce((prev, next) => prev + next, 0) / scores.length; // 计算总分
    return {
      numericValue: duration, // 检测值
      score, // 得分
      details: {
        items: loadMetrics, // 详情
      },
      displayValue: `Query render avarage timing is ${parseInt(
        duration,
        10
      )}ms`,
    };
  }
}

module.exports = ResourceAudit;
