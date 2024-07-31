import axios, { type InternalAxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import store from '@/store';
import router from '@/router';
import qs from 'qs';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { cleanCookieLocalStorage } from '@/assets/utils/utils';

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

const showMessageCode = [403, 508, 509, 510, 530, 600, 800];

// 创建axios的对象
const instance = axios.create({
  baseURL: '', //配置固定域名
  timeout: 200 * 1000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access_token = localStorage.getItem('access_token') || '';
    if (!!access_token && config.headers) {
      config.headers.Authorization = 'Bearer ' + access_token; //  如果要求携带在请求头中
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    } else if (res.code === 404) {
      // 注意这里的404不是指接口返回的http状态码，而是请求了一些需要重定向到404的接口
      router.replace({ name: 'NotFound' });
      return Promise.reject(res);
    } else if (showMessageCode.includes(res.code)) {
      // 需要message提示
      message.error(res.message);
      return Promise.reject(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const status = error.response.status;
    const data = error.response.data;
    if (status === 401) {
      // token异常：过期、错误等
      console.log('token失效，自动refresh token');
    } else if (status === 404) {
      message.error('请求失败，接口资源不存在');
    } else if (showMessageCode.includes(data.code)) {
      message.error(data.message);
    } else {
      message.error('系统异常,请联系管理员');
    }
    // 此处必须返回error才能正确被createAuthRefreshInterceptor拦截
    return Promise.reject(error);
  }
);

/**
 * get方法，对应get请求
 * @param url
 * @param params
 */
function get(url: string, params = {}) {
  return instance.get(url, {
    params: params
  });
}

/**
 * post方法，对应post请求
 * @param url
 * @param data
 * @param config
 */
function post(url: string, data = {}, config: any = null) {
  if (!config) {
    config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
    return instance.post(url, qs.stringify(data), config);
  } else if (!!config && config.headers['Content-Type'] !== 'application/json') {
    return instance.post(url, qs.stringify(data), config);
  } else {
    // application/json 请求头是单独的，它不需要qs.stringify()来转化参数
    return instance.post(url, data, config);
  }
}

// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest: any) => {
  const refresh_token = localStorage.getItem('refresh_token');
  const tokenRefreshResponse = await store
    .dispatch('token', {
      client_id: 'web', // oauth客户端id
      client_secret: '654321', // oauth客户端密码
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }).catch((e) => {
      message.warning('持久凭证已过期，刷新令牌失败，请重新登录！');
      cleanCookieLocalStorage();
      store.commit('changeUser', {});
      setTimeout(() => {
        window.location.reload();
        router.push('/');
      }, 1500);
    });
  const { access_token: res_access_token, refresh_token: res_refresh_token } = tokenRefreshResponse.data;
  localStorage.setItem("access_token", res_access_token);
  localStorage.setItem("refresh_token", res_refresh_token);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + res_access_token;
  return await Promise.resolve();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(instance, refreshAuthLogic);

const http = {
  get,
  post
};

export default http;
