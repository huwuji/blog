const {
  createBrowser,
  createReportWithBrowser,
  analyseReport,
} = require("./src/utils.js");
const lighthouseConfig = require("./src/lighthouse-config/index");
const fs = require("fs");
const Assert = require("assert");
const path = require("path");
const type = "json";
(async () => {
  const browser = await createBrowser();

  const result = await createReportWithBrowser(
    browser,
    "https://www.baidu.com",
    {
      output: type,
    },
    lighthouseConfig
  );

  Assert(result.report, "No report returned");

  console.log("分析得分是否满足：==", analyseReport(result.report));

  fs.writeFileSync(
    path.resolve("./reports", "report." + type),
    result.report,
    "utf-8"
  );

  await browser.close();
})()
  .catch(console.error)
  .then(() => {
    console.log("Finished!");
  });
