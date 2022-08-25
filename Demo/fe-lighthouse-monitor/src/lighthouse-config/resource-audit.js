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
    const sources = JSON.parse(artifacts.ResourceGatherer); // 获取采集内容

    if (!sources.length) {
      return {
        numericValue: 0,
        score: 1,
        displayValue: "No list found",
      };
    }
    const durations = sources.map((d) => d.duration);
    const duration = durations.reduce((prev, next) => prev + next, 0);
    // 10s,5s
    const standardTimer = 5000;
    const bestScore = 100;
    const minScore =
      10 * (duration - standardTimer) > bestScore
        ? 0
        : bestScore - 10 * (duration - standardTimer);
    const score = duration > standardTimer ? minScore : bestScore;
    return {
      numericValue: duration, // 检测值
      score: score / 100, // 得分
      details: {
        items: sources, // 详情
      },
      displayValue: `Query render avarage timing is ${parseInt(
        duration,
        10
      )}ms`,
    };
  }
}

module.exports = ResourceAudit;
