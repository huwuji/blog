/**
 * 测试用例
 * 
 * @param {*} inspector 
 */
 const url='https://www.baidu.com'
 module.exports = async function (inspector) {
 
   await inspector.init();
   await inspector.open()
   // console.log('browser==', inspector)
 
   const page = await inspector.page;
   const test = await inspector.test;
   const expect = await inspector.expect;
   const log = await inspector.log;
 
 
 
   test('--is open homepage--', async () => {
     console.log('is open homepage==')
     await page.goto(url,{
       timeout: 30 * 1000,
       waitUntil: 'networkidle0',
     });
     const title = await page.evaluate(() => {
       return document.getElementsByTagName('title')[0].innerText
     })
     console.log('title==', title)
     await expect('baidu can not open.', title).toBe('百度一下，你就知道');
   })
 
   /**
      * 检查子链接是否可以访问
      * 这里我们考虑从页面a链接跳转的子链接
   */
   test('--检查子链接是否可以访问--',async()=>{
     let linkLists  = await page.evaluate(() =>
      Array.from(document.body.querySelectorAll('a[href]'), 
      ({ href }) => href)
   );
     for(let link of linkLists){
       await page.goto(link,{
         timeout: 30 * 1000,
         waitUntil: 'networkidle0',
       });
       await page.waitForNavigation();
       await console.log(page.url());
     }
   })
 
 
   test('--监控API请求是否正常访问--',async()=>{
     await page.goto(url,{
       timeout: 30 * 1000,
       waitUntil: 'load',
     });
     console.log('--监控API请求是否正常访问-----',page.url());
 
     // 监控API请求是否正常访问
     await page.on('requestfailed',(req)=>{
         console.log("请求异常==",req.url());
     });
 
     await page.on('requestfinished',(req)=>{
         console.log("请求正常==",req.url());
     });
 
     // 监控error
     await page.on('error',(req)=>{
         console.log("监控error==",req.url());
     });
 
     // 监控console
     await page.on('console', msg => {
       console.log("监控console==",msg.text());
     });
   })
   
 
   test('close page', async () => {
     console.log('close=',page.url())
     await page.close();
   })
 
   // 执行该用例
   inspector.run();
 }
 
 