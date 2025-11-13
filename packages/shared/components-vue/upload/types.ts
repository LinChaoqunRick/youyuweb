export interface FileExtend extends Partial<File> {
  name: string;
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

// export interface OssType {
//   policy?: string;
//   signature?: string;
//   OSSAccessKeyId?: string;
//   dir?: string;
//   host?: string;
// }

export interface OssPolicy {
  policy: string;
  signature: string;
  OSSAccessKeyId: string;
  key: string;
  dir: string;
  host: string;
  success_action_status: string;
}

export interface UploadConfig {
  data: UploadConfigData;
  accept?: string;
  maxSize?: number;
  needTip?: boolean;
  base?: string;
  progress?: (list: number[]) => void;
}

export interface UploadConfigData {
  base: string;
}
