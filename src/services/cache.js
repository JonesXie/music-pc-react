export default class Cache {
  constructor(service, config = {}, axios) {
    if (!service) throw new Error("请传入axios实例");
    this.axios = axios;
    this.service = service;
    this.config = config;
    this.caches = [];
    this.defaultConfig = {
      cache: false, // 是否缓存
      expires: 100 * 1000, // 到期时间 ms(毫秒)
      cacheMode: "sessionStorage", // 存储方式
    };
    this.init();
  }

  /**初始化 */
  init() {
    this.requestInterceptor(this.config.requestInterceptorFn);
    this.responseInterceptor(this.config.responseInterceptorFn);
    window.onbeforeunload = () => {
      this.mapStorage();
    };
  }

  /**请求拦截 */
  requestInterceptor(cb) {
    this.service.interceptors.request.use(
      async (config) => {
        let newConfig = cb && (await cb(config));
        config = newConfig || config;
        let {
          cacheMode = this.defaultConfig.cacheMode,
          cache = this.defaultConfig.cache,
          expires = this.defaultConfig.expires,
        } = config;
        const getKey = this.setKey(config);
        if (cache === true) {
          let obj = this.getStorage(cacheMode, getKey);
          if (obj) {
            let curTime = this.getTime();
            // 判断缓存数据是否过期，如果没过期就停止请求返回缓存
            if (curTime - obj.expires < expires) {
              const source = this.axios.CancelToken.source();
              config.cancelToken = source.token;
              source.cancel(obj.result);
            } else {
              this.removeStorage(cacheMode, getKey);
            }
          }
        } else {
          this.clearStorage(getKey);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**响应拦截 */
  responseInterceptor(cb) {
    this.service.interceptors.response.use(
      async (response) => {
        let newResponse = cb && (await cb(response));
        response = newResponse || response;
        if (response.status !== 200) {
          return response.data;
        }
        let { cacheMode = this.defaultConfig.cacheMode, cache = this.defaultConfig.cache } = response.config;
        if (cache === true) {
          const setKey = this.setKey(response.config);
          const obj = {
            expires: this.getTime(),
            result: response.data,
          };
          this.caches.push(setKey);
          this.setStorage(cacheMode, setKey, obj);
        }
        return response.data;
      },
      (error) => {
        if (this.axios.isCancel(error)) {
          if (error.message) {
            return Promise.resolve(error.message);
          } else {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**设置key */
  setKey(config) {
    let { url, data, params, method } = config;
    let cacheParams = "";
    if (data) {
      cacheParams = data;
    } else if (params) {
      cacheParams = JSON.stringify(params);
    }
    return `${url}?method=${method}&cacheParams=${cacheParams}`;
  }

  /**设置缓存*/
  setStorage(mode = "sessionStorage", key, cache) {
    window[mode].setItem(key, JSON.stringify(cache));
  }

  /**获取缓存 */
  getStorage(mode = "sessionStorage", key) {
    let data = window[mode].getItem(key);
    return JSON.parse(data);
  }

  /**清除缓存 */
  removeStorage(mode = "sessionStorage", key) {
    window[mode].removeItem(key);
  }

  /**清空缓存 */
  clearStorage(key) {
    if (window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
  }

  /**获取当前时间戳 */
  getTime() {
    return Date.now();
  }

  /* 清空没用到的缓存*/
  mapStorage() {
    let length = window.localStorage.length;
    if (length) {
      for (let i = 0; i < length; i++) {
        let key = window.localStorage.key(i);
        if (!this.caches.includes(key) && key.includes("cacheParams=")) {
          window.localStorage.removeItem(key);
        }
      }
    }
  }
}
