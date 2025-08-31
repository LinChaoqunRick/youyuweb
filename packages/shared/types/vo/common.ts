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
