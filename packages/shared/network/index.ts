import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import qs from 'qs';
import { ResponseResult } from '../types/common';
import eventBus from '../utils/event-bus';

interface PostAxiosRequestConfig extends AxiosRequestConfig {
  successTip?: string; // 成功提示
  errorTip?: string; // 失败提示
}

const instance = axios.create({
  baseURL: '',
  timeout: 200000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

const showMessageCode = ['403', '508', '509', '510', '530', '600', '800'];

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem('access_token');
    if (access_token && !config.url?.includes('/oauth2/token')) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  err => {
    // console.log(err);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  res => {
    const { config, data } = res as AxiosResponse & {
      config: PostAxiosRequestConfig;
    };
    if (data.code === '200') {
      if (config.successTip) {
        eventBus.emit('showMessage', { type: 'success', text: config.successTip });
      }
      return Promise.resolve(data);
    }
    if (data.code === '404') {
      // 注意这里的404不是指接口返回的http状态码，而是请求了一些需要重定向到404的接口
      eventBus.emit('redirectTo404');
    } else if (showMessageCode.includes(data.code)) {
      // 需要message提示
      eventBus.emit('showMessage', { type: 'error', text: data.message });
    }

    return Promise.reject(data);
  },
  error => {
    const { status, data } = error.response || {};
    if (status === 401) {
      // token异常：过期
      console.log('token失效，自动refresh token');
    } else if (status === 404) {
      eventBus.emit('showMessage', { type: 'error', text: '请求失败，接口资源不存在' });
    } else if (data && showMessageCode.includes(data.code)) {
      eventBus.emit('showMessage', { type: 'error', text: data.message });
    } else if (data.code === 'A0002') {
      // token已被禁止访问
      eventBus.emit('redirectToLogin', { type: 'error', text: data.message });
    } else {
      eventBus.emit('showMessage', { type: 'error', text: '系统异常，请联系管理员' });
    }
    return Promise.reject(error);
  },
);

/**
 * get方法，对应get请求
 * @param url
 * @param params
 */
const get = <T>(url: string, params = {}): Promise<ResponseResult<T>> => {
  return instance.get<any, ResponseResult<T>>(url, { params });
};
/**
 * post方法，对应post请求
 * @param url
 * @param data
 * @param config
 */
const post = <T>(url: string, data = {}, config: PostAxiosRequestConfig = {}): Promise<ResponseResult<T>> => {
  const headers = config?.headers || {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };
  const isJson = headers['Content-Type'] === 'application/json';
  const payload = isJson ? data : qs.stringify(data);
  return instance.post<any, ResponseResult<T>>(url, payload, { ...config, headers });
};

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const [res] = await eventBus.emitAsync('refreshToken', failedRequest);
  return res ? Promise.resolve() : Promise.reject();
};

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default {
  get,
  post,
};
