import {
  GET_POST_LIST,
  GET_POST_DETAIL,
  CATEGORY_LIST,
  GET_POST_COMMENTS_PAGE,
  GET_POST_COMMENTS_ALL,
  GET_POST_SUB_COMMENTS_ALL,
  GET_POST_SUB_COMMENTS_PAGE,
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  IS_POST_LIKE,
  SET_POST_LIKE,
  CANCEL_POST_LIKE,
  GET_CREATE_TYPES,
  CREATE_POST,
  GET_POST_EDIT_DETAIL,
  UPDATE_POST,
  DELETE_POST,
  SET_POST_COMMENT_LIKE,
  CANCEL_POST_COMMENT_LIKE,
  SET_POST_COLLECT,
  GET_POST_COLLECT_INFO,
  CANCEL_POST_COLLECT,
  OSS_POLICY,
  OSS_STS,
  HIDE_POST,
} from '@youyu/shared/apis';
import http from '@youyu/shared/network';

export default {
  actions: {
    getPostList(context: any, params: any) {
      return http.post(GET_POST_LIST, params);
    },
    getPostDetail(context: any, params: any) {
      // return http.post(GET_POST_DETAIL, params, {headers: {'content-type': "application/x-www-form-urlencoded"}});
      return http.get(GET_POST_DETAIL, params);
    },
    getCategoryList(context: any, params: any) {
      return http.get(CATEGORY_LIST, params);
    },
    getCommentsPage(context: any, params: any) {
      return http.get(GET_POST_COMMENTS_PAGE, params);
    },
    getCommentsAll(context: any, params: any) {
      return http.get(GET_POST_COMMENTS_ALL, params);
    },
    getPostSubCommentsAll(context: any, params: any) {
      return http.get(GET_POST_SUB_COMMENTS_ALL, params);
    },
    getSubCommentsPage(context: any, params: any) {
      return http.get(GET_POST_SUB_COMMENTS_PAGE, params);
    },
    createComment(context: any, params: any) {
      return http.post(CREATE_POST_COMMENT, params);
    },
    deleteComment(context: any, params: any) {
      return http.post(DELETE_POST_COMMENT, params);
    },
    setPostLike(context: any, params: any) {
      return http.post(SET_POST_LIKE, params);
    },
    isPostLike(context: any, params: any) {
      return http.post(IS_POST_LIKE, params);
    },
    cancelPostLike(context: any, params: any) {
      return http.post(CANCEL_POST_LIKE, params);
    },
    getCreateTypes(context: any, params: any) {
      return http.get(GET_CREATE_TYPES, params);
    },
    createPost(context: any, params: any) {
      return http.post(CREATE_POST, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    getPostEditDetail(context: any, params: any) {
      return http.get(GET_POST_EDIT_DETAIL, params);
    },
    updatePost(context: any, params: any) {
      return http.post(UPDATE_POST, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    deletePost(context: any, params: any) {
      return http.post(DELETE_POST, params);
    },
    setCommentLike(context: any, params: any) {
      return http.post(SET_POST_COMMENT_LIKE, params);
    },
    cancelCommentLike(context: any, params: any) {
      return http.post(CANCEL_POST_COMMENT_LIKE, params);
    },
    setPostCollect(context: any, params: any) {
      return http.post(SET_POST_COLLECT, params);
    },
    getPostCollectInfo(context: any, params: any) {
      return http.post(GET_POST_COLLECT_INFO, params);
    },
    cancelPostCollect(context: any, params: any) {
      return http.post(CANCEL_POST_COLLECT, params);
    },
    hidePost(context: any, params: any) {
      return http.get(HIDE_POST, params);
    },

    getOssPolicy(context: any, params: any) {
      return http.get(OSS_POLICY, params);
    },
    getOssSts(context: any, params: any) {
      return http.get(OSS_STS, params);
    },
  },
};
