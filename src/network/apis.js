const ApiBase = '/plat';
const FrontApiBase = '/api';

export const GET_ARTICLE_LIST = ApiBase + "/blog/list";
export const GET_ARTICLE_DETAIL = FrontApiBase + "/article/details";

export const ACCOUNT_LOGIN = ApiBase + "/login/accountLogin"; // 登录
export const ACCOUNT_LOGOUT = ApiBase + "/login/logout"; // 注销
export const HELLO_TEST1 = ApiBase + "/hello/test1"; //

const Api = {
  // 登录
  getLogin: ApiBase + "/login/getLogin",

  // 博客


  // 用户
  getUserList: ApiBase + '/user/list',
  setDeleted: ApiBase + '/user/setDeleted',

  // 系统
  getNotice: ApiBase + '/system/getNotice',
  setNotice: ApiBase + '/system/setNotice',
  getUpdateLog: ApiBase + '/system/getUpdateLog',
  setUpdateLog: ApiBase + '/system/setUpdateLog',
}


const FrontApi = {
  getBlogNewest: FrontApiBase + "/home/newest",
  getUpdateLog: FrontApiBase + '/message/getUpdateLog'
}


// export {Api, FrontApi}
