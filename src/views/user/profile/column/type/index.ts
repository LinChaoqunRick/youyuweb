import type {userType} from "@/types/user";

export interface column {
  id?: number;
  userId?: number;
  user?: userType;
  title: string;
  content: string,
  cover: string;
  isTop?: string;
  createTime?: string;
  updateTime?: string;
}

