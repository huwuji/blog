/**
 * 测试用例
 * 
 * @param {*} inspector 
 */
module.exports = async function (inspector) {

  await inspector.init();
  // console.log('browser==', inspector)

  const $page = await inspector.page;
  const test = await inspector.test;
  const expect = await inspector.expect;



  test('--is open homepage--', async () => {
    console.log('is open homepage==')

    await $page.goto('https://www.baidu.com');
    const title = await $page.evaluate(() => {
      return document.getElementsByTagName('title')[0].innerText
    })
    console.log('title==', title)
    await expect('baidu can not open.', title).toBe('百度一下，你就知道0');
  })

  test('--is open homepage_1--', async () => {
    console.log('is open homepage_1==')

    const page = await $page.goto('https://www.baidu.com');
    const title = await $page.evaluate(() => {
      return document.getElementsByTagName('title')[0].innerText
    })
    console.log('title_1==', title)
    // 
    await expect('baidu can not open.', title).toBe('百度一下，你就知道');
  })

  test('close page', async () => {
    await $page.close();
  })

  // 执行该用例
  inspector.run();
}

