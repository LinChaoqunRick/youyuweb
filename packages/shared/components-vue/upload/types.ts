export interface FileExtend extends Partial<File> {
  thumb?: string;
  progress?: number;
  url?: string;
  originFileObj?: File;
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
