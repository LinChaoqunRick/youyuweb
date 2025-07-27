import { ApiBase } from '../consts';

export const ACCOUNT_LOGIN = `${ApiBase}/oauth2/token`; // 登录
export const ACCOUNT_LOGOUT = `${ApiBase}/oauth2/logout`; // 注销
export const ACCOUNT_REGISTER = `${ApiBase}/oauth2/register`; // 注册
export const GET_CONNECT_URL = `${ApiBase}/oauth2/connect/getUrl`; // 获取QQ授权地址
export const CONNECT_BIND = `${ApiBase}/oauth2/connect/bind`; // 绑定社交账号
