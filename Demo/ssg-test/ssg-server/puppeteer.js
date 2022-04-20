const puppeteer = require("puppeteer");
const fs=require('fs');
const nodeUrl=require('url');

const sourcePath='./build/app.html';

/**
 * 获取快照时，对页面进行处理，包括设置全局变量
 *
 */
const preSetPage=async (page) => {
    // 在当前页面的上下文中执行
    await page.evaluate(()=>{
        const scriptDom=document.createElement('script');
        scriptDom.innerHTML='window._useSsg = true;';
        document.body.appendChild(scriptDom);
    })
}

/**
 * 爬取到的目标路由内容的存放路径
 */
const getCopyDir=(url)=>{
    const urlObj=new URL(url);
    const name=urlObj.pathname;
    const filename=`ssg_routers/${name}.html`;
    console.log('爬取到的目标路由内容的存放路径==',filename);
    return filename;
}


/**
 * 
 * @param {[string]} url 
 * @param {[string]}  sourcePath
 */
const getSsgPageContent= async (url,sourcePath) => {
    if(!url||!sourcePath){
        throw new Error('url,sourcePath error');
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await preSetPage(page);
    const content= await page.content();


    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream(sourcePath);
    
    // 使用 utf8 编码写入数据
    writerStream.write(content,'UTF8');
    
    // 标记文件末尾
    writerStream.end();
    
    // 处理流事件 --> finish、error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });
    
    writerStream.on('error', function(err){
       console.log(err.stack);
    });


    await browser.close();
}

/**
 * 
 * @param {[[string]]} urls 
 */
const getSsgPagesContents=(urls)=>{
    urls.forEach(url => {
        let sourcePath='';
        try{
            sourcePath=getCopyDir(url);
        }catch{
            throw new Error('get sourcePath fail')
        }
        getSsgPageContent(url,sourcePath)

    });
} 

// const todoUrl='http://127.0.0.1:8080';
// main(todoUrl);
module.exports={
    getSsgPagesContents:getSsgPagesContents,
    getSsgPageContent,
    preSetPage,
}