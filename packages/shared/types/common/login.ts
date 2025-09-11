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
  data: T
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
