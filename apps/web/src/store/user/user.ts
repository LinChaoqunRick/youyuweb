import {
  GET_USER_LIST,
  GET_USER_DETAIL,
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
  GET_USER_DYNAMICS,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  LIST_MESSAGE,
  GET_USER_DETAIL_BASIC,
  CREATE_FAVORITES,
  UPDATE_FAVORITES,
  DELETE_FAVORITES,
  LIST_FAVORITES,
  FAVORITES_POST_PAGE,
} from '@youyu/shared/apis';
import http from '@youyu/shared/network';

export default {
  actions: {
    getUserList(context: any, params: object) {
      return http.get(GET_USER_LIST, params);
    },
    getUserDetail(context: any, params: object) {
      return http.get(GET_USER_DETAIL, params);
    },
    getPostUserById(context: any, params: object) {
      return http.get(GET_POST_USER_DETAIL, params);
    },
    getLimitPost(context: any, params: object) {
      return http.get(GET_LIMIT_POST, params);
    },
    getColumnList(context: any, params: object) {
      return http.get(GET_COLUMN_LIST, params);
    },
    getColumnDetail(context: any, params: object) {
      return http.get(GET_COLUMN_DETAIL, params);
    },
    addColumn(context: any, params: object) {
      return http.post(ADD_COLUMN, params);
    },
    updateColumn(context: any, params: object) {
      return http.post(UPDATE_COLUMN, params);
    },
    deleteColumn(context: any, params: object) {
      return http.post(DELETE_COLUMN, params);
    },
    getColumnPosts(context: any, params: object) {
      return http.post(GET_COLUMN_POSTS, params);
    },
    setColumnIsTop(context: any, params: object) {
      return http.post(SET_COLUMN_IS_TOP, params);
    },
    getPostCollectList(context: any, params: object) {
      return http.post(GET_POST_COLLECT_LIST, params);
    },
    setUserFollow(context: any, params: object) {
      return http.post(SET_USER_FOLLOW, params);
    },
    cancelUserFollow(context: any, params: object) {
      return http.post(CANCEL_USER_FOLLOW, params);
    },
    getFollowList(context: any, params: object) {
      return http.post(GET_FOLLOW_LIST, params);
    },
    getFansList(context: any, params: object) {
      return http.post(GET_FANS_LIST, params);
    },
    saveBasicInfo(context: any, params: object) {
      return http.post(SAVE_BASIC_INFO, params);
    },
    saveHomepage(context: any, params: object) {
      return http.post(SAVE_HOMEPAGE, params);
    },
    saveTelephone(context: any, params: object) {
      return http.post(SAVE_TELEPHONE, params);
    },
    savePassword(context: any, params: object) {
      return http.post(SAVE_PASSWORD, params);
    },
    saveEmail(context: any, params: object) {
      return http.post(SAVE_EMAIL, params);
    },
    getProfileMenu(context: any, params: object) {
      return http.post(GET_PROFILE_MENU, params);
    },
    setProfileMenu(context: any, params: object) {
      return http.post(SET_PROFILE_MENU, params);
    },
    getUserDynamics(context: any, params: object) {
      return http.post(GET_USER_DYNAMICS, params);
    },
    createMessage(context: any, params: object) {
      return http.post(CREATE_MESSAGE, params);
    },
    deleteMessage(context: any, params: object) {
      return http.post(DELETE_MESSAGE, params);
    },
    listMessage(context: any, params: object) {
      return http.post(LIST_MESSAGE, params);
    },
    getUserDetailBasic(context: any, params: object) {
      return http.post(GET_USER_DETAIL_BASIC, params);
    },
    createFavorites(context: any, params: object) {
      return http.post(CREATE_FAVORITES, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    updateFavorites(context: any, params: object) {
      return http.post(UPDATE_FAVORITES, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    deleteFavorites(context: any, params: object) {
      return http.post(DELETE_FAVORITES, params);
    },
    listFavorites(context: any, params: object) {
      return http.post(LIST_FAVORITES, params);
    },
    favoritesPostPage(context: any, params: object) {
      return http.post(FAVORITES_POST_PAGE, params);
    },
  },
};
