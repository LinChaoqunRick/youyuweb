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
