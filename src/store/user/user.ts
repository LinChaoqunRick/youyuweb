import http from "@/network/https";
import {
  GET_USER_BY_ID,
  GET_LIMIT_POST,
  GET_COLUMN_LIST,
  GET_POST_COLLECT_LIST,
  SET_USER_FOLLOW,
  CANCEL_USER_FOLLOW,

} from "@/network/apis";

export default {
  actions: {
    getUserById(state: any, params: object) {
      return http.get(GET_USER_BY_ID, params);
    },
    getLimitPost(state: any, params: object) {
      return http.get(GET_LIMIT_POST, params);
    },
    getColumnList(state: any, params: object) {
      return http.get(GET_COLUMN_LIST, params);
    },
    getPostCollectList(state: any, params: object) {
      return http.post(GET_POST_COLLECT_LIST, params);
    },
    setUserFollow(state: any, params: object) {
      return http.post(SET_USER_FOLLOW, params);
    },
    cancelUserFollow(state: any, params: object) {
      return http.post(CANCEL_USER_FOLLOW, params);
    },

  },
}
