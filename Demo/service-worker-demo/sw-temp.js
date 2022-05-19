// 引入 workbox 核心
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

const manifest = __manifest__;
console.log("manifest==", manifest);

// 预缓存
workbox.precaching.precacheAndRoute(manifest);

// 动态缓存,设置缓存策略
// workbox.strategies 对象提供了一系列常用的动态缓存策略来实现对资源请求的处理。包括了以下几种策略：
// NetworkFirst：网络优先
// CacheFirst：缓存优先
// NetworkOnly：仅使用正常的网络请求
// CacheOnly：仅使用缓存中的资源
// StaleWhileRevalidate：从缓存中读取资源的同时发送网络请求更新本地缓存
workbox.routing.registerRoute(
  /\.json$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "demo-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
    fetchOptions: {
      mode: "cors",
      credentials: "omit",
    },
  })
);

workbox.routing.registerRoute(
  /\.png$/,
  new workbox.strategies.CacheFirst({
    cacheName: "demo-cache",
    // plugins: [new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [200] })],
    fetchOptions: {
      mode: "cors",
      credentials: "omit",
    },
  })
);

self.addEventListener("activate", (event) => {
  event.waitUntil(
    // 清除图片缓存
    // 不能直接用 ExpirationPlugin 的删除 API，否则删除的是新一轮的图片资源（此时还没有），而旧的不会被涉及
    caches
      .open("demo-cache")
      .then((cache) => {
        cache.keys().then((cacheNames) => {
          cacheNames.forEach((item) => cache.delete(item));
        });
      })
      .then(() => {
        self.clients.claim();
      })
  );
});
