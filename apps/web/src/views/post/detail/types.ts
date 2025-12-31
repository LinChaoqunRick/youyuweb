import type { UserBasic } from '@youyu/shared/types/vo/common';

export interface PostCollect {
  postId: number;
  userId: number;
  userIdTo: number;
  favoritesId: string;
}

export interface ExtraAtom {
  value: string;
  label: string;
}

export interface PostUser extends UserBasic {
  extraInfo: ExtraAtom[];
}
