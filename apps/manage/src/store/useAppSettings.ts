import { create } from 'zustand';

type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh';

interface AppSettingsState {
  theme: Theme; // 主题
  language: Language; // 语言
  menuCollapsed: boolean; // 菜单关闭
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleMenuCollapsed: () => void;
}

export const useAppSettings = create<AppSettingsState>(set => {
  const localTheme = (localStorage.getItem('theme') as Theme) || 'light';
  const localLanguage = (localStorage.getItem('language') as Language) || 'zh';

  return {
    theme: localTheme,
    language: localLanguage,
    menuCollapsed: false,
    toggleTheme: () => {
      set(state => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        document.documentElement.setAttribute('data-theme', next);
        return { theme: next };
      });
    },
    setLanguage: lang => {
      localStorage.setItem('language', lang);
      set({ language: lang });
    },
    toggleMenuCollapsed: () => {
      set(state => {
        return { menuCollapsed: !state.menuCollapsed };
      });
    },
  };
});
