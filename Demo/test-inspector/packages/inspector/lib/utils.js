const moment = require('moment');
const https=require('https');

const log = function (text) {
    console.log(`${moment().format('HH:mm:ss')}  ${text}`);
};

/**
 * 下载静态资源
 * @param {*} url 
 * @param {*} callback 
 */
function download(url, callback) {
    return  new Promise((resolve,reject)=>{
        https.get(url, function(res) {
            if(res.statusCode !== 200){
                reject(res.statusCode);
                return;
            }
            let data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {
                callback(data);
                resolve(data);
            });
        }).on("error", function(err) {
            callback(err);
            reject(err);
        });
    })

}


module.exports = {
    log,
    download
}
