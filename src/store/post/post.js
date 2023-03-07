import http from "@/network/https";
import {
  GET_POST_LIST,
  GET_POST_DETAIL,
  CATEGORY_LIST,
  GET_COMMENTS_PAGE,
  GET_COMMENTS_ALL,
  GET_SUB_COMMENTS_ALL,
  CREATE_COMMENT,
  DELETE_COMMENT,
  IS_POST_LIKE,
  SET_POST_LIKE,
  CANCEL_POST_LIKE,
  GET_CREATE_TYPES,
  CREATE_POST,
  GET_POST_EDIT_DETAIL,
  UPDATE_POST,
  SET_COMMENT_LIKE,
  CANCEL_COMMENT_LIKE,

  OSS_POLICY,
  OSS_STS,
} from "@/network/apis";

export default {
  actions: {
    getPostList(state, params) {
      return http.get(GET_POST_LIST, params);
    },
    getPostDetail(state, params) {
      // return http.post(GET_POST_DETAIL, params, {headers: {'content-type': "application/x-www-form-urlencoded"}});
      return http.get(GET_POST_DETAIL, params);
    },
    getCategoryList(state, params) {
      return http.get(CATEGORY_LIST, params);
    },
    getCommentsPage(state, params) {
      return http.get(GET_COMMENTS_PAGE, params);
    },
    getCommentsAll(state, params) {
      return http.get(GET_COMMENTS_ALL, params);
    },
    getSubCommentsAll(state, params) {
      return http.get(GET_SUB_COMMENTS_ALL, params);
    },
    createComment(state, params) {
      return http.post(CREATE_COMMENT, params);
    },
    deleteComment(state, params) {
      return http.post(DELETE_COMMENT, params);
    },
    setPostLike(state, params) {
      return http.post(SET_POST_LIKE, params);
    },
    isPostLike(state, params) {
      return http.get(IS_POST_LIKE, params);
    },
    cancelPostLike(state, params) {
      return http.get(CANCEL_POST_LIKE, params);
    },
    getCreateTypes(state, params) {
      return http.get(GET_CREATE_TYPES, params);
    },
    createPost(state, params) {
      return http.post(CREATE_POST, params, {headers: {'Content-Type': 'application/json'}});
    },
    getPostEditDetail(state, params) {
      return http.get(GET_POST_EDIT_DETAIL, params);
    },
    updatePost(state, params) {
      return http.post(UPDATE_POST, params, {headers: {'Content-Type': 'application/json'}});
    },
    setCommentLike(state, params) {
      return http.post(SET_COMMENT_LIKE, params);
    },
    cancelCommentLike(state, params) {
      return http.post(CANCEL_COMMENT_LIKE, params);
    },


    getOssPolicy(state, params) {
      return http.get(OSS_POLICY, params);
    },
    getOssSts(state, params) {
      return http.get(OSS_STS, params);
    },
  },
}
