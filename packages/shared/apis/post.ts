import { ApiBase } from '../consts';

// 文章
export const GET_POST_USER_DETAIL = ApiBase + '/post/open/getUserDetailById'; // 根据id获取用户详细信息（包括帖子数、粉丝数等）
export const GET_POST_LIST = ApiBase + '/post/open/list';
export const GET_POST_DETAIL = ApiBase + '/post/open/get';
export const SET_POST_LIKE = ApiBase + '/post/setPostLike';
export const IS_POST_LIKE = ApiBase + '/post/isPostLike';
export const CANCEL_POST_LIKE = ApiBase + '/post/cancelPostLike';
export const GET_CREATE_TYPES = ApiBase + '/post/open/getCreateTypes'; // 获取文章类型
export const CREATE_POST = ApiBase + '/post/create'; // 发布文章
export const GET_POST_EDIT_DETAIL = ApiBase + '/post/edit/detail'; // 获取编辑文章详情
export const UPDATE_POST = ApiBase + '/post/update'; // 获取编辑文章详情
export const DELETE_POST = ApiBase + '/post/delete'; // 删除文章
export const SET_POST_COLLECT = ApiBase + '/post/postCollect';
export const GET_POST_COLLECT_INFO = ApiBase + '/post/getPostCollectInfo';
export const CANCEL_POST_COLLECT = ApiBase + '/post/cancelPostCollect';
export const GET_POST_COLLECT_LIST = ApiBase + '/post/collectList'; // 获取收藏列表
export const GET_LIMIT_POST = ApiBase + '/post/open/getLimitPost'; // 获取指定数量条帖子记录
export const HIDE_POST = ApiBase + '/post/hide'; // 隐藏文章

// 文章-评论
export const GET_POST_COMMENTS_PAGE = ApiBase + '/comment/open/getCommentsPage';
export const GET_POST_COMMENTS_ALL = ApiBase + '/comment/open/getCommentsAll';
export const GET_POST_SUB_COMMENTS_ALL = ApiBase + '/comment/open/getPostSubCommentsAll';
export const GET_POST_SUB_COMMENTS_PAGE = ApiBase + '/comment/open/getPostSubCommentsPage';
export const CREATE_POST_COMMENT = ApiBase + '/comment/createComment';
export const DELETE_POST_COMMENT = ApiBase + '/comment/deleteComment';
export const SET_POST_COMMENT_LIKE = ApiBase + '/comment/setLike';
export const CANCEL_POST_COMMENT_LIKE = ApiBase + '/comment/cancelLike';

// 分类
export const CATEGORY_LIST = ApiBase + '/category/open/list'; //文章分类

// 专栏
export const GET_COLUMN_LIST = ApiBase + '/column/open/list'; //专栏列表
export const GET_COLUMN_DETAIL = ApiBase + '/column/open/get'; //专栏详情
export const ADD_COLUMN = ApiBase + '/column/create'; //专栏列表
export const UPDATE_COLUMN = ApiBase + '/column/update'; //专栏列表
export const DELETE_COLUMN = ApiBase + '/column/delete'; //删除专栏
export const GET_COLUMN_POSTS = ApiBase + '/column/open/getColumnPosts'; //专栏文章列表
export const SET_COLUMN_IS_TOP = ApiBase + '/column/setColumnIsTop'; //设置专栏置顶状态
