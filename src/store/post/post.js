import http from "@/network/https";
import {
  GET_POST_LIST,
  GET_POST_DETAIL,
  HELLO_TEST1,
  CATEGORY_LIST,
  GET_COMMENTS_PAGE,
  GET_COMMENTS_ALL,
  GET_SUB_COMMENTS_ALL,
  CREATE_COMMENT
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
      return http.get(CREATE_COMMENT, params);
    },


    helloTest1(state, params) {
      return http.post(HELLO_TEST1, params)
    }
  },
}
