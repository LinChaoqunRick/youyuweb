<template>
  <div class="login-telephone">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert
          v-if="tip.showTip"
          type="error"
          :message="tip.message"
          banner
          closable
          @close="tip.showTip = false"
        />
      </div>
      <a-form :model="formState" class="login-form">
        <a-form-item label="" v-bind="validateInfos.telephone">
          <a-input
            v-model:value="formState.username"
            size="large"
            :maxlength="30"
            placeholder="手机号"
          >
            <template #prefix>
              <i-user fill="#c0c4cc" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.smsCode">
          <a-input
            v-model:value="formState.smsCode"
            size="large"
            :maxlength="6"
            placeholder="验证码"
          >
            <template #suffix>
              <a-button
                type="link"
                class="send-code-btn"
                :disabled="btnProps.disabled"
                @click="onSendCode"
              >
                {{ btnProps.text }}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            size="large"
            block
            html-type="submit"
            class="login-form-button"
            :loading="loading"
            @click.prevent="onSubmit"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, inject } from 'vue';
import { checkTelephone } from '@youyu/shared/utils/antdv-validate';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import smsCode from '@/enums/sms/smsCode';
import { generateAuthRoutes } from '@/router/config/useGenerateRoutes';

const { commit, dispatch } = useStore();
import { Form } from 'ant-design-vue';

const { useForm } = Form;
const handleSwitch = inject('handleSwitch');

interface btnProp {
  text: string;
  disabled: boolean;
}

interface LoginForm {
  username: string;
  smsCode: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  authType: string;
}

const formState = reactive<LoginForm>({
  username: '',
  smsCode: '',
  client_id: 'web', // oauth客户端id
  client_secret: '654321', // oauth客户端密码
  grant_type: 'password', // oauth认证方式
  authType: 'sms', // 校验方式设置成密码模式
});

const tip = reactive({
  showTip: false,
  message: '账号或密码错误',
});

const loading = ref<boolean>(false);
const tryCount = ref<number>(0);

const rulesRef = reactive({
  username: [{ required: true, validator: checkTelephone, trigger: 'change' }],
  smsCode: [{ required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change' }],
});

const btnProps = reactive<btnProp>({
  text: '发送验证码',
  disabled: false,
});

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

const onSubmit = () => {
  if (tryCount.value >= 6) {
    message.error('尝试次数过多，请稍后再试');
    return;
  }
  validate()
    .then(async () => {
      tip.showTip = false;
      loading.value = true;
      handleLogin(toRaw(formState));
    })
    .catch(err => {
      console.log('error', err);
    });
};

function handleLogin(form: LoginForm) {
  dispatch('token', formState)
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
      if (e.code === 514) {
        tryCount.value++;
        tip.showTip = true;
        tip.message = '验证码错误或已过期，请重试';
        loading.value = false;
      } else {
        tip.showTip = true;
        tip.message = e.message;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function onSendCode() {
  dispatch('messageSend', {
    telephone: formState.username,
    type: smsCode.LOGIN,
  }).then(res => {
    tryCount.value = 0;
    message.success('发送成功');
    disableTimer(btnProps);
  });
}

function disableTimer(obj: btnProp) {
  let second: number = 60;
  obj.text = `${second}秒后重新发送`;
  obj.disabled = true;
  const interval = setInterval(() => {
    obj.text = `${second}秒后重新发送`;
    second = second - 1;
    if (second <= 0) {
      clearInterval(interval);
      obj.text = `发送验证码`;
      obj.disabled = false;
    }
  }, 1000);
}
</script>

<style lang="scss" scoped>
.login-telephone {
  .login-form-container {
    width: 320px;

    .send-code-btn {
      height: auto !important;
      padding: 0;
    }
  }

  .tip-box {
    position: absolute;
    top: 130px;
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
}
</style>
