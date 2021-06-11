/**
 * 非空验证  undefined,null,'',{},[]
 * @param {*} 验证的值
 */
export const isTrue = (val) => {
  let temp = true;
  if (typeof val === "object" && val !== null) {
    temp = !["{}", "[]"].includes(JSON.stringify(val));
  } else {
    temp = !!val;
  }
  return temp;
};

/**
 * 时间转化 建议使用moment.js/day.js
 * @param {Date} 时间
 */
export const getTime = (val) => {
  let now = new Date();
  val && (now = new Date(val));
  let year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds();
  const add0 = (m) => {
    return m < 10 ? "0" + m : m;
  };
  return year + "-" + add0(month) + "-" + add0(date) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
};

/**
 * 隐藏电话
 * @param {Number} 手机号
 */
export const hideTel = (val) => {
  let arr = val.split("");
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  }
  return false;
};

/**
 * 深拷贝
 * @param {*} 拷贝内容
 */
export const deepClone = (obj) => {
  if (typeof obj !== "object" || obj == null || obj instanceof RegExp || obj instanceof Date) {
    // obj不是数据/对象，或者为 null/undefined,正则,日期,直接返回
    return obj;
  }
  let result = {};
  obj instanceof Array && (result = []);
  for (let key in obj) {
    // if (obj.hasOwnProperty(key)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // **递归调用**
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
};

/**
 * 复制指定文字到剪切板  可以使用clipboard.js插件
 * @param {*} 复制的内容
 */
export const copyText = (text) => {
  if (document.execCommand("Copy")) {
    var inputZ = document.createElement("input");
    inputZ.setAttribute("id", "inputCopy");
    inputZ.value = text;
    document.body.appendChild(inputZ);
    document.getElementById("inputCopy").select();
    document.execCommand("Copy");
    document.body.removeChild(inputZ);
  } else {
    alert("复制失败");
  }
};

/**
 * 验证手机号
 * @param {*} rule
 * @param {Number} 手机号
 * @param {*} 回调函数
 */
export const validTel = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/;
  reg.test(value) ? callback() : callback(new Error("请输入正确手机号码"));
};

/**
 * 验证身份证
 * @param {*} rule
 * @param {*} 身份证号
 * @param {*} 回调函数
 */
export const checkID = (rule, IDNumber, callback) => {
  let reg15 = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g; //15位
  let reg18 =
    /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g; //18位
  //判断15位
  if (reg15.test(IDNumber)) {
    callback();
  }
  //判断第18位校验值
  if (reg18.test(IDNumber)) {
    let IDArr = IDNumber.split("");
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let code = IDNumber.substring(17);
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += IDArr[i] * factor[i];
    }
    if (parity[sum % 11] === +code.toUpperCase()) {
      callback();
    } else {
      callback(new Error("非法身份证号，请仔细检查！"));
    }
  } else {
    callback(new Error("非法身份证号，请仔细检查！"));
  }
};

/**
 * 获取url全部参数，返回一个对象
 */
export const getAllQuery = () => {
  let url = decodeURI(window.location.href);
  let temp1 = url.split("?");
  let keyValue = temp1.length > 1 ? temp1[1].split("&") : [];
  let obj = {};
  keyValue.forEach((v) => {
    let temp2 = v.split("=");
    obj[temp2[0]] = temp2[1];
  });
  return obj;
};

/**
 *  将对象拼接成url中的query
 * @param {*} 对象
 */
export const joinAllQuery = (query) => {
  let queryArr = [];
  for (let key in query) {
    queryArr.push(`${key}=${query[key]}`);
  }
  return queryArr.join("&");
};

/**
 * 返回当前时间戳
 */
export const getExpireTime = () => {
  return new Date().getTime();
};

/**
 * 根据name获取到url中对应的query参数
 * @param {*} 参数名
 */
export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 去除字符串的空格
 * @param {*} 字符串
 */
export const trim = (str) => {
  return str.replace(/\s|\xA0/g, "");
};

/**
 * 比较两个数组内的值是否相同 1.一维数组，2.不在乎顺序
 * @param {*} 数组一
 * @param {*} 数组二
 */
export const compareArr = (arra, arrb) => {
  let temp = true;
  arra.length === arrb.length &&
    arra.forEach((v) => {
      !arrb.includes(v) && (temp = false);
    });
  return temp;
};

// 防抖 --搜索框/滚动条  短时间内大量触发同一事件，只会执行一次函数
// 实现原理:设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
/**
 * 防抖-搜索框/滚动条
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param  {...any} 携带参数
 */
