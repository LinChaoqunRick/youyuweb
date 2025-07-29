import { ConfigProvider, theme as themeConfig } from 'antd';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import { initI18n } from '@/locales';

import RouterProvider from '@/providers/RouterProvider';
import '@/assets/css/theme.css';
import { useAppSettings } from '@/store/useAppSettings';

function App() {
  const { theme, language } = useAppSettings();
  document.documentElement.setAttribute('data-theme', theme);

  useEffect(() => {
    initI18n(language || 'zh');
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? themeConfig.darkAlgorithm : themeConfig.defaultAlgorithm,
      }}
    >
      <div id="app">
        <BrowserRouter>
          <AuthProvider>
            <RouterProvider />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
