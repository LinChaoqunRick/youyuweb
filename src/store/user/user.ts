import http from "@/network/https";
import {
  GET_USER_LIST,
  GET_POST_USER_DETAIL,
  GET_LIMIT_POST,
  GET_COLUMN_LIST,
  GET_COLUMN_DETAIL,
  ADD_COLUMN,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  GET_COLUMN_POSTS,
  SET_COLUMN_IS_TOP,
  GET_POST_COLLECT_LIST,
  SET_USER_FOLLOW,
  CANCEL_USER_FOLLOW,
  GET_FOLLOW_LIST,
  GET_FANS_LIST,
  SAVE_BASIC_INFO,
  SAVE_HOMEPAGE,
  SAVE_TELEPHONE,
  SAVE_PASSWORD,
  SAVE_EMAIL,
  GET_PROFILE_MENU,
  SET_PROFILE_MENU,
  GET_USER_DYNAMICS
} from "@/network/apis";

export default {
  actions: {
    getUserList(state: any, params: object) {
      return http.get(GET_USER_LIST, params);
    },
    getPostUserById(state: any, params: object) {
      return http.get(GET_POST_USER_DETAIL, params);
    },
    getLimitPost(state: any, params: object) {
      return http.get(GET_LIMIT_POST, params);
    },
    getColumnList(state: any, params: object) {
      return http.get(GET_COLUMN_LIST, params);
    },
    getColumnDetail(state: any, params: object) {
      return http.get(GET_COLUMN_DETAIL, params);
    },
    addColumn(state: any, params: object) {
      return http.post(ADD_COLUMN, params);
    },
    updateColumn(state: any, params: object) {
      return http.post(UPDATE_COLUMN, params);
    },
    deleteColumn(state: any, params: object) {
      return http.post(DELETE_COLUMN, params);
    },
    getColumnPosts(state: any, params: object) {
      return http.post(GET_COLUMN_POSTS, params);
    },
    setColumnIsTop(state: any, params: object) {
      return http.post(SET_COLUMN_IS_TOP, params);
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
    getFollowList(state: any, params: object) {
      return http.post(GET_FOLLOW_LIST, params);
    },
    getFansList(state: any, params: object) {
      return http.post(GET_FANS_LIST, params);
    },
    saveBasicInfo(state: any, params: object) {
      return http.post(SAVE_BASIC_INFO, params);
    },
    saveHomepage(state: any, params: object) {
      return http.post(SAVE_HOMEPAGE, params);
    },
    saveTelephone(state: any, params: object) {
      return http.post(SAVE_TELEPHONE, params);
    },
    savePassword(state: any, params: object) {
      return http.post(SAVE_PASSWORD, params);
    },
    saveEmail(state: any, params: object) {
      return http.post(SAVE_EMAIL, params);
    },
    getProfileMenu(state: any, params: object) {
      return http.post(GET_PROFILE_MENU, params);
    },
    setProfileMenu(state: any, params: object) {
      return http.post(SET_PROFILE_MENU, params);
    },
    getUserDynamics(state: any, params: object) {
      return http.post(GET_USER_DYNAMICS, params);
    },
  },
}
