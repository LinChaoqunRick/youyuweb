export interface FileExtend extends File {
  thumb?: string;
  progress: number;
}

export interface UploadResult {
  url: string;
  path: string;
  file: FileExtend;
}

export interface OssType {
  policy?: string;
  signature?: string;
  OSSAccessKeyId?: string;
  dir?: string;
  host?: string;
}

export interface Policy {
  policy: string;
  signature: string;
  accessKeyId: string;
  key: string;
  dir: string;
  host: string;
  success_action_status: string;
}

export interface UploadConfig {
  accept?: string;
  maxSize?: number;
  needTip?: boolean;
  base?: string;
  progress?: Function;
}
