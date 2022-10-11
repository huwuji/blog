/**
 * 封装一个基于axios的请求工具方法， 封装基于fetch的请求也类似
 * 自定义封装实现
 */
import axios from "axios";
import qs from "query-string";

const baseConfig = {
  baseURL: __DEV__ ? "/api_dev" : "/api", // 请求基础地址,可根据环境自定义
  useTokenAuthorization: true, // 是否开启 token 认证
  timeout: 10000, // 请求超时设置
  withCredentials: true, // 跨域请求是否需要携带 cookie
};

// const instance = axios.create({
//   baseURL: "https://some-domain.com/api/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });

// 处理请求头，也可以使用axiosInstance.interceptors.request.use来拦截请求，并设置请求头
const wrapperConfig = (config) => {
  const newConfig = { ...config };
  newConfig.headers["Authorization"] = localStorage.getItem("token"); // 请求头携带 token
  // 设置请求头
  if (!newConfig.headers["content-type"]) {
    // 如果没有设置请求头
    if (newConfig.method === "post") {
      newConfig.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      newConfig.params = qs.stringify(newConfig.params); // 序列化,比如表单数据
    } else {
      newConfig.headers["content-type"] = "application/json"; // 默认类型
    }
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

class _Axios {
  constructor() {
    this.instance = axios.create({
      ...baseConfig,
    });
  }

  request(method = "get", config = {}) {
    return new Promise((resolve, reject) => {
      const newConfig = wrapperConfig(config);
      this.instance({
        method,
        ...newConfig,
        params: config.params, // 这里的结构要注意下
      })
        .then(checkStatus)
        .then(jsonParse)
        .then(dealResponse)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return request("get", config);
  }

  post(config) {
    return request("post", config);
  }

  // todo 取消请求
}

// 生成实例
const init = () => {
  const instances = {};
  return (key = Symbol("")) => {
    if (typeof key !== "string" || typeof key !== "symbol") {
      throw new Error("Expext key to be a string or symbol!");
    }
    if (!instances[key]) {
      instance[key] = new _Axios();
    }
    return instances[key];
  };
};

_Axios.createInstance = init();

export default _Axios;
