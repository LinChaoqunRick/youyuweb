import http from "@/network/https";
import {
  GET_USER_LIST,
  GET_USER_BY_ID,
  GET_LIMIT_POST,
  GET_COLUMN_LIST,
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
  SET_PROFILE_MENU
} from "@/network/apis";

export default {
  actions: {
    getUserList(state: any, params: object) {
      return http.get(GET_USER_LIST, params);
    },
    getPostUserById(state: any, params: object) {
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
  },
}
