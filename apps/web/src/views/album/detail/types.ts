import type { UploadResult } from '@/components/common/utils/upload/types';
import type { UserBasic } from '@youyu/shared/types/common';

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
  authorizedUserList: UserBasic[] | null;
  content: string;
  cover: string;
  coverImageId: number;
  createTime: string;
  likeCount: number;
  imageCount: number;
  subscribeCount: number;
  userInfo: UserBasic;
}
