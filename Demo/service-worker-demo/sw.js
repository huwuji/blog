// 2. 监听server-worker的生命周期，进行安装应用
// 要获取更新，需要关闭或退出使用当前 Service Worker 的所有标签。

this.addEventListener("install", function (event) {
  console.log("install...");
  // 跳过等待
  self.skipWaiting();

  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll([
        "index.html",
        "/static/1.png",
        "/static/2.png",
        "/static/test.js",
      ]);
    })
  );
});

// 3. 监听server-worker的生命周期，进行激活
this.addEventListener("activate", (event) => {
  console.log("activate...");

  var cacheWhitelist = ["v1"];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 4. 自定义请求的响应
this.addEventListener("fetch", function (event) {
  const url = new URL(event.request.url);
  // console.log('fetch000=', url.origin, location.origin, url.pathname, url.pathname == '/1.png')
  // if (url.origin == location.origin && url.pathname == "/static/1.png") {
  //   event.respondWith(caches.match("/static/2.png"));
  // }

  event.respondWith(
    // magic goes here
    // caches.match(event.request) 允许我们对网络请求的资源和 cache 里可获取的资源进行匹配，查看是否缓存中有相应的资源。这个匹配通过 url 和 vary header进行，就像正常的 http 请求一样。
    // caches.match(event.request)
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
