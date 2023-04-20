<template>
  <div class="login-telephone">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert type="error" :message="tip.message" banner closable v-if="tip.showTip" @close="tip.showTip = false"/>
      </div>
      <a-form
        :model="formState"
        class="login-form">
        <a-form-item label="" v-bind="validateInfos.telephone">
          <a-input v-model:value="formState.telephone"
                   size="large"
                   :maxlength="30"
                   placeholder="手机号">
            <template #prefix>
              <i-user fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.code">
          <a-input v-model:value="formState.code" size="large" :maxlength="6" placeholder="验证码">
            <template v-slot:suffix>
              <a-button type="link" class="send-code-btn" :disabled="btnProps.disabled" @click="onSendCode">
                {{btnProps.text}}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary"
                    size="large"
                    block
                    html-type="submit"
                    class="login-form-button"
                    :loading="loading"
                    @click.prevent="onSubmit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, toRaw, inject} from 'vue';
  import {useStore} from 'vuex';
  import {message} from 'ant-design-vue';
  import Cookies from "js-cookie";
  import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";
  import {checkTelephone} from "@/libs/validate/validate";

  const {commit, dispatch} = useStore();
  import {Form} from 'ant-design-vue';

  const useForm = Form.useForm;
  const handleSwitch = inject('handleSwitch');

  interface btnProp {
    text: string,
    disabled: boolean,
  }

  const formState = reactive({
    telephone: '',
    code: '',
  });

  const tip = reactive({
    showTip: false,
    message: "账号或密码错误"
  })

  const loading = ref<boolean>(false);
  const tryCount = ref<number>(0);

  const rulesRef = reactive({
    telephone: [{required: true, validator: checkTelephone, trigger: 'change'}],
    code: [{required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change'}],
  });

  const btnProps = reactive<btnProp>({
    text: '发送验证码',
    disabled: false,
  });

  const {resetFields, validate, validateInfos} = useForm(formState, rulesRef);

  const onSubmit = () => {
    validate().then(async () => {
      tip.showTip = false;
      loading.value = true;
      const result = await dispatch('messageVerify', formState).catch(console.log);
      if (result.data) {
        handleLogin(toRaw(formState));
      } else {
        tryCount.value++;
        tip.showTip = true;
        tip.message = '验证码错误或已过期，请重试';
        loading.value = false;
      }
    }).catch(err => {
      console.log('error', err);
    });
  };

  function handleLogin(form) {
    dispatch('telephoneLogin', formState).then(res => {
      const {userInfo, token} = res.data;
      message.success(`欢迎回来，${userInfo.nickname}`);
      commit("changeLogin", false);
      commit("changeUser", userInfo);
      Cookies.set("token", token, {expires: 7});
      // 生成权限路由
      generateAuthRoutes();
    }).catch(e => {
      tip.showTip = true;
      tip.message = e.message;
    }).finally(_ => {
      loading.value = false;
    })
  }

  function onSendCode() {
    dispatch('messageSend', {telephone: formState.telephone}).then(res => {
      tryCount.value = 0;
      message.success("发送成功");
      disableTimer(btnProps);
    })
  }

  function disableTimer(obj: btnProp) {
    let second: number = 60;
    obj.text = `${second}秒后重新发送`
    obj.disabled = true;
    const interval = setInterval(() => {
      obj.text = `${second}秒后重新发送`
      second = second - 1;
      if (second <= 0) {
        clearInterval(interval);
        obj.text = `发送验证码`
        obj.disabled = false;
      }
    }, 1000)
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
      width: 320px;
      top: 130px;
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
