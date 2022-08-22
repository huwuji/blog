const { createBrowser, createReportWithBrowser } = require("./utils.js");
const Assert = require("assert");
const Jobs = require("level-jobs");
const uuid = require("uuid");
const levelup = require("levelup");
const leveldown = require("leveldown");
const DB_PATH = "../store";
/**
 * 执行lighthouse监控任务，输出目标url的lighthouse 报告
 * @param {*} store
 * @param {*} payload
 */
async function doReportWork(store, payload) {
  Assert(payload.id, "Expected payload to have an id");
  Assert(payload.url, "Expected payload to have a url");

  const browser = await createBrowser();

  const result = await createReportWithBrowser(
    browser,
    payload.url,
    payload.options || { output: "html" }
  );

  await browser.close();

  // Save our result ready to be retrieved by the client
  console.log(`Saving report for ${payload.id}`);

  const document = Object.assign({}, payload, { result });
  // result.report 是报告核心数据
  await store.put(payload.id, JSON.stringify(document)); //JSON.stringify(document)
}

/**
 * 设置函数，处理一个工作单元 --- 为level-jobs的工作流
 * This function gets 3 arguments:
 * - id uniquely identifies a job to be executed.
 * - payload contains everyting worker need to process the job.
 * - cb is the callback function that must be called when the job is done.
 * @param {*} store
 * @returns
 */
function createReportWorker(store) {
  return (id, payload, callback) => {
    doReportWork(store, payload).then(
      () => callback(),
      (error) => callback(error)
    );
  };
}

/**
 * 重新包装数据库
 * @param {*} store
 * @returns
 */
function createReportQueue(store) {
  const options = {
    maxConcurrency: 2, // 设置最大并发数
  };
  return Jobs(store, createReportWorker(store), options);
}

/**
 * 创建一个levelup数据库
 * @returns
 */
function createReportStore() {
  const database = leveldown("../store"); //这里的路径就是物理存储数据的文件路径,建议不要放到项目中.
  return levelup(database);
}

/**
 *
 * @param {*} store
 * @param {*} queue
 * @param {*} url
 * @param {*} options
 * @returns
 */
async function requestGenerateReport(
  store,
  queue,
  url,
  options = { output: "html" }
) {
  const id = `report:${uuid.v4()}`;
  // Notice the use of JSON.stringify, levelup will accept Buffers or strings, so we want
  // to use JSON for our value
  const document = {
    id,
    url,
    options,
  };
  await store.put(id, JSON.stringify(document));
  await new Promise((resolve, reject) =>
    queue.push(document, (error) => (error ? reject(error) : resolve()))
  )
    .then((info) => {
      console.log("push-- over");
    })
    .catch((err) => {
      console.log("push-- err==", err);
    });
  return id;
}

module.exports = {
  createReportStore,
  createReportQueue,
  requestGenerateReport,
};