export const debounce = (func, wait, ...rest) => {
  let timeout = null;
  return (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(e, ...rest);
    }, wait);
  };
};
let debounceTimeout = null;
/**
 * 防抖-搜索框/滚动条-传递参数
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param  {...any} 携带参数
 */
export const debounceParams = (func, wait, ...rest) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    func(...rest);
  }, wait);
};

// 节流 每隔一段时间就执行一次
//设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
/**
 * 节流 每隔一段时间就执行一次
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 */
export const throttle = (func, wait, ...rest) => {
  let timeout = null;
  return (e) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func(e, ...rest);
      }, wait);
    }
  };
};
let throttleTimeout = null;
/**
 * 节流 每隔一段时间就执行一次
 * @param {*} 延迟执行函数
 * @param {*} 等待时间
 * @param {*} 携带参数
 */
export const throttleParams = (func, wait, ...rest) => {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      func(...rest);
    }, wait);
  }
};

/**
 * 验证微信内浏览器
 */
export const isWXNav = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) === "micromessenger";
};

/**
 * 验证 andriod or ios
 */
export const isIOS = () => {
  let Nav = window.navigator.userAgent.toLowerCase();
  // let isAndroid = `${Nav}`.includes("android");
  return `${Nav}`.includes("iphone");
};

/**
 * h5-andriod 软键盘兼容
 */
export const compatibleInput = () => {
  if (isIOS()) return;
  const originalHeight = document.body.clientHeight || document.documentElement.clientHeight; // 记录原有的视口高度
  window.onresize = () => {
    var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < originalHeight) {
      document.getElementById("app").style.height = originalHeight + "px"; // 恢复内容区域高度
    }
  };
};

/**
 * h5键盘回落
 */
export const inputDown = () => {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
  // if (!isWechat) return;
  // const wechatVersion = wechatInfo[1];
  // const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

  // // 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
  // if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
  //   window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // }
};

/**
 * 动态设置标签icon
 * @param {url} 链接
 */
export const setIcon = (url) => {
  let link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
};

/**
 * 移动端添加 console
 */
export const addConsole = () => {
  let vConsole = document.createElement("script");
  vConsole.type = "text/javascript";
  vConsole.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js";
  if (process.env.VUE_APP_VCONSOLE) {
    document.body.appendChild(vConsole) &&
      (vConsole.onload = function () {
        // eslint-disable-next-line
        new VConsole();
      });
  }
};

/**
 * 判断图片是否加载了
 * @param {url} 图片路径
 */

export const CheckImgExists = (imgurl) => {
  var ImgObj = new Image(); //判断图片是否存在
  ImgObj.src = imgurl;
  //存在图片
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
};
/**
 * 判断某元素滚动的高度
 * @param {el} 滚动的元素
 */

export const getScrollPosition = (el = window) => {
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
  };
};

/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**
 * 判断指定元素是否在视口可见
 * @param {el} 指定的元素
 * @param {partiallyVisible} 布尔值 true->‘部分可见’,false->完全不可见
 */
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

/**
 *  延迟执行函数
 * @param {fn}  需执行的函数
 * @param {wait}  延迟时间
 * @param  {...any} args
 */
export const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

/**
 *  数组对象排序
 * @param {Array} 数组
 * @param {prop} 数组对象中需要比较的属性
 */
export const sortArrObj = (arr, prop) => {
  let newArr = deepClone(arr);
  let sortedArr = newArr.sort(ArrCompare(prop));
  return Promise.resolve(sortedArr);
};
const ArrCompare = function (prop) {
  return function (obj1, obj2) {
    let val1 = Number(obj1[prop]);
    let val2 = Number(obj2[prop]);
    isNaN(val1) && (val1 = Number.MAX_SAFE_INTEGER);
    isNaN(val2) && (val2 = Number.MAX_SAFE_INTEGER);
    if (val1 < val2) {
      return -1; // 返回小于0的值，val1 排序在前
    } else if (val1 > val2) {
      return 1; // 返回大于0的值，val1 排序在后
    } else {
      return 0; // 返回0，val1 等于 val2
    }
  };
};

/**
 * 日期格式化
 * @param {data} time
 * @param {format} pattern
 * @returns
 */
export const parseTime = function (time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time.replace(new RegExp(/-/gm), "/");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
};

/**
 * 表单重置
 * @param {string}} refName
 */
export const resetForm = function (refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
};
