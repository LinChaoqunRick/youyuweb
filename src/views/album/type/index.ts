import type { userType } from '@/types/user';

export interface AlbumType {
  id?: number,
  name?: string,
  userId?: number,
  authorizedUsers?: string,
  cover?: string,
  content?: string,
  subscribeCount?: number,
  likeCount?: number,
  open?: number,
  createTime?: string,
  updateTime?: string,
  userInfo?: userType
}
