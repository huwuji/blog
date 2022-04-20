const path=require('path');

/**
 * 目标域名
 */
const SSG_REACT_DOMAIN='http://127.0.0.1:8080/';

/**
 * 项目-路由配置
 */
const SSG_REACT_PAGES=[
    path.join(SSG_REACT_DOMAIN,'index'),
    path.join(SSG_REACT_DOMAIN,'myinfo')
]

/**
 * 目标机器的ip，密码
 */
const TARGET_SERVER={
    dockerContainerName:'ssg-docker-container'
}

module.exports={
    SSG_REACT_PAGES,
    TARGET_SERVER
}