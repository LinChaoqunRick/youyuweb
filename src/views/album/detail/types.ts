import type { UploadResult } from '@/components/common/utils/upload/types';

export interface AlbumImageItem extends UploadResult {
  id: number;
  url: string;
  originUrl: string | undefined;
  name: string;
  size: number;
  createTime: string;
}

export interface AlbumDetailData {
  id: number;
  userId: number;
  name: string;
  open: number;
  authorizedUsers: string;
  authorizedUserList: BasicUserInfo[] | null;
  content: string;
  cover: string;
  createTime: string;
  likeCount: number;
  imageCount: number;
  subscribeCount: number;
  userInfo: BasicUserInfo;
}

export interface BasicUserInfo {
  id: number;
  avatar: string;
  follow: boolean;
  level: number;
  nickname: string;
  sex: number;
  signature: string;
}
