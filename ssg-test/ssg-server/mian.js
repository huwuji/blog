const exec = require('child_process').exec;

const {SSG_REACT_PAGES,TARGET_SERVER}=require('./config');
const {getSsgPagesContents}=require('./puppeteer');

const main=async()=>{
    // 创建静态页面html
   await getSsgPagesContents(SSG_REACT_PAGES);
    // 资源推送到目标服务
    // 同机器
   await exec(`docker cp ./ssg_routers ${TARGET_SERVER.dockerContainerName}:/usr/share/nginx/html/`)

    // 远程机器
    // exec(`cp  -P 8080 ./ssg_routers root@192.168.101.3:/usr/share/nginx/html/`)
}

module.exports={
    main
}