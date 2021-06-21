import axios from "axios";
import qs from "qs";
import Cache from "./cache";

/**创建一个axios的实例 防止污染全局axios */
const service = axios.create({
  // baseURL: "",
  baseURL: "http://localhost:8000",
  timeout: process.env.NODE_ENV === "production" ? 10000 : 0,
});

const interceptorObj = {
  /**请求拦截 */
  requestInterceptorFn: (config) => {
    // do somethis
    return Promise.resolve(config);
  },
  /**响应拦截 */
  responseInterceptorFn: (response) => {
    // do somethis
    return Promise.resolve(response);
    // return new Promise(() => {}); // 中断操作
    // return Promise.reject(response); // 拒绝
  },
};
new Cache(service, interceptorObj, axios);

const CancelToken = axios.CancelToken;
/**全局-取消请求的source，使用 `source.cancel()` */
export const source = CancelToken.source();
const cancelConfig = { cancelToken: source.token };

/**
 * GET 请求封装-获取信息
 * @param {string} url 请求地址
 * @param {object} query query对象
 * @param {object} config 其他配置
 * @returns Promise
 */
export const get = (url, query, config = {}) => {
  // `params` 是与请求一起发送的 URL 参数,必须是一个`简单对象`或 `URLSearchParams 对象`
  return service({
    method: "GET",
    url: url,
    params: query,
    ...cancelConfig,
    ...config,
  });
};

/**
 * DELETE 请求封装-删除信息
 * @param {string} url 请求地址
 * @param {object} query query对象
 * @param {object} config 其他配置
 * @returns Promise
 */
export const remove = (url, query, config = {}) => {
  return service({
    method: "DELETE",
    url: url,
    params: query,
    ...cancelConfig,
    ...config,
  });
};

/**
 * POST 请求封装-添加信息
 * @param {*} url 请求地址
 * @param {*} data body内容
 * @param {*} config 其他配置
 * @returns Promise
 */
export const post = (url, data, config = {}) => {
  // originForm -> 是否是浏览器默认form表单提交格式(application/x-www-form-urlencoded)
  let defaultConfig = { defaultFormdata: false };
  Object.assign(defaultConfig, config);
  return service({
    method: "POST",
    url: url,
    data: defaultConfig.defaultFormdata ? qs.stringify(data) : data,
    ...cancelConfig,
    ...defaultConfig,
  });
};

/**
 * PUT 请求封装-修改信息
 * @param {*} url 请求地址
 * @param {*} data body内容
 * @param {*} config 其他配置
 * @returns Promise
 */
export const put = (url, data, config = {}) => {
  // originForm -> 是否是浏览器默认form表单提交格式(application/x-www-form-urlencoded)
  let defaultConfig = { defaultFormdata: false };
  Object.assign(defaultConfig, config);
  return service({
    method: "PUT",
    url: url,
    data: defaultConfig.defaultFormdata ? qs.stringify(data) : data,
    ...cancelConfig,
    ...defaultConfig,
  });
};

export default service;
