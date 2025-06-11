import type { User } from '@/types/user';
import type { Column } from '@/views/user/profile/column/type';

export interface Post {
  id: number | string;
  userId: number | null;
  user?: User | null;
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
  columns: Column[];
  createTime: string;
  updateTime: string;
}

export interface PostCollect {
  postId: number;
  userId: number;
  userIdTo: number;
  favoritesId: string;
}
