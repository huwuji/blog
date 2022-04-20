const puppeteer = require("puppeteer");

const {preSetPage}=require('../puppeteer');


test('测试是否可以设置dom',
    async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await preSetPage(page);
    const content= await page.content();
    const result=await page.evaluate(_ =>  window._useSs);
    await expect(result).toBe(true);
})