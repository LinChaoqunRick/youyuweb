import type { UserBasic } from '../common';

export interface Album {
  id: number;
  name: string;
  userId: number;
  authorizedUsers: string[];
  coverImageId: number;
  content: string;
  cover?: string;
  subscribeCount: number;
  likeCount: number;
  open: number;
  createTime: string;
  updateTime: string;
}

export interface AlbumVo extends Album {
  imageCount: number;
  userInfo: UserBasic;
  authorizedUserList: UserBasic[];
}

export interface AlbumImage {
  id: number;
  albumId: number;
  name: string;
  path: string;
  content: string;
  size: number;
  open: string;
  likeCount: number;
  createTime: string;
  updateTime: string;
}

export interface AlbumImageVo extends AlbumImage {
  url: string;
  originUrl: string;
}
