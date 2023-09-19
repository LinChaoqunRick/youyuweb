import type {userType} from "@/types/user";

export interface momentType {
  id: number,
  userId: number,
  content: string,
  mood: number,
  topicId: number,
  images: string,
  createTime: string,
  updateTime: string,
  userInfo: userType
}

export interface momentListType {

}
