import { SMSTypes } from '../consts';

export function getSMSTitle(code: number) {
  const item = (SMSTypes)[code];
  return item.name;
}
