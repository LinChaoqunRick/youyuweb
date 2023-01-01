import http from "@/network/https";
import {
  GET_POST_LIST,
  GET_POST_DETAIL,
  HELLO_TEST1,
  CATEGORY_LIST
} from "@/network/apis";

export default {
  actions: {
    getPostList(state, params) {
      return http.get(GET_POST_LIST, params);
    },
    getArticleDetail(state, params) {
      // return http.post(GET_POST_DETAIL, params, {headers: {'content-type': "application/x-www-form-urlencoded"}});
      return http.post(GET_POST_DETAIL, params);
    },
    getCategoryList(state, params) {
      return http.get(CATEGORY_LIST, params);
    },
    helloTest1(state, params){
      return http.post(HELLO_TEST1, params)
    }
  },
}
