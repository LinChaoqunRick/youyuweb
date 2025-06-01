import type { User } from '@/types/user';

export interface note {
  id: number | null;
  name: string;
  userId: number | null;
  introduce: string;
  cover: string;
  type: string;
  createTime: string;
  updateTime: string;
}

export interface chapter {
  id: number;
  noteId: number;
  parentId: number;
  userIds: string;
  title: string;
  content: string;
  viewCount: number;
  createTime: string;
  updateTime: string;
  user: User | null;
}
