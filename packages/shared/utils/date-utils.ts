import moment from 'moment';

export function getDate() {
  return new Date().getTime();
}

export function formatSmartDate(date: string) {
  const nowYear = moment().year();
  const year = moment(date).year();
  return moment(date).format(nowYear === year ? 'M月D日' : 'YYYY年M月D日');
}
