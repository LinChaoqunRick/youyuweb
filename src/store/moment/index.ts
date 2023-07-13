import http from "@/network/https";
import {
  MOMENT_CREATE,
  MOMENT_DELETE,
  MOMENT_LIST,
  GET_MOMENT,
  GET_MOMENT_USER_DETAIL,
  CREATE_MOMENT_COMMENT,
  LIST_MOMENT_COMMENT_PAGE,
  LIST_MOMENT_COMMENT_ALL,
  LIST_MOMENT_REPLY_PAGE,
  DELETE_MOMENT_COMMENT,
  SET_MOMENT_LIKE,
  IS_MOMENT_LIKE,
  CANCEL_MOMENT_LIKE,
  SET_MOMENT_COMMENT_LIKE,
  CANCEL_MOMENT_COMMENT_LIKE,
} from "@/network/apis";

export default {
  actions: {
    createMoment(state: any, params: object) {
      return http.post(MOMENT_CREATE, params);
    },
    deleteMoment(state: any, params: object) {
      return http.post(MOMENT_DELETE, params);
    },
    momentList(state: any, params: object) {
      return http.post(MOMENT_LIST, params);
    },
    getMoment(state: any, params: object) {
      return http.post(GET_MOMENT, params);
    },
    getMomentUserDetail(state: any, params: object) {
      return http.post(GET_MOMENT_USER_DETAIL, params);
    },
    createMomentComment(state: any, params: object) {
      return http.post(CREATE_MOMENT_COMMENT, params);
    },
    listMomentCommentPage(state: any, params: object) {
      return http.post(LIST_MOMENT_COMMENT_PAGE, params);
    },
    listMomentCommentAll(state: any, params: object) {
      return http.post(LIST_MOMENT_COMMENT_ALL, params);
    },
    listMomentReplyPage(state: any, params: object) {
      return http.post(LIST_MOMENT_REPLY_PAGE, params);
    },
    deleteMomentComment(state: any, params: object) {
      return http.post(DELETE_MOMENT_COMMENT, params);
    },
    setMomentLike(state: any, params: object) {
      return http.post(SET_MOMENT_LIKE, params);
    },
    isMomentLike(state: any, params: object) {
      return http.post(IS_MOMENT_LIKE, params);
    },
    cancelMomentLike(state: any, params: object) {
      return http.post(CANCEL_MOMENT_LIKE, params);
    },
    setMomentCommentLike(state: any, params: object) {
      return http.post(SET_MOMENT_COMMENT_LIKE, params);
    },
    cancelMomentCommentLike(state: any, params: object) {
      return http.post(CANCEL_MOMENT_COMMENT_LIKE, params);
    },
  }
}
