import { ConfigProvider, theme as themeConfig } from 'antd';
import enUs from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { initI18n } from '@/locales';
import RouterProvider from '@/providers/RouterProvider';
import '@/assets/css/theme.css';
import '@youyu/shared/assets/css/shared.css';
import { useAppSettings } from '@/store/useAppSettings';
import 'dayjs/locale/zh-cn';
import { useEventListener } from '@/hooks/useEventListener.tsx';

function App() {
  const { theme, language } = useAppSettings();
  document.documentElement.setAttribute('data-theme', theme);
  const { contextHolder, modalContextHolder } = useEventListener();

  useEffect(() => {
    initI18n(language || 'zh');
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? themeConfig.darkAlgorithm : themeConfig.defaultAlgorithm,
      }}
      locale={language === 'zh' ? zhCN : enUs}
    >
      <div id="app">
        {contextHolder}
        {modalContextHolder}
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
