import { JSX } from 'react';

export interface MenuItem {
  key: string;
  label: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

export interface ResponseResult<T = any> {
  message: string;
  code: number;
  data: T;
}

export interface BasicUserInfo {
  id: number;
  avatar: string;
  follow: boolean;
  level: number;
  nickname: string;
  sex: number;
  signature: string;
}

export interface Visitor {
  id: number;
  nickname: string;
  avatar: string;
  email: string;
  homepage: string;
  adcode: number;
  adname: string;
  createTime: string;
  updateTime: string;
  deleted: number;
}

export interface Actor {
  id: number;
  nickname: string;
  avatar: string;
  sex: number;
  level: number;
  adcode: number;
  adname: string;
  signature: string;
  follow: boolean;
  type: number;
}

export interface Area {
  name: string;
  fullName: string;
  lng: number;
  lat: number;
}

export interface Nation {
  alpha2Code: string;
  alpha3Code: string;
  name: string;
  fullName: string;
}

export interface PageResult<T> {
  list: T[];
  current: number;
  pages: number;
  size: number;
  total: number;
}

export interface BasicVoProps {
  id: number;
  createTime: string;
  updateTime: string;
}

export interface Comment {
  id: number;
  postId: number;
  rootId: number;
  userId: number;
  userIdTo: number;
  replyId: number;
  content: string;
  supportCount: number;
  opposeCount: number;
  createTime: string;
  updateTime: string;
  replyCount: number;
  adcode: string;
  adname: string;
  actor: Actor;
  actorTo: Actor;
  commentLike: boolean;
  images: string;
  children: Comment[];
}
