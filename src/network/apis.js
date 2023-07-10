const ApiBase = '/plat';

// 登录
export const ACCOUNT_LOGIN = ApiBase + "/login/accountLogin"; // 账号登录
export const TELEPHONE_LOGIN = ApiBase + "/login/telephoneLogin"; // 手机验证码登录
export const ACCOUNT_LOGOUT = ApiBase + "/login/logout"; // 注销
export const GET_AUTH_ROUTES = ApiBase + "/login/getAuthRoutes"; // 获取权限路由
export const ACCOUNT_REGISTER = ApiBase + "/login/register"; // 注销
export const GET_CURRENT_USER = ApiBase + "/login/getCurrentUser"; // 获取当前登录用户信息

// 帖子
export const GET_POST_USER_DETAIL = ApiBase + "/post/getUserDetailById"; // 根据id获取用户详细信息（包括帖子数、粉丝数等）
export const GET_POST_LIST = ApiBase + "/post/list";
export const GET_POST_DETAIL = ApiBase + "/post/get";
export const SET_POST_LIKE = ApiBase + "/post/setPostLike";
export const IS_POST_LIKE = ApiBase + "/post/isPostLike";
export const CANCEL_POST_LIKE = ApiBase + "/post/cancelPostLike";
export const GET_CREATE_TYPES = ApiBase + "/post/getCreateTypes"; // 获取文章类型
export const CREATE_POST = ApiBase + "/post/create"; // 发布文章
export const GET_POST_EDIT_DETAIL = ApiBase + "/post/edit/detail"; // 获取编辑文章详情
export const UPDATE_POST = ApiBase + "/post/update"; // 获取编辑文章详情
export const DELETE_POST = ApiBase + "/post/delete"; // 删除文章
export const SET_POST_COLLECT = ApiBase + "/post/postCollect";
export const IS_POST_COLLECT = ApiBase + "/post/isPostCollect";
export const CANCEL_POST_COLLECT = ApiBase + "/post/cancelPostCollect";
export const GET_POST_COLLECT_LIST = ApiBase + "/post/collectList"; // 获取收藏列表
export const GET_LIMIT_POST = ApiBase + "/post/getLimitPost"; // 获取指定数量条帖子记录

// 笔记
export const CREATE_NOTE = ApiBase + "/note/create"; // 创建笔记
export const LIST_NOTE = ApiBase + "/note/list"; // 笔记列表
export const GET_NOTE = ApiBase + "/note/get"; // 笔记详情
export const UPDATE_NOTE = ApiBase + "/note/update"; // 笔记修改
export const CREATE_NOTE_CHAPTER = ApiBase + "/noteChapter/create"; // 创建章节
export const LIST_NOTE_CHAPTER = ApiBase + "/noteChapter/list"; // 章节列表
export const GET_NOTE_CHAPTER = ApiBase + "/noteChapter/get"; // 章节详情
export const UPDATE_NOTE_CHAPTER = ApiBase + "/noteChapter/update"; // 章节修改
export const DELETE_NOTE_CHAPTER = ApiBase + "/noteChapter/delete"; // 章节删除

// 评论
export const GET_POST_COMMENTS_PAGE = ApiBase + "/comment/getCommentsPage";
export const GET_POST_COMMENTS_ALL = ApiBase + "/comment/getCommentsAll";
export const GET_POST_SUB_COMMENTS_ALL = ApiBase + "/comment/getPostSubCommentsAll";
export const GET_POST_SUB_COMMENTS_PAGE = ApiBase + "/comment/getPostSubCommentsPage";
export const CREATE_POST_COMMENT = ApiBase + "/comment/createComment";
export const DELETE_POST_COMMENT = ApiBase + "/comment/deleteComment";
export const SET_POST_COMMENT_LIKE = ApiBase + "/comment/setLike";
export const CANCEL_POST_COMMENT_LIKE = ApiBase + "/comment/cancelLike";

// 用户
export const GET_USER_LIST = ApiBase + "/user/list"; // 用户列表
export const SET_USER_FOLLOW = ApiBase + "/user/follow"; // 关注用户
export const CANCEL_USER_FOLLOW = ApiBase + "/user/unfollow"; // 取关用户
export const GET_FOLLOW_LIST = ApiBase + "/user/followList"; // 获取用户关注列表
export const GET_FANS_LIST = ApiBase + "/user/fansList"; // 获取用户关注列表
export const SAVE_BASIC_INFO = ApiBase + "/user/saveBasicInfo"; // 修改用户信息
export const SAVE_HOMEPAGE = ApiBase + "/user/saveHomepage"; // 修改个人主页信息
export const SAVE_TELEPHONE = ApiBase + "/user/saveTelephone"; // 修改手机号
export const SAVE_PASSWORD = ApiBase + "/user/savePassword"; // 修改密码
export const SAVE_EMAIL = ApiBase + "/user/saveEmail"; // 修改邮箱
export const GET_PROFILE_MENU = ApiBase + "/user/getProfileMenu"; // 获取主页菜单信息
export const SET_PROFILE_MENU = ApiBase + "/user/setProfileMenu"; // 设置主页菜单信息

// 时刻
export const MOMENT_CREATE = ApiBase + "/moment/create"; // 创建时刻
export const MOMENT_DELETE = ApiBase + "/moment/delete"; // 删除时刻
export const MOMENT_LIST = ApiBase + "/moment/list"; // 时刻列表
export const GET_MOMENT_USER_DETAIL = ApiBase + "/moment/getUserDetailById"; // 时刻列表
export const CREATE_MOMENT_COMMENT = ApiBase + "/momentComment/create"; // 发表评论
export const LIST_MOMENT_COMMENT_PAGE = ApiBase + "/momentComment/listMomentCommentPage"; // 获取评论列表(分页，默认第一页)
export const LIST_MOMENT_COMMENT_ALL = ApiBase + "/momentComment/listMomentCommentAll"; // 获取评论列表(全部，不分页)
export const LIST_MOMENT_REPLY_PAGE = ApiBase + "/momentComment/listMomentReplyPage"; // 获取评论的回复列表(分页，默认第一页)
export const DELETE_MOMENT_COMMENT = ApiBase + "/momentComment/delete"; // 删除评论
export const SET_MOMENT_LIKE = ApiBase + "/momentLike/setMomentLike"; // 点赞时刻
export const IS_MOMENT_LIKE = ApiBase + "/momentLike/isMomentLike"; // 是否点赞
export const CANCEL_MOMENT_LIKE = ApiBase + "/momentLike/cancelMomentLike"; // 取消点赞
export const SET_MOMENT_COMMENT_LIKE = ApiBase + "/momentCommentLike/setMomentCommentLike"; // 评论点赞
export const CANCEL_MOMENT_COMMENT_LIKE = ApiBase + "/momentCommentLike/cancelMomentCommentLike"; // 取消评论点赞

// 邮件
export const SEND_EMAIL_CODE = ApiBase + "/mail/sendRegisterCode"; // 获取邮箱验证码

// 分类
export const CATEGORY_LIST = ApiBase + "/category/list"; //

// 用户
export const GET_COLUMN_LIST = ApiBase + "/column/list"; //

// oss
export const OSS_POLICY = ApiBase + "/oss/policy"; //
export const OSS_STS = ApiBase + "/oss/sts"; //

// 短信
export const MESSAGE_SEND = ApiBase + "/message/send"; // 发送验证码
export const MESSAGE_VERIFY = ApiBase + "/message/verify"; // 发送验证码


