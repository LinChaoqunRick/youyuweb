import type { userType } from '@/types/user';

export interface Column {
  id: number;
  title: string;
  content: string;
  cover: string;
  isTop: number,
  createTime: string;
  postNum: number;
  subscriberNum: number;
  user: userType;
}
