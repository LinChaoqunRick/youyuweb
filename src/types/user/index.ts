export interface userType {
  username: string
  nickname: string,
  id: number,
  signature?: string,
  email?: string,
  birthday?: string,
  avatar: string,
  follow?: boolean,
  extraInfo?: object
}

export interface statType {
  value: string | number,
  label: string
}
