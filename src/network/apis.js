const ApiBase = '/plat';
const FrontApiBase = '/api';

// 帖子
export const GET_POST_LIST = ApiBase + "/post/list";
export const GET_POST_DETAIL = ApiBase + "/post/get";
export const SET_POST_LIKE = ApiBase + "/post/setPostLike";
export const IS_POST_LIKE = ApiBase + "/post/isPostLike";
export const CANCEL_POST_LIKE = ApiBase + "/post/cancelPostLike";

// 评论
export const GET_COMMENTS_PAGE = ApiBase + "/comment/getCommentsPage";
export const GET_COMMENTS_ALL = ApiBase + "/comment/getCommentsAll";
export const GET_SUB_COMMENTS_ALL = ApiBase + "/comment/getSubCommentsAll";
export const CREATE_COMMENT = ApiBase + "/comment/createComment";
export const DELETE_COMMENT = ApiBase + "/comment/deleteComment";

export const ACCOUNT_LOGIN = ApiBase + "/login/accountLogin"; // 登录
export const ACCOUNT_LOGOUT = ApiBase + "/login/logout"; // 注销
export const GET_AUTH_ROUTES = ApiBase + "/login/getAuthRoutes"; // 注销
export const ACCOUNT_REGISTER = ApiBase + "/login/register"; // 注销

// 用户
export const GET_USER_BY_ID = ApiBase + "/user/getUserById"; // 根据id获取用户信息
export const GET_LIMIT_POST = ApiBase + "/user/getLimitPost"; // 获取指定数量条帖子记录

export const GET_REGISTER_CODE = ApiBase + "/mail/sendRegisterCode"; // 获取注册验证码
export const HELLO_TEST1 = ApiBase + "/hello/test1"; //

// 分类
export const CATEGORY_LIST = ApiBase + "/category/list"; //

// oss
export const OSS_POLICY = ApiBase + "/oss/policy"; //
export const OSS_STS = ApiBase + "/oss/sts"; //
export const OSS_VOID = ApiBase + "/oss/void"; //

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
