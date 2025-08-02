import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import qs from 'qs';
import { ResponseResult } from '../types';
import eventBus from '../utils/event-bus';

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
    const { data } = res;
    if (data.code === '200') return Promise.resolve(data);

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
const get = (url: string, params = {}): Promise<ResponseResult> => instance.get(url, { params });

/**
 * post方法，对应post请求
 * @param url
 * @param data
 * @param config
 */
const post = (url: string, data = {}, config: AxiosRequestConfig = {}): Promise<ResponseResult> => {
  const headers = config?.headers || {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };
  const isJson = headers['Content-Type'] === 'application/json';
  const payload = isJson ? data : qs.stringify(data);
  return instance.post(url, payload, { ...config, headers });
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
