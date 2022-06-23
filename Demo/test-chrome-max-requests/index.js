const http =require('http');
const fs =require('fs');
const port=9000;

http.createServer((req,res)=>{
console.log('req==',req);
const html=fs.readFileSync('./temp.html','utf-8');
const png=fs.readFileSync('./test.png');

if(req.url==='/'){
res.writeHead(200,{"Content-Type":'text/html'});
res.end(html);
}
if(req.url.includes('.png')){
res.writeHead(200,
{
"Content-Type":'image/png',
"cache-control": "no-cache"
});
res.end(png);
}
}).listen(port);

console.log('port:',port)