import type { User } from '@/types/user';

export interface Column {
  id?: number;
  userId?: number;
  user?: User;
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
