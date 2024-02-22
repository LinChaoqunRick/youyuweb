const ApiBase = '/plat';

// 登录
export const ACCOUNT_LOGIN = ApiBase + "/oauth/token"; // 登录
export const ACCOUNT_LOGOUT = ApiBase + "/oauth/logout"; // 注销
export const ACCOUNT_REGISTER = ApiBase + "/oauth/register"; // 注册
export const GET_CONNECT_URL = ApiBase + "/oauth/connect/getUrl"; // 获取QQ授权地址
export const CONNECT_BIND = ApiBase + "/oauth/connect/bind"; // 绑定社交账号

// 文章
export const GET_POST_USER_DETAIL = ApiBase + "/post/open/getUserDetailById"; // 根据id获取用户详细信息（包括帖子数、粉丝数等）
export const GET_POST_LIST = ApiBase + "/post/open/list";
export const GET_POST_DETAIL = ApiBase + "/post/open/get";
export const SET_POST_LIKE = ApiBase + "/post/setPostLike";
export const IS_POST_LIKE = ApiBase + "/post/isPostLike";
export const CANCEL_POST_LIKE = ApiBase + "/post/cancelPostLike";
export const GET_CREATE_TYPES = ApiBase + "/post/open/getCreateTypes"; // 获取文章类型
export const CREATE_POST = ApiBase + "/post/create"; // 发布文章
export const GET_POST_EDIT_DETAIL = ApiBase + "/post/edit/detail"; // 获取编辑文章详情
export const UPDATE_POST = ApiBase + "/post/update"; // 获取编辑文章详情
export const DELETE_POST = ApiBase + "/post/delete"; // 删除文章
export const SET_POST_COLLECT = ApiBase + "/post/postCollect";
export const IS_POST_COLLECT = ApiBase + "/post/isPostCollect";
export const CANCEL_POST_COLLECT = ApiBase + "/post/cancelPostCollect";
export const GET_POST_COLLECT_LIST = ApiBase + "/post/collectList"; // 获取收藏列表
export const GET_LIMIT_POST = ApiBase + "/post/open/getLimitPost"; // 获取指定数量条帖子记录

// 文章-评论
export const GET_POST_COMMENTS_PAGE = ApiBase + "/comment/open/getCommentsPage";
export const GET_POST_COMMENTS_ALL = ApiBase + "/comment/open/getCommentsAll";
export const GET_POST_SUB_COMMENTS_ALL = ApiBase + "/comment/open/getPostSubCommentsAll";
export const GET_POST_SUB_COMMENTS_PAGE = ApiBase + "/comment/open/getPostSubCommentsPage";
export const CREATE_POST_COMMENT = ApiBase + "/comment/createComment";
export const DELETE_POST_COMMENT = ApiBase + "/comment/deleteComment";
export const SET_POST_COMMENT_LIKE = ApiBase + "/comment/setLike";
export const CANCEL_POST_COMMENT_LIKE = ApiBase + "/comment/cancelLike";

// 笔记
export const CREATE_NOTE = ApiBase + "/note/create"; // 创建笔记
export const LIST_NOTE = ApiBase + "/note/open/list"; // 笔记列表
export const GET_NOTE = ApiBase + "/note/open/get"; // 笔记详情
export const UPDATE_NOTE = ApiBase + "/note/update"; // 笔记修改
export const CREATE_NOTE_CHAPTER = ApiBase + "/noteChapter/create"; // 创建章节
export const LIST_NOTE_CHAPTER = ApiBase + "/noteChapter/open/list"; // 章节列表
export const GET_NOTE_CHAPTER = ApiBase + "/noteChapter/open/get"; // 章节详情
export const UPDATE_NOTE_CHAPTER = ApiBase + "/noteChapter/update"; // 章节修改
export const DELETE_NOTE_CHAPTER = ApiBase + "/noteChapter/delete"; // 章节删除

