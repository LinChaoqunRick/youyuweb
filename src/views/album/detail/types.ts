import type { UploadResult } from '@/components/common/utils/upload/types';

export interface AlbumImageItem extends UploadResult {
  id: number;
  url: string;
  originUrl: string;
  name: string;
  size: number;
  createTime: string;
}
