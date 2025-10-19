import {
  MOMENT_CREATE,
  MOMENT_UPDATE,
  MOMENT_DELETE,
  MOMENT_LIST,
  MOMENT_LIST_FOLLOWING,
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
} from '@youyu/shared/apis';
import http from '@youyu/shared/network';

export default {
  actions: {
    createMoment(context: any, params: object) {
      return http.post(MOMENT_CREATE, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    updateMoment(context: any, params: object) {
      return http.post(MOMENT_UPDATE, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    deleteMoment(context: any, params: object) {
      return http.post(MOMENT_DELETE, params);
    },
    momentList(context: any, params: object) {
      return http.post(MOMENT_LIST, params);
    },
    momentListFollowing(context: any, params: object) {
      return http.post(MOMENT_LIST_FOLLOWING, params);
    },
    getMoment(context: any, params: object) {
      return http.post(GET_MOMENT, params);
    },
    getMomentUserDetail(context: any, params: object) {
      return http.post(GET_MOMENT_USER_DETAIL, params);
    },
    createMomentComment(context: any, params: object) {
      return http.post(CREATE_MOMENT_COMMENT, params);
    },
    listMomentCommentPage(context: any, params: object) {
      return http.post(LIST_MOMENT_COMMENT_PAGE, params);
    },
    listMomentReplyPage(context: any, params: object) {
      return http.post(LIST_MOMENT_REPLY_PAGE, params);
    },
    deleteMomentComment(context: any, params: object) {
      return http.post(DELETE_MOMENT_COMMENT, params);
    },
    setMomentLike(context: any, params: object) {
      return http.post(SET_MOMENT_LIKE, params);
    },
    isMomentLike(context: any, params: object) {
      return http.post(IS_MOMENT_LIKE, params);
    },
    cancelMomentLike(context: any, params: object) {
      return http.post(CANCEL_MOMENT_LIKE, params);
    },
    setMomentCommentLike(context: any, params: object) {
      return http.post(SET_MOMENT_COMMENT_LIKE, params);
    },
    cancelMomentCommentLike(context: any, params: object) {
      return http.post(CANCEL_MOMENT_COMMENT_LIKE, params);
    },
  },
};
