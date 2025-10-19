import type { BasicUserInfo } from '../common';

export interface Moment {
  id: number;
  userId: number;
  content: string;
  mood: string;
  topicId: number;
  images: string[];
  longitude: string;
  latitude: string;
  location: string;
  adcode: number;
  adname: string;
  supportCount: string;
  opposeCount: string;
  createTime: string;
  updateTime: string;
}

export interface MomentList extends Moment {
  user: BasicUserInfo;
  commentCount: number;
  momentLike: number;
  likeUsers: BasicUserInfo[];
}
