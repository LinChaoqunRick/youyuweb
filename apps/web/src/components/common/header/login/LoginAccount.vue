<template>
  <div class="login-account">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert
          v-if="tip.showTip"
          :message="tip.message"
          banner
          closable
          type="error"
          @close="tip.showTip = false"
        />
      </div>
      <a-form :model="formState" class="login-form">
        <a-form-item label="" v-bind="validateInfos.username">
          <a-input
            v-model:value="formState.username"
            :maxlength="30"
            placeholder="手机号/邮箱"
            size="large"
          >
            <template #prefix>
              <i-user fill="#c0c4cc" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.password">
          <a-input-password
            v-model:value="formState.password"
            :maxlength="30"
            placeholder="密码"
            size="large"
          >
            <template #prefix>
              <i-lock fill="#c0c4cc" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            block
            class="login-form-button"
            html-type="submit"
            size="large"
            type="primary"
            @click.prevent="onSubmit"
          >
            登录
          </a-button>
          <div class="other-tips">
            <a class="forget-password" @click="handleSwitch">注册账号？</a>或者
            <a class="forget-password">忘记密码？</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <div class="social-account-title">
      社交账号登录
    </div>
    <div class="social-account-tag mt-10">
      <!--      <div class="tag-item tag-wechat" title="微信">
              <img src="/static/images/logo/wechat.png" alt="" @click="onSocialConnect('wechat')"/>
            </div>-->
      <div class="tag-item tag-qq" title="QQ">
        <img alt="" src="/static/images/logo/qq.png" @click="onSocialConnect('qq')">
      </div>
      <div class="tag-item tag-github" title="Github">
        <img alt="" src="/static/images/logo/github.png" @click="onSocialConnect('github')">
      </div>
      <!--      <div class="tag-item tag-alipay" title="支付宝">
              <img src="/static/images/logo/alipay.png" alt="" @click="onSocialConnect('alipay')"/>
            </div>-->
      <!--      <div class="tag-item tag-weibo" title="微博">
              <img src="/static/images/logo/weibo.png" alt="" @click="onSocialConnect('weibo')"/>
            </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, inject } from 'vue';
import { message, Form } from 'ant-design-vue';
import { useStore } from 'vuex';
import { generateAuthRoutes } from '@/router/config/useGenerateRoutes';

const { commit, dispatch } = useStore();
const { useForm } = Form;
const handleSwitch = inject('handleSwitch');

interface LoginForm {
  username: string;
  password: string;
  grant_type: string;
  authType: string;
}

const formState = reactive<LoginForm>({
  username: '',
  password: '',
  grant_type: 'password', // oauth认证方式
  authType: 'password', // 校验方式设置成密码模式
});

const tip = reactive({
  showTip: false,
  message: '账号或密码错误',
});

const loading = ref(false);

const rulesRef = reactive({
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
});

const { validate, validateInfos } = useForm(formState, rulesRef);
const onSubmit = () => {
  validate()
    .then(() => {
      tip.showTip = false;
      loading.value = true;
      handleLogin(toRaw(formState));
    })
    .catch(err => {
      console.log('error', err);
    });
};

const handleLogin = (form: LoginForm) => {
  dispatch('token', form)
    .then(res => {
      const { userInfo, access_token, refresh_token } = res.data;
      message.success(`欢迎回来，${userInfo.nickname}`);
      commit('changeLogin', false);
      commit('changeUser', userInfo);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      // 生成权限路由
      generateAuthRoutes();
    })
    .catch(e => {
      console.log(e);
      tip.showTip = true;
      tip.message = e.message;
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSocialConnect = (type: string) => {
  if (['qq', 'github']) {
    dispatch('getConnectURL', { type }).then(res => {
      location.href = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.login-account {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .login-form-container {
    width: 320px;

    /* background-color: skyblue; */
  }

  .tip-box {
    position: absolute;
    top: 40px;
    width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .other-tips {
    margin-top: 10px;

    .forget-password {
    }
  }

  .social-account-title {
    position: relative;
    display: flex;
    justify-content: center;
    color: var(--youyu-body-text1);

    &::before,
    &::after {
      position: absolute;
      width: 30px;
      height: 1px;
      background-color: var(--youyu-body-text1);
      content: '';
    }

    &::before {
      top: 11px;
      left: -35px;
    }

    &::after {
      top: 11px;
      left: 90px;
    }
  }

  .social-account-tag {
    display: flex;

    .tag-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;

      img {
        position: relative;
      }

      &:nth-child(n + 2) {
        margin-left: 10px;
      }

      &.tag-wechat {
        background-color: #2fd859;
      }

      &.tag-qq {
        background-color: #1bc1fa;
      }

      &.tag-alipay {
        background-color: #06b4fd;

        img {
          left: 1px;
        }
      }

      &.tag-github {
        background-color: #1f2328;
      }

      &.tag-weibo {
        background-color: #fb5555;
      }
    }
  }
}
</style>
