import http from "@/network/https";
import {
  GET_USER_BY_ID,
  GET_LIMIT_POST
} from "@/network/apis";

export default {
  actions: {
    getUserById(state: any, params: object) {
      return http.get(GET_USER_BY_ID, params);
    },
    getLimitPost(state: any, params: object) {
      return http.get(GET_LIMIT_POST, params);
    },

  },
}
