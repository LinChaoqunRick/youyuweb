export interface Logs {
  id: number;
  userId: number;
  name: string;
  type: number;
  ip: string;
  path: string;
  method: string;
  adcode: string;
  status: number;
  duration: number;
  requestData: string;
  responseData: string;
  result: number;
  error: string;
  createTime: string;
  updateTime: string;
  target?: string;
  content?: string;
  requestDataObject?: Record<string, any>;
  responseDataObject?: Record<string, any>;
}
