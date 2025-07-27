import { ApiBase } from '../consts';
// 用户
export const GET_AUTH_ROUTES = `${ApiBase}/user/open/getAuthRoutes`; // 获取权限路由
export const GET_CURRENT_USER = `${ApiBase}/user/getCurrentUser`; // 获取当前登录用户信息
export const GET_USER_LIST = `${ApiBase}/user/open/list`; // 用户列表
export const GET_USER_DETAIL = `${ApiBase}/user/detail`; // 用户信息
export const SET_USER_FOLLOW = `${ApiBase}/user/follow`; // 关注用户
export const CANCEL_USER_FOLLOW = `${ApiBase}/user/unfollow`; // 取关用户
export const GET_FOLLOW_LIST = `${ApiBase}/user/open/followList`; // 获取用户关注列表
export const GET_FANS_LIST = `${ApiBase}/user/open/fansList`; // 获取用户关注列表
export const SAVE_BASIC_INFO = `${ApiBase}/user/saveBasicInfo`; // 修改用户信息
export const SAVE_HOMEPAGE = `${ApiBase}/user/saveHomepage`; // 修改个人主页信息
export const SAVE_TELEPHONE = `${ApiBase}/user/saveTelephone`; // 修改手机号
export const SAVE_PASSWORD = `${ApiBase}/user/savePassword`; // 修改密码
export const SAVE_EMAIL = `${ApiBase}/user/saveEmail`; // 修改邮箱
export const GET_PROFILE_MENU = `${ApiBase}/user/open/getProfileMenu`; // 获取主页菜单信息
export const SET_PROFILE_MENU = `${ApiBase}/user/setProfileMenu`; // 设置主页菜单信息
export const GET_USER_DYNAMICS = `${ApiBase}/user/open/getDynamics`; // 获取用户动态
export const GET_USER_DETAIL_BASIC = `${ApiBase}/user/open/getUserBasicById`; // 获取用户开放信息
export const CREATE_MESSAGE = `${ApiBase}/message/open/create`; // 发布留言
export const DELETE_MESSAGE = `${ApiBase}/message/open/delete`; // 删除留言
export const LIST_MESSAGE = `${ApiBase}/message/open/list`; // 留言分页
export const CREATE_FAVORITES = `${ApiBase}/favorites/create`; // 创建收藏夹
export const UPDATE_FAVORITES = `${ApiBase}/favorites/update`; // 更新收藏夹
export const DELETE_FAVORITES = `${ApiBase}/favorites/delete`; // 删除收藏夹
export const LIST_FAVORITES = `${ApiBase}/favorites/open/list`; // 收藏夹列表
export const FAVORITES_POST_PAGE = `${ApiBase}/favorites/open/postPage`; // 收藏夹文章列表

// manage用户
export const GET_MANAGE_AUTH_ROUTES = `${ApiBase}/manage/user/getAuthRoutes`; // 获取权限路由
