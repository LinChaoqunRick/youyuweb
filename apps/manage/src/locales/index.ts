// src/i18n/table.ts
import intl from 'react-intl-universal';
import enUS from '@/locales/en-US';
import zhCN from '@/locales/zh-CN';

export const locales = {
  zh: zhCN,
  en: enUS,
};

export function initI18n(currentLocale: string) {
  return intl.init({
    currentLocale,
    locales,
  });
}
