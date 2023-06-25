import http from "@/network/https";
import {
  MOMENT_CREATE,
  MOMENT_DELETE,
  MOMENT_LIST,
  CREATE_MOMENT_COMMENT,
  GET_REPLIES_BY_COMMENT_ID,
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
    getRepliesByCommentId(state: any, params: object) {
      return http.post(GET_REPLIES_BY_COMMENT_ID, params);
    },
    deleteMomentComment(state: any, params: object) {
      return http.post(DELETE_MOMENT_COMMENT, params);
    },
  }
}