// 用户
export const GET_AUTH_ROUTES = ApiBase + "/user/open/getAuthRoutes"; // 获取权限路由
export const GET_CURRENT_USER = ApiBase + "/user/getCurrentUser"; // 获取当前登录用户信息
export const GET_USER_LIST = ApiBase + "/user/open/list"; // 用户列表
export const GET_USER_DETAIL = ApiBase + "/user/detail"; // 用户列表
export const SET_USER_FOLLOW = ApiBase + "/user/follow"; // 关注用户
export const CANCEL_USER_FOLLOW = ApiBase + "/user/unfollow"; // 取关用户
export const GET_FOLLOW_LIST = ApiBase + "/user/open/followList"; // 获取用户关注列表
export const GET_FANS_LIST = ApiBase + "/user/open/fansList"; // 获取用户关注列表
export const SAVE_BASIC_INFO = ApiBase + "/user/saveBasicInfo"; // 修改用户信息
export const SAVE_HOMEPAGE = ApiBase + "/user/saveHomepage"; // 修改个人主页信息
export const SAVE_TELEPHONE = ApiBase + "/user/saveTelephone"; // 修改手机号
export const SAVE_PASSWORD = ApiBase + "/user/savePassword"; // 修改密码
export const SAVE_EMAIL = ApiBase + "/user/saveEmail"; // 修改邮箱
export const GET_PROFILE_MENU = ApiBase + "/user/open/getProfileMenu"; // 获取主页菜单信息
export const SET_PROFILE_MENU = ApiBase + "/user/setProfileMenu"; // 设置主页菜单信息
export const GET_USER_DYNAMICS = ApiBase + "/user/open/getDynamics"; // 获取用户动态

// 时刻
export const MOMENT_CREATE = ApiBase + "/moment/create"; // 创建时刻
export const MOMENT_UPDATE = ApiBase + "/moment/update"; // 更新时刻
export const MOMENT_DELETE = ApiBase + "/moment/delete"; // 删除时刻
export const MOMENT_LIST = ApiBase + "/moment/open/list"; // 时刻列表
export const MOMENT_LIST_FOLLOWING = ApiBase + "/moment//list/following"; // 时刻列表(关注的)
export const GET_MOMENT = ApiBase + "/moment/open/get"; // 时刻列表
export const GET_MOMENT_USER_DETAIL = ApiBase + "/moment/open/getMomentUserDetailById"; // 获取时刻用户详情
export const CREATE_MOMENT_COMMENT = ApiBase + "/momentComment/create"; // 发表评论
export const LIST_MOMENT_COMMENT_PAGE = ApiBase + "/momentComment/open/listMomentCommentPage"; // 获取评论列表(分页，默认第一页)
export const LIST_MOMENT_COMMENT_ALL = ApiBase + "/momentComment/open/listMomentCommentAll"; // 获取评论列表(全部，不分页)
export const LIST_MOMENT_REPLY_PAGE = ApiBase + "/momentComment/open/listMomentReplyPage"; // 获取评论的回复列表(分页，默认第一页)
export const DELETE_MOMENT_COMMENT = ApiBase + "/momentComment/delete"; // 删除评论
export const SET_MOMENT_LIKE = ApiBase + "/momentLike/setMomentLike"; // 点赞时刻
export const IS_MOMENT_LIKE = ApiBase + "/momentLike/isMomentLike"; // 是否点赞
export const CANCEL_MOMENT_LIKE = ApiBase + "/momentLike/cancelMomentLike"; // 取消点赞
export const SET_MOMENT_COMMENT_LIKE = ApiBase + "/momentCommentLike/setMomentCommentLike"; // 评论点赞
export const CANCEL_MOMENT_COMMENT_LIKE = ApiBase + "/momentCommentLike/cancelMomentCommentLike"; // 取消评论点赞

// 邮件
export const SEND_EMAIL_CODE = ApiBase + "/mail/open/sendRegisterCode"; // 获取邮箱验证码

// 分类
export const CATEGORY_LIST = ApiBase + "/category/open/list"; //

// 专栏
export const GET_COLUMN_LIST = ApiBase + "/column/open/list"; //专栏列表
export const GET_COLUMN_DETAIL = ApiBase + "/column/open/get"; //专栏详情
export const ADD_COLUMN = ApiBase + "/column/add"; //专栏列表
export const UPDATE_COLUMN = ApiBase + "/column/update"; //专栏列表
export const DELETE_COLUMN = ApiBase + "/column/delete"; //删除专栏
export const GET_COLUMN_POSTS = ApiBase + "/column/open/getColumnPosts"; //专栏文章列表
export const SET_COLUMN_IS_TOP = ApiBase + "/column/setColumnIsTop"; //设置专栏置顶状态

// oss
export const OSS_POLICY = ApiBase + "/oss/policy"; //
export const OSS_STS = ApiBase + "/oss/sts"; //

// 短信
export const MESSAGE_SEND = ApiBase + "/sms/open/send"; // 发送验证码
export const MESSAGE_VERIFY = ApiBase + "/sms/open/verify"; // 发送验证码


