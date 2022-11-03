/**
 * 监控（watch 文件变化）
 * @param {function} cb - 监听到变化后要执行的回调
 */
const chokidar = require("chokidar");

const serverWatcher = (cb = () => {}) => {
  let watcher = null;
  console.log("watch-run==");
  return () => {
    if (!watcher) {
      watcher = chokidar.watch(
        "./src"
        //  {
        //   ignored: /(^|[\/\\])\../, // ignore dotfiles
        //   persistent: true
        // }
      );
    }

    watcher.on("change", (path) => {
      console.log("watch=00==", path);
      cb();
    });
  };
};

module.exports = {
  watcher: serverWatcher,
};
