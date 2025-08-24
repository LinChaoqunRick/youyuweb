export interface Logs {
  id: number;
  userId: number;
  name: string;
  type: number;
  ip: string;
  path: string;
  method: string;
  adcode: string;
  duration: number;
  requestData: string;
  responseData: string;
  result: number;
  error: string;
  createTime: string;
  updateTime: string;
}
