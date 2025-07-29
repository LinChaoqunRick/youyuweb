import { create } from 'zustand';

type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh';

interface AppSettingsState {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export const useAppSettings = create<AppSettingsState>(set => {
  const localTheme = (localStorage.getItem('theme') as Theme) || 'light';
  const localLanguage = (localStorage.getItem('language') as Language) || 'zh';

  return {
    theme: localTheme,
    language: localLanguage,
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
  };
});
