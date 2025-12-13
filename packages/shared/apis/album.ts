import { ApiBase } from '../consts';

// 相册
export const GET_ALBUM_LIST = `${ApiBase}/album/open/list`;
export const GET_MINE_ALBUM_LIST = `${ApiBase}/album/mine/list`;
export const GET_ALBUM_DETAIL = `${ApiBase}/album/open/detail`;
export const CREATE_ALBUM = `${ApiBase}/album/create`;
export const UPDATE_ALBUM = `${ApiBase}/album/update`;
export const REMOVE_ALBUM = `${ApiBase}/album/remove`;
export const SET_ALBUM_COVER = `${ApiBase}/album/setCover`;
export const GET_ALBUM_OSS_POLICY = `${ApiBase}/album/oss/policy`;

// 相册照片
export const GET_ALBUM_IMAGE_PAGE = `${ApiBase}/albumImage/open/list`;
export const GET_ALBUM_IMAGE_DETAIL = `${ApiBase}/albumImage/detail`;
export const CREATE_ALBUM_IMAGE = `${ApiBase}/albumImage/create`;
export const UPDATE_ALBUM_IMAGE = `${ApiBase}/albumImage/update`;
export const REMOVE_ALBUM_IMAGE = `${ApiBase}/albumImage/remove`;
export const GET_ALBUM_IMAGE_ORIGIN = `${ApiBase}/albumImage/open/origin`;
