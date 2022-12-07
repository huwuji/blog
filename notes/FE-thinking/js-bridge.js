/**
 * 封装一个jsbridge库
 * 功能点：
 * 1. native 调用 web 的方法封装
 * 2. web 调用 native 的方法封装
 * 2.1 web 调用 native 传入的回调函数的封装
 */

// native注入到webview的全局对象，如window.my_bridger
const BRIDGE_KEY = "my_bridger";

// 当前页面是否加载完成
let pageLoaded = false;

//native主动调用时，收集所订阅的方法
let NativeEvents = {};

// 回调集合，
let Callbacks = {};

const utils = {
  isMobile() {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      return true;
    }
    if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
      return true;
    }
    // window.orientation属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回undefined。
    if (typeof window.orientation !== "undefined") {
      return true;
    }
    // 手机浏览器的 DOM 元素可以通过ontouchstart属性，为touch事件指定监听函数。桌面设备没有这个属性。
    if ("ontouchstart" in document.documentElement) {
      return true;
    }
    return false;
  },
  isApp() {
    return window.navigator.userAgent.includes("app_flag_name");
  },
  hasBridge() {
    return window && window[BRIDGE_KEY];
  },
  isFn(fn) {
    return Object.prototype.toString.call(fn).includes("Function");
  },
  // 判断当前页面的加载状态
  isLoad() {
    if (document.readyState === "complete") {
      return true;
    } else {
      return false;
    }
  },
};

// native 调用主动调用
async function nativeEventCall(eventId, params) {
  // 判断当前页面加载情况：未加载完则延时执行
  const timer = setTimeout(function () {
    if (pageLoaded || utils.isLoad) {
      clearTimeout(timer);
      if (NativeEvents[eventId]) {
        for (const fn of NativeEvents[eventId]) {
          isFn(fn) && fn(JSON.parse(params) || {});
        }
      }
    }
  }, 400);
}

// native执行回调
function cativeCallback(caKey, params) {
  try {
    if (Callbacks[caKey]) {
      Callbacks[caKey](JSON.parse(params || {}));
      // 消费后移除
      delete Callbacks[caKey];
    } else {
      console.error("native执行回调不存在");
    }
  } catch (e) {
    console.error("native执行回调失败", e);
  }
}

function jsBridge() {
  return {
    init() {
      if (!isApp) {
        console.error("当前环境不是app环境");
        return;
      }
      // 监听状态
      if (window && window.addEventListener) {
        window.addEventListener("domContenLoad", function () {
          pageLoaded = true;
        });
        window.addEventListener("load", function () {
          pageLoaded = true;
        });
      } else {
        window.attachEvent("onload", function () {
          pageLoaded = true;
        });
      }
      // 注册相关的全局函数
      window.nativeEventCall = nativeEventCall;
      window.cativeCallback = cativeCallback;
    },
    // 监听对native主动调用事件
    onListenNativeEvent(eventId, callback) {
      try {
        if (eventId && callback && isFn(callback)) {
          if (NativeEvents[eventId]) {
            NativeEvents[eventId].push(callback);
          } else {
            NativeEvents[eventId] = [callback];
          }
        } else {
          console.error("订阅失败，请检查订阅参数：", eventId, callback);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    // web调用native；msg是与native一起约定的，msg:{type:'',params:'',callback:()=>{}}
    callNative(msg) {
      const { callback, ...msgRest } = msg || {};
      // 关联回调到Callbacks上
      const key = Symbol(callback);
      Callbacks[key] = callback;
      // 处理发送给native的参数
      const newMsg = {
        ...msgRest,
        callback: cativeCallback, // !!!native执行回调
        cbKey: key, // !native执行回调的参数，及要调用的key
      };
      // 这里通过让native拦截URL scheme的方式
      prompt(JSON.stringify(newMsg));
    },
  };
}

// demo--web使用
function runTest() {
  const jsBridger = jsBridge();
  jsBridger.onListenNativeEvent("leftClick", (params) => {
    console.log("leftClick", params);
  });
  jsBridger.callNative({
    type: "func",
    params: params,
  });

  // native 调用，
  nativeEventCall("leftClick", '{"a":2}');
}
