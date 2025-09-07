import type { BasicUserInfo } from '@/views/album/detail/types';

export interface Barrage {
  id?: number;
  avatar: string;
  nickname: string;
  email?: string;
  home?: string;
  content: string;
  trackId?: number,
  y?: number;
  userId?: number;
  userInfo?: BasicUserInfo;
}

export interface Message {
  id: number;
  rootId: number;
  userId: number;
  userIdTo: number;
  nickname: string;
  email: string;
  avatar: string;
  content: string;
  adcode: number;
  supportCount: number;
  opposeCount: number;
  createTime: string;
  updateTime: string;
  adname: string;
  userInfo: BasicUserInfo;
}
