import type { userType } from '@/types/user';

export interface momentType {
  id: number,
  userId: number,
  content: string,
  mood: number,
  topicId: number,
  images: string | null,
  createTime: string,
  updateTime: string,
  userInfo: userType
}

export interface momentListType extends momentType {
  momentLike: object | null,
  user: userType,
  commentCount: number,
  supportCount: number,
  likeUsers: userType[],
  longitude: string,
  latitude: string,
  location: string,
  adname: string,
}
