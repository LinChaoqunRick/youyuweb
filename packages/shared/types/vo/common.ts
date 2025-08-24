export interface AreaItem {
  name: string;
  fullName: string;
  lng: number;
  lat: number;
}

export interface PageResult<T> {
  list: T[];
  current: number;
  pages: number;
  size: number;
  total: number;
}
