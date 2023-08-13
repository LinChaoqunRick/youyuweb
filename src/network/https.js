import axios from "axios";
import {message} from 'ant-design-vue';
import Cookies from "js-cookie";
import store from "@/store";
import router from "@/router";
import qs from 'qs';

// if (process.env.NODE_ENV === 'development') {
//   // axios.defaults.baseURL = '/api'
//   axios.defaults.timeout = 50000
// } else {
//   // 生产环境下
//   // axios.defaults.baseURL = '/api'
//   axios.defaults.timeout = 50000
// }

// 配置axios默认Content-type
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

const showMessageCode = [403, 508, 509, 510, 600, 800];

// 创建axios的对象
const instance = axios.create({
  baseURL: "",  //配置固定域名
  timeout: 200 * 1000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})


instance.interceptors.request.use((config) => {
  const token = Cookies.get("token") || '';
  // config.headers.Authorization = token //  如果要求携带在请求头中
  config.headers.token = token;   //如果要求携带在请求头中
  return config
}, (err) => {
  console.log(err);
})

instance.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code === 200) {
    return res;
  } else if (res.code === 401) { // token过期
    message.warning('登录凭证已过期，请重新登录！');
    Cookies.set("token", "");
    store.commit("changeUser", {});
    setTimeout(() => {
      location.reload();
    }, 1500)
    return Promise.reject(res)
  } else if (res.code === 404) {
    router.replace({name: 'NotFound'});
    return Promise.reject(res);
  } else if (showMessageCode.includes(res.code)) { // 需要message提示
    console.log(res.code);
    message.error(res.message);
    return Promise.reject(res)
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
  return instance.get(url, {
    params: params
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
function post(url, data = {}, config = null) {
  if (!config) {
    config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    return instance.post(url, qs.stringify(data), config)
  } else {
    return instance.post(url, data, config)
  }
}

const http = {
  get,
  post
};

export default http
