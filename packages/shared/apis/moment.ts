import { ApiBase } from '../consts';
// 时刻
export const MOMENT_CREATE = `${ApiBase}/moment/create`; // 创建时刻
export const MOMENT_UPDATE = `${ApiBase}/moment/update`; // 更新时刻
export const MOMENT_DELETE = `${ApiBase}/moment/delete`; // 删除时刻
export const MOMENT_LIST = `${ApiBase}/moment/open/list`; // 时刻列表
export const MOMENT_LIST_FOLLOWING = `${ApiBase}/moment//list/following`; // 时刻列表(关注的)
export const GET_MOMENT = `${ApiBase}/moment/open/get`; // 时刻列表
export const GET_MOMENT_USER_DETAIL = `${ApiBase}/moment/open/getMomentUserDetailById`; // 获取时刻用户详情
export const CREATE_MOMENT_COMMENT = `${ApiBase}/momentComment/open/create`; // 发表评论
export const LIST_MOMENT_COMMENT_PAGE = `${ApiBase}/momentComment/open/momentCommentPage`; // 获取评论列表(分页，默认第一页)
export const LIST_MOMENT_COMMENT_ALL = `${ApiBase}/momentComment/open/listMomentCommentAll`; // 获取评论列表(全部，不分页)
export const LIST_MOMENT_REPLY_PAGE = `${ApiBase}/momentComment/open/listMomentReplyPage`; // 获取评论的回复列表(分页，默认第一页)
export const DELETE_MOMENT_COMMENT = `${ApiBase}/momentComment/delete`; // 删除评论
export const SET_MOMENT_LIKE = `${ApiBase}/momentLike/setMomentLike`; // 点赞时刻
export const IS_MOMENT_LIKE = `${ApiBase}/momentLike/isMomentLike`; // 是否点赞
export const CANCEL_MOMENT_LIKE = `${ApiBase}/momentLike/cancelMomentLike`; // 取消点赞
export const SET_MOMENT_COMMENT_LIKE = `${ApiBase}/momentCommentLike/setMomentCommentLike`; // 评论点赞
export const CANCEL_MOMENT_COMMENT_LIKE = `${ApiBase}/momentCommentLike/cancelMomentCommentLike`; // 取消评论点赞
