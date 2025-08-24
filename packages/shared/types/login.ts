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
