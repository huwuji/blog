const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");

/**
 *
 * @returns
 */
function createBrowser() {
  return puppeteer.launch({
    args: ["--show-paint-rects"], //在网页中以可视方式呈现绘制矩形周围的边框，以帮助调试和研究绘制行为。
  });
}

/**
 * 生成报告
 * @param {*} browser
 * @param {*} url
 * @param {*} options
 * @returns
 */
function createReportWithBrowser(
  browser,
  url,
  options = { output: "html" },
  config = {}
) {
  const endpoint = browser.wsEndpoint(); // 获取chrome的ws端口。
  const endpointURL = new URL(endpoint); // 提供chrome 端口给lighthouse,通过端口，利用Chrome Debugging Protocol和Chrome进行交互。
  return lighthouse(
    url,
    Object.assign(
      {},
      {
        port: endpointURL.port,
      },
      options
    ),
    config
  );
}

/**
 * todo
 * 分析报告
 * @param {object} report
 */
function analyseReport(report = {}) {
  // performance得分在score>80;
  const performanceScore = report?.categories?.performance?.score || 0;
  if (performanceScore < 80) {
    return false;
  }
  // 分析audits的各项得分>=80 todo
}

module.exports = {
  createBrowser,
  createReportWithBrowser,
  analyseReport,
};
