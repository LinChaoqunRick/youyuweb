import { SMSTypes } from '../consts';
import type { Comment } from '../types/common';

export function getSMSTitle(code: number) {
  const item = SMSTypes[code];
  return item.name;
}

export function getCommentActorType(comment: Comment): number {
  const { userId } = comment;
  return userId && userId > -1 ? 0 : 1;
}
