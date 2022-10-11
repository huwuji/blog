/**
 * 封装一个基于fetch的请求工具方法
 */
import qs from "query-string";

// 基础配置
const BaseConfig = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "include", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(data), // body data type must match "Content-Type" header
};

// 处理请求头
const wrapperConfig = (config, data) => {
  const newConfig = Object.assign(
    {
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    },
    BaseConfig,
    config
  );
  // 设置请求头
  if (!newConfig.headers["content-type"]) {
    // 如果没有设置请求头
    if (newConfig.method === "POST") {
      newConfig.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      newConfig.body = qs.stringify(data); // 序列化,比如表单数据
    } else {
      newConfig.headers["content-type"] = "application/json"; // 默认类型
    }
  }
  if (newConfig.method === "GET") {
    newConfig.mode = "no-cors";
    newConfig.credentials = "omit";
  }
  return newConfig;
};

// 对响应信息状态码的处理，也可以使用也可以使用axiosInstance.interceptors.response.use来拦截响应，
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  let message = "";
  switch (response.status) {
    // case 302:
    // case 307:
    //   message = "接口临时重定向！";
    //   break;
    // case 301:
    // case 308:
    //   message = "接口永久重定向！";
    //   break;
    case 400:
      message = "参数不正确！";
      break;
    case 401:
      message = "您未登录，或者登录已经超时，请先登录！";
      break;
    case 403:
      message = "您没有权限操作！";
      break;
    case 404:
      message = "请求地址出错";
      break;
    case 500:
      message = "服务器内部错误！";
      break;
    case 501:
      message = "服务未实现！";
      break;
    case 502:
      message = "网关错误！";
      break;
    case 503:
      message = "服务不可用！";
      break;
    case 504:
      message = "服务暂时无法访问，请稍后再试！";
      break;
    default:
      message = "异常问题，请联系管理员！";
      break;
  }
  const error = {
    msg: message,
    response,
  };

  throw error;
};

// 对数据json化
const jsonParse = (response) => {
  return response.json();
};

// todo 对业务数据的处理：对业务约定参数的处理，比如业务的一些错误的类型
const dealResponse = (response) => {
  return response;
};

const _Fetch = (url, config, data) => {
  const newConfig = wrapperConfig(config, data);
  return fetch(url, newConfig)
    .then(checkStatus)
    .then(jsonParse)
    .then(dealResponse)
    .then((data) => {
      console.log("data==", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default _Fetch;
