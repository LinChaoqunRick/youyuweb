import http from "@/network/https";
import {
  GET_ARTICLE_LIST,
  GET_ARTICLE_DETAIL
} from "@/network/apis";

export default {
  actions: {
    getArticleList(state, params) {
      return http.post(GET_ARTICLE_LIST, params);
    },
    getArticleDetail(state, params) {
      return http.post(GET_ARTICLE_DETAIL, params, {headers: {'content-type': "application/x-www-form-urlencoded"}});
    }
  },
}
