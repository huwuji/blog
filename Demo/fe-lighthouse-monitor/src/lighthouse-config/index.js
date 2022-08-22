module.exports = {
  extends: "lighthouse:default", // 继承默认配置
  settings: {
    onlyAudits: [
      "resource-audit", // 展示我们自定义的审查器
      "first-contentful-paint",
      "largest-contentful-paint",
      // "first-meaningful-paint",
      "speed-index",
      // "first-cpu-idle",
      "total-blocking-time",
      "interactive",
      "cumulative-layout-shift",
    ],
  },
  passes: [
    {
      passName: "defaultPass",
      gatherers: [
        "./src/lighthouse-config/resource-gatherer", // 同目录下的 resource-gatherer.js
      ],
    },
  ],
  audits: [
    "./src/lighthouse-config/resource-audit", // 同目录下的 resource-audit.js
  ],
  categories: {
    timing: {
      title: "资源详情",
      description: "展示页面上所有的资源加载情况",
      auditRefs: [{ id: "resource-audit", weight: 1, group: "metrics" }],
    },
    performance: {
      title: "Performance",
      description: "This category judges your performance",
      auditRefs: [
        { id: "first-contentful-paint", weight: 10, group: "metrics" },
        { id: "largest-contentful-paint", weight: 25, group: "metrics" },
        { id: "speed-index", weight: 10, group: "metrics" },
        { id: "total-blocking-time", weight: 30, group: "metrics" },
        { id: "cumulative-layout-shift", weight: 15, group: "metrics" },
        { id: "interactive", weight: 10, group: "metrics" },
      ],
    },
  },
  groups: {
    metrics: {
      title: "资源",
      description: "加载时间过长的资源",
    },
  },
};
