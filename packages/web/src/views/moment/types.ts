import type { User } from '@/types/user';

export interface momentType {
  id: number;
  userId: number;
  content: string;
  mood: number;
  topicId: number;
  images: string | null;
  createTime: string;
  updateTime: string;
  userInfo: User;
}

export interface momentListType extends momentType {
  momentLike: object | null;
  user: User;
  commentCount: number;
  supportCount: number;
  likeUsers: User[];
  longitude: string;
  latitude: string;
  location: string;
  adname: string;
}
