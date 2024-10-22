import type { BasicUserInfo } from '@/views/album/detail/types';

export interface Message {
  id?: number;
  avatar: string;
  nickname: string;
  email?: string;
  home?: string;
  content: string;
  userId?: number;
  userInfo: BasicUserInfo
}
