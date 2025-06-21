import { ApiBase } from '../consts';

export const ACCOUNT_LOGIN = ApiBase + '/oauth/token'; // 登录
export const ACCOUNT_LOGOUT = ApiBase + '/oauth/logout'; // 注销
export const ACCOUNT_REGISTER = ApiBase + '/oauth/register'; // 注册
export const GET_CONNECT_URL = ApiBase + '/oauth/connect/getUrl'; // 获取QQ授权地址
export const CONNECT_BIND = ApiBase + '/oauth/connect/bind'; // 绑定社交账号
