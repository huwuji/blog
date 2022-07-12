'use strict';
const puppeteer = require('puppeteer');
const assert = require("assert");
const { log } = require('./utils.js');

const { EventTask } = require('./event.js');

const event = new EventTask();
/**
 * 提供一系列接口调用
 */
class inspect {
  constructor() {
    this.browser = null;
    this.page = null;
    this.taskId = '';
    this.init = this.init.bind(this);
    this.test = this.test.bind(this);
    this.expect = this.expect.bind(this);
    this.run = this.run.bind(this);
  }

  // 创建一个浏览器对象
  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true, // 本地调试可打开这行看到浏览器
        defaultViewport: {
          width: 1200,
          height: 720,
        },
        slowMo: 500,
        args: [
          '--disable-gpu', // GPU硬件加速
          '--disable-dev-shm-usage', // 创建临时文件共享内存
          '--disable-setuid-sandbox', // uid沙盒
          '--no-sandbox', // 沙盒模式
          '--no-first-run', // 没有设置首页。在启动浏览器的时候，就会打开一个空白页面
          // "--no-zygote",
          // "--no-zygote-sandbox",
          // "--single-process" // 单进程运行
        ],
      });

      this.taskId = Date.now();
      await this.open();
    }
  }

  async close() {
    if (this.browser) {
      await browser.close();
    }
  }

  async open() {
    const page = await this.browser.newPage();
    this.page = page;
    return page;
  }

  async end() {
    await close();
    this.browser = null;
    this.page = null;
    event.off(this.taskId);
  }

  // 添加测试用例 add
  test(description, fn) {
    event.on(this.taskId, fn);
  }

  // 拓展断言
  expect(description, value) {
    return {
      toBe: function (targetValue) {
        try {
          assert.deepEqual(value, targetValue);
          console.log('expect--success')
        } catch {
          // todo 记录和上报异常--到服务器；上报错误描述，类型
          // 通知到机器人等。通过WebHook
          log(description);
          console.log('expect--fail')

        }
      }
    }
  }

  // 执行此次的测试用例
  async run() {
    await event.emit(this.taskId);
  }
}

module.exports = inspect;
