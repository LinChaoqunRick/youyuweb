import { ExclamationCircleFilled } from '@ant-design/icons';
import { ACCOUNT_LOGIN } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import { ResponseResult } from '@youyu/shared/types';
import { cleanCookieLocalStorage } from '@youyu/shared/utils';
import EventBus from '@youyu/shared/utils/event-bus';
import {
  ConfigProvider, theme as themeConfig, message, Modal,
} from 'antd';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { initI18n } from '@/locales';
import RouterProvider from '@/providers/RouterProvider';
import '@/assets/css/theme.css';
import { useAppSettings } from '@/store/useAppSettings';
import type { AxiosError } from 'axios';

type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';
function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const { theme, language } = useAppSettings();
  document.documentElement.setAttribute('data-theme', theme);

  useEffect(() => {
    initI18n(language || 'zh');
  }, [language]);

  useEffect(() => {
    EventBus.on('showMessage', (config: { text: string; type: MessageType; duration?: number }) => {
      console.log('showMessage');
      const { text, type, duration } = config;
      messageApi[type](text, duration);
    });

    EventBus.on('refreshToken', async (failedRequest: AxiosError) => {
      const refresh_token = localStorage.getItem('refresh_token');
      try {
        const tokenRefreshResponse: ResponseResult = await http.post(ACCOUNT_LOGIN, {
          grant_type: 'refresh_token',
          refresh_token,
        }, {
          headers: {
            Authorization: `Basic ${btoa('youyu-manage:12345666666')}`,
          },
        });
        const { access_token: res_access_token, refresh_token: res_refresh_token } = tokenRefreshResponse.data;
        localStorage.setItem('access_token', res_access_token);
        localStorage.setItem('refresh_token', res_refresh_token);
        failedRequest!.response!.config.headers.Authorization = `Bearer ${res_access_token}`;
        return true;
      } catch (e) {
        console.log('持久凭证失效，请重新登录！');
        cleanCookieLocalStorage();
        modalApi.confirm({
          title: '凭证过期',
          content: '持久凭证失效，请重新登录！',
          icon: <ExclamationCircleFilled />,
          wrapClassName: 'refresh_token_expired_modal top_modal',
          onOk() {
            setTimeout(() => {
              window.location.reload();
              location.replace('/');
            }, 300);
          },
        });
        return false;
      }
    });
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? themeConfig.darkAlgorithm : themeConfig.defaultAlgorithm,
      }}
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
