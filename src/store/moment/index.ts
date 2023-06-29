import http from "@/network/https";
import {
  MOMENT_CREATE,
  MOMENT_DELETE,
  MOMENT_LIST,
  CREATE_MOMENT_COMMENT,
  LIST_MOMENT_COMMENT_PAGE,
  LIST_MOMENT_COMMENT_ALL,
  LIST_MOMENT_REPLY_PAGE,
  DELETE_MOMENT_COMMENT
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
  }
}
