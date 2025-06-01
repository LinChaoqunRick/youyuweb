import { message } from 'ant-design-vue';
import store from '@/store';
import { computed } from 'vue';
import openSpin from '@/libs/tools/openSpin';

const isLogin = computed(() => store.getters['isLogin']);
const connectPathList = ['/qqConnect', '/githubConnect'];

const isConnectRoute = (pathname: string) => {
  return connectPathList.includes(pathname);
};

const connect = async (type: string, code: string, state: string) => {
  if (!type || !code) {
    return;
  }

  const params = {
    grant_type: 'password', // oauth认证方式
    authType: type, // 校验方式设置成对应模式
  };

  if (type === 'qq') {
    params.qqCode = code;
  } else if (type === 'github') {
    params.githubCode = code;
  }

  if (state === 'login') {
    if (isLogin.value) {
      return;
    }
    const closeSpin = openSpin({
      componentProps: {
        tip: '登录中...',
      },
    });
    await store
      .dispatch('token', params)
      .then(async res => {
        const { userInfo, access_token, refresh_token } = res.data;
        message.success(`欢迎回来，${userInfo.nickname}`);
        store.commit('changeLogin', false);
        store.commit('changeUser', userInfo);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
      })
      .catch(e => {
        message.error('授权失败请重试！');
      });
    closeSpin();
  } else if (state === 'bind') {
    const closeSpin = openSpin({
      componentProps: {
        tip: '关联账号中...',
      },
    });
    await store
      .dispatch('connectBind', { type, code })
      .then(res => {
        console.log(res);
        if (res.data) {
          message.success('绑定成功');
        }
      })
      .catch(e => {
        message.error('关联失败请重试！');
      });
    closeSpin();
  }
};

const getConnectTypeByRoute = (pathname: string) => {
  switch (pathname) {
    case '/qqConnect':
      return 'qq';
    case '/githubConnect':
      return 'github';
    default:
      return 'error';
  }
};

const executeConnect = async () => {
  const params = new URLSearchParams(new URL(location.href).search);
  const code = params.get('code');
  const state = params.get('state');
  const pathname = location.pathname;
  if (isConnectRoute(pathname)) {
    // 如果是授权登录的回调地址
    const type = getConnectTypeByRoute(pathname);
    console.log(type, code, state);
    await connect(type, code, state);
  }
};

export { executeConnect, isConnectRoute };
