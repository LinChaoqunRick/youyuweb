const ApiBase = '/plat';
const FrontApiBase = '/api';

export const GET_ARTICLE_LIST = ApiBase + "/blog/list";
export const GET_ARTICLE_DETAIL = FrontApiBase + "/article/details";


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
