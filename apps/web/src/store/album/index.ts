import http from '@/network/https';
import {
  GET_ALBUM_LIST,
  GET_ALBUM_DETAIL,
  GET_ALBUM_ACCESSIBLE,
  CREATE_ALBUM,
  UPDATE_ALBUM,
  REMOVE_ALBUM,
  GET_ALBUM_OSS_POLICY,
  GET_ALBUM_IMAGE_LIST,
  GET_ALBUM_IMAGE_DETAIL,
  CREATE_ALBUM_IMAGE,
  UPDATE_ALBUM_IMAGE,
  REMOVE_ALBUM_IMAGE,
  GET_ALBUM_IMAGE_ORIGIN,
  GET_MINE_ALBUM_LIST,
  SET_ALBUM_COVER,
} from '@youyu/shared/apis';

export default {
  actions: {
    getAlbumList(context: any, params: object) {
      return http.get(GET_ALBUM_LIST, params);
    },
    getMineAlbumList(context: any, params: object) {
      return http.get(GET_MINE_ALBUM_LIST, params);
    },
    getAlbumDetail(context: any, params: object) {
      return http.get(GET_ALBUM_DETAIL, params);
    },
    getAlbumAccessible(context: any, params: object) {
      return http.get(GET_ALBUM_ACCESSIBLE, params);
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
    getAlbumOssPolicy(context: any, params: object) {
      return http.post(GET_ALBUM_OSS_POLICY, params);
    },
    getAlbumImageList(context: any, params: object) {
      return http.get(GET_ALBUM_IMAGE_LIST, params);
    },
    getAlbumImageDetail(context: any, params: object) {
      return http.get(GET_ALBUM_IMAGE_DETAIL, params);
    },
    createAlbumImage(context: any, params: object) {
      return http.post(CREATE_ALBUM_IMAGE, params, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    updateAlbumImage(context: any, params: object) {
      return http.post(UPDATE_ALBUM_IMAGE, params);
    },
    removeAlbumImage(context: any, params: object) {
      return http.post(REMOVE_ALBUM_IMAGE, params);
    },
    getAlbumImageOrigin(context: any, params: object) {
      return http.post(GET_ALBUM_IMAGE_ORIGIN, params);
    },
    setAlbumCover(context: any, params: object) {
      return http.post(SET_ALBUM_COVER, params);
    },
  },
};
