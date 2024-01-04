import {message} from "ant-design-vue";
import Cookies from "js-cookie";
import store from "@/store";
import {computed} from "vue";
import openSpin from "@/libs/tools/openSpin";

const isLogin = computed(() => store.getters["isLogin"]);
const connectPathList = ['/qqConnect', '/githubConnect'];

const isConnectRoute = (pathname: string) => {
  return connectPathList.includes(pathname)
}

const connectLogin = async (type: string, code: string) => {
  if (isLogin.value || !type || !code) {
    return;
  }

  const params = {
    grant_type: "password", // oauth认证方式
    authType: type // 校验方式设置成对应模式
  }

  if (type === 'qq') {
    params.qqCode = code;
  } else if (type === 'github') {
    params.githubCode = code;
  }
  const closeSpin = openSpin({
    componentProps: {
      tip: "登录中..."
    }
  });
  await store.dispatch("token", params).then(async (res) => {
    const {userInfo, access_token, refresh_token} = res.data;
    message.success(`欢迎回来，${userInfo.nickname}`);
    store.commit("changeLogin", false);
    store.commit("changeUser", userInfo);
    Cookies.set("access_token", access_token, {expires: 7});
    Cookies.set("refresh_token", refresh_token, {expires: 30});
  }).catch(e => {
    message.error("授权失败请重试！");
  })
  closeSpin();
};

const getConnectTypeByRoute = (pathname: string) => {
  switch (pathname) {
    case "/qqConnect":
      return "qq";
    case "/githubConnect":
      return "github";
    default:
      return "error"
  }
}

const executeConnect = async () => {
  const params = new URLSearchParams(new URL(location.href).search);
  const code = params.get('code');
  const pathname = location.pathname;
  if (isConnectRoute(pathname)) {
    // 如果是授权登录的回调地址
    const type = getConnectTypeByRoute(pathname);
    await connectLogin(type, code);
  }
}

export {executeConnect, isConnectRoute}
