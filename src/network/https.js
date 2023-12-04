import axios from "axios";
import {message} from 'ant-design-vue';
import Cookies from "js-cookie";
import store from "@/store";
import router from "@/router";
import qs from 'qs';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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
  const access_token = Cookies.get("access_token") || '';
  if (!!access_token) {
    config.headers.Authorization = "Bearer " + access_token; //  如果要求携带在请求头中
  }
  return config
}, (err) => {
  console.log(err);
})

instance.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code === 200) {
    return res;
  } else if (res.code === 404) { // 注意这里的404不是指接口返回的http状态码，而是请求了一些需要重定向到404的接口
    router.replace({name: 'NotFound'});
    return Promise.reject(res);
  } else if (showMessageCode.includes(res.code)) { // 需要message提示
    message.error(res.message);
    return Promise.reject(res)
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  const status = error.response.status;
  const data = error.response.data;
  if (status === 401) { // token异常：过期、错误等
    console.log("token失效，自动refresh token");
  } else if (status === 404) {
    message.error('请求失败，接口资源不存在');
  } else if (showMessageCode.includes(data.code)) {
    message.error(data.message);
  } else {
    // message.error('系统异常,请联系管理员');
  }
  return Promise.reject(error)
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
    return instance.post(url, qs.stringify(data), config)
  }
}


// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest) => {
  const refresh_token = Cookies.get("refresh_token") || '';
  const tokenRefreshResponse = await store.dispatch("token", {
    client_id: 'web', // oauth客户端id
    client_secret: '654321', // oauth客户端密码
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  }).catch(e => {
    message.warning('持久凭证已过期，刷新失败，请重新登录！');
    Cookies.set("access_token", "");
    Cookies.set("refresh_token", "");
    store.commit("changeUser", {});
    setTimeout(() => {
      // location.reload();
    }, 1500)
  });
  const res_access_token = tokenRefreshResponse.data.access_token;
  const res_refresh_token = tokenRefreshResponse.data.refresh_token;
  Cookies.set("access_token", res_access_token, {expires: 7});
  Cookies.set("refresh_token", res_refresh_token, {expires: 30});
  console.log("token刷新成功");
  failedRequest.response.config.headers['Authorization'] = "Bearer " + res_access_token;
  return await Promise.resolve();
}


// Instantiate the interceptor
createAuthRefreshInterceptor(instance, refreshAuthLogic);

const http = {
  get,
  post
};

export default http
