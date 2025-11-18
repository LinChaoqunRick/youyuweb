import type { UserBasic } from '../common';

export interface PostVo {
  id: number;
  userId: number;
  user: UserBasic;
  title: string;
  content: string;
  categoryId?: number | null;
  categoryName?: string;
  tags?: string[] | string;
  thumbnail: string[];
  viewCount: number;
  likeCount: number;
  summary: string;
  createType: string;
  originalLink?: string;
  postLike: number;
  commentCount: number;
  collectCount: number;
  postCollect: number;
  status: string | number;
  columnIds?: string | null;
  columns: ColumnVo[];
  createTime: string;
  updateTime: string;
}

export interface ColumnVo {
  id: number;
  userId: number;
  user: UserBasic;
  title: string;
  content: string;
  cover: string;
  isTop?: string;
  postNum?: number;
  subscribe: number;
  subscriberNum?: number;
  createTime?: string;
  updateTime?: string;
}
