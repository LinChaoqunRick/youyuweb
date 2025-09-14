import { message, Modal } from 'antd';
import React, { useEffect } from 'react';
import EventBus from '@youyu/shared/utils/event-bus.ts';
import type { AxiosError } from 'axios';
import type { ResponseResult } from '@youyu/shared/types/common';
import http from '@youyu/shared/network';
import { ACCOUNT_LOGIN } from '@youyu/shared/apis';
import { cleanCookieLocalStorage } from '@youyu/shared/utils';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { NoticeType } from 'antd/es/message/interface';

export function useEventListener() {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();

  const showMessage = (config: { text: string; type: NoticeType; duration?: number }) => {
    const { text, type, duration } = config;
    messageApi[type](text, duration);
  };

  const refreshToken = async (failedRequest: AxiosError) => {
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
    } catch (_e) {
      // console.log('持久凭证失效，请重新登录！');
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
  };

  useEffect(() => {
    EventBus.on('showMessage', showMessage);
    EventBus.on('refreshToken', refreshToken);
  }, []);

  return {
    contextHolder,
    modalContextHolder,
  };
}
