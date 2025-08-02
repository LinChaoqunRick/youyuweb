import { cleanCookieLocalStorage } from '@youyu/shared/utils';
import EventBus from '@youyu/shared/utils/event-bus';
import { message, Modal } from 'ant-design-vue';
import router from '@/router';
import store from '@/store';
import type { AxiosError } from 'axios';

type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

EventBus.on('showMessage', (config: { text: string; type: MessageType; duration?: number }) => {
  console.log(config);
  const { text, type, duration } = config;
  message[type](text, duration);
});

EventBus.on('redirectTo404', () => {
  router.replace({ name: 'NotFound' });
});

EventBus.on('refreshToken', async (failedRequest: AxiosError) => {
  const refresh_token = localStorage.getItem('refresh_token');
  try {
    const tokenRefreshResponse = await store
      .dispatch('token', { grant_type: 'refresh_token', refresh_token: refresh_token});
    const { access_token: res_access_token, refresh_token: res_refresh_token } = tokenRefreshResponse.data;
    localStorage.setItem('access_token', res_access_token);
    localStorage.setItem('refresh_token', res_refresh_token);
    failedRequest!.response!.config.headers['Authorization'] = 'Bearer ' + res_access_token;
    return true;
  } catch (e) {
    console.log('持久凭证失效，请重新登录！');
    cleanCookieLocalStorage();
    store.commit('changeUser', {});
    Modal.info({
      title: '凭证过期',
      content: '持久凭证失效，请重新登录！',
      wrapClassName: 'refresh_token_expired_modal top_modal',
      onOk() {
        setTimeout(() => {
          window.location.reload();
          router.push('/');
        }, 100);
      },
    });
    return false;
  }
});
