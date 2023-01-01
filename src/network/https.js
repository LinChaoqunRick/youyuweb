import axios from "axios";
import {message} from 'ant-design-vue';
import Cookies from "js-cookie";
import store from "../store";

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api'
  axios.defaults.timeout = 50000
} else {
  // 生产环境下
  // axios.defaults.baseURL = '/api'
  axios.defaults.timeout = 50000
}
// 配置axios默认Content-type
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

axios.interceptors.request.use((config) => {
  const token = Cookies.get("token") || '';
  // config.headers.Authorization = token //  如果要求携带在请求头中
  config.headers.token = token;   //如果要求携带在请求头中
  return config
}, (err) => {
  console.log(err);
})

axios.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code === 200) {
    return res;
  } else if (res.code === 401) { // token过期
    message.warning('登录凭证已过期，请重新登录！');
    Cookies.set("token", "");
    store.commit("changeUser", {});
  } else {
    // message.error('系统异常,请联系管理员');
    return Promise.reject(res)
  }
}, (err) => {
  message.error('系统异常,请联系管理员');
  return Promise.reject(err)
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
