import http from "@/network/https";
import {
  GET_ARTICLE_LIST
} from "@/network/apis";

export default {
  actions: {
    getArticleList(state: any, params: object) {
      return http.post(GET_ARTICLE_LIST, params);
    }
  },
}
