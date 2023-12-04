<template>
  <div class="login-account">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert type="error" :message="tip.message" banner closable v-if="tip.showTip" @close="tip.showTip = false"/>
      </div>
      <a-form
        :model="formState"
        class="login-form">
        <a-form-item label="" v-bind="validateInfos.username">
          <a-input v-model:value="formState.username"
                   size="large"
                   :maxlength="30"
                   placeholder="手机号/邮箱">
            <template #prefix>
              <i-user fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.password">
          <a-input-password v-model:value="formState.password"
                            size="large"
                            :maxlength="30"
                            placeholder="密码">
            <template #prefix>
              <i-lock fill="#c0c4cc"/>
            </template>
          </a-input-password>
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
          <div class="other-tips">
            <a class="forget-password" @click="handleSwitch">注册账号？</a>或者
            <a class="forget-password">忘记密码？</a>
          </div>
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

const {commit, dispatch} = useStore();
import {Form} from 'ant-design-vue';

const useForm = Form.useForm;
const handleSwitch = inject('handleSwitch')

const formState = reactive({
  username: '',
  password: '',
  client_id: 'web', // oauth客户端id
  client_secret: '654321', // oauth客户端密码
  grant_type: 'password', // oauth认证方式
  authType: 'password' // 校验方式设置成密码模式
});

const tip = reactive({
  showTip: false,
  message: "账号或密码错误"
})

const loading = ref(false);

const rulesRef = reactive({
  username: [{required: true, message: '请输入账号'}],
  password: [{required: true, message: '请输入密码'}],
});

const {resetFields, validate, validateInfos} = useForm(formState, rulesRef);

const onSubmit = () => {
  validate().then(() => {
    tip.showTip = false;
    loading.value = true;
    handleLogin(toRaw(formState));
  }).catch(err => {
    console.log('error', err);
  });
};

function handleLogin(form) {
  dispatch('token', form).then(res => {
    const {userInfo, access_token, refresh_token} = res.data;
    message.success(`欢迎回来，${userInfo.nickname}`);
    commit("changeLogin", false);
    commit("changeUser", userInfo);
    Cookies.set("access_token", access_token, {expires: 7});
    Cookies.set("refresh_token", refresh_token, {expires: 30});
    // 生成权限路由
    generateAuthRoutes();
  }).catch(e => {
    tip.showTip = true;
    tip.message = e.message;
  }).finally(_ => {
    loading.value = false;
  })
}
</script>

<style lang="scss" scoped>
.login-account {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .login-form-container {
    width: 320px;
    /*background-color: skyblue;*/
  }

  .tip-box {
    position: absolute;
    width: 320px;
    top: 70px;
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
