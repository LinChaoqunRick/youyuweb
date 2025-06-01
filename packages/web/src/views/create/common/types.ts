export interface PreSetCover {
  url: string;
  selected: boolean;
}

export interface CreateType {
  code: string | number;
  desc: string;
}

export interface Category {
  id: number,
  name: string,
  title: string,
  pid: number,
  description: string,
  status: string | number,
  children: Array<Category>,
}
