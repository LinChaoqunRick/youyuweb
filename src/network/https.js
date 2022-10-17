import axios from "axios";
import {message} from 'ant-design-vue';

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api'
  axios.defaults.timeout = 50000
} else {
  // 生产环境下
  // axios.defaults.baseURL = '/api'
  axios.defaults.timeout = 50000
}

axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  console.log(err);
})

axios.interceptors.response.use((response) => {
  // 如果是前台的接口，就不做逻辑判断，原因：前台的API没有统一结果格式
  if (response.config.url.split("/")[1] === "api") {
    return response.data;
  }
  const res = response.data;
  if (res.code == null || res.code !== 200) {
    message.error('系统异常,请联系管理员');
    return Promise.reject('error')
  } else if (res.code === 407) {
    // console.log("Token失效跳转登陆页面");
    // sessionStorage.clear();
    // location.href="/ecloud-sp/logout";
  } else {
    return res.data
  }
}, (err) => {
  console.log(err);
  message.error('系统异常,请联系管理员');
  return Promise.reject('error')
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const http = {
  get: get,
  post: post
};

export default http
