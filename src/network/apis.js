const ApiBase = '/plat';
const FrontApiBase = '/api';

// 帖子
export const GET_POST_LIST = ApiBase + "/post/list";
export const GET_POST_DETAIL = ApiBase + "/post/get";
export const SET_POST_LIKE = ApiBase + "/post/setPostLike";
export const IS_POST_LIKE = ApiBase + "/post/isPostLike";
export const CANCEL_POST_LIKE = ApiBase + "/post/cancelPostLike";
export const GET_CREATE_TYPES = ApiBase + "/post/getCreateTypes"; // 获取文章类型
export const CREATE_POST = ApiBase + "/post/create"; // 发布文章
export const GET_POST_EDIT_DETAIL = ApiBase + "/post/edit/detail"; // 获取编辑文章详情
export const UPDATE_POST = ApiBase + "/post/update"; // 获取编辑文章详情
export const SET_POST_COLLECT = ApiBase + "/post/postCollect";
export const IS_POST_COLLECT = ApiBase + "/post/isPostCollect";
export const CANCEL_POST_COLLECT = ApiBase + "/post/cancelPostCollect";


// 评论
export const GET_COMMENTS_PAGE = ApiBase + "/comment/getCommentsPage";
export const GET_COMMENTS_ALL = ApiBase + "/comment/getCommentsAll";
export const GET_SUB_COMMENTS_ALL = ApiBase + "/comment/getSubCommentsAll";
export const CREATE_COMMENT = ApiBase + "/comment/createComment";
export const DELETE_COMMENT = ApiBase + "/comment/deleteComment";
export const SET_COMMENT_LIKE = ApiBase + "/comment/setLike";
export const CANCEL_COMMENT_LIKE = ApiBase + "/comment/cancelLike";

export const ACCOUNT_LOGIN = ApiBase + "/login/accountLogin"; // 登录
export const ACCOUNT_LOGOUT = ApiBase + "/login/logout"; // 注销
export const GET_AUTH_ROUTES = ApiBase + "/login/getAuthRoutes"; // 注销
export const ACCOUNT_REGISTER = ApiBase + "/login/register"; // 注销

// 用户
export const GET_USER_BY_ID = ApiBase + "/user/getUserById"; // 根据id获取用户信息
export const GET_LIMIT_POST = ApiBase + "/user/getLimitPost"; // 获取指定数量条帖子记录

export const GET_REGISTER_CODE = ApiBase + "/mail/sendRegisterCode"; // 获取注册验证码

// 分类
export const CATEGORY_LIST = ApiBase + "/category/list"; //

// 用户
export const GET_COLUMN_LIST = ApiBase + "/column/list"; //

// oss
export const OSS_POLICY = ApiBase + "/oss/policy"; //
export const OSS_STS = ApiBase + "/oss/sts"; //

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
