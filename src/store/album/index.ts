import http from "@/network/https";
import {
  GET_ALBUM_LIST,
  GET_ALBUM_DETAIL,
  CREATE_ALBUM,
  UPDATE_ALBUM,
  REMOVE_ALBUM,
  GET_ALBUM_IMAGE_LIST,
  GET_ALBUM_IMAGE_DETAIL,
  CREATE_ALBUM_IMAGE,
  UPDATE_ALBUM_IMAGE,
  REMOVE_ALBUM_IMAGE,
} from "@/network/apis";

export default {
  actions: {
    getAlbumList(context: any, params: object) {
      return http.get(GET_ALBUM_LIST, params);
    },
    getAlbumDetail(context: any, params: object) {
      return http.get(GET_ALBUM_DETAIL, params);
    },
    createAlbum(context: any, params: object) {
      return http.post(CREATE_ALBUM, params);
    },
    updateAlbum(context: any, params: object) {
      return http.post(UPDATE_ALBUM, params);
    },
    removeAlbum(context: any, params: object) {
      return http.post(REMOVE_ALBUM, params);
    },
    getAlbumImageList(context: any, params: object) {
      return http.get(GET_ALBUM_IMAGE_LIST, params);
    },
    getAlbumImageDetail(context: any, params: object) {
      return http.get(GET_ALBUM_IMAGE_DETAIL, params);
    },
    createAlbumImage(context: any, params: object) {
      return http.post(CREATE_ALBUM_IMAGE, params);
    },
    updateAlbumImage(context: any, params: object) {
      return http.post(UPDATE_ALBUM_IMAGE, params);
    },
    removeAlbumImage(context: any, params: object) {
      return http.post(REMOVE_ALBUM_IMAGE, params);
    },
  },
};
