<template>
  <div class="login-account">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert type="error" :message="tip.message" banner closable v-if="tip.showTip" @close="tip.showTip = false"/>
      </div>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form">
        <a-form-item label="" v-bind="validateInfos.username">
          <a-input v-model:value="formState.username" size="large" :maxlength="30">
            <template #prefix>
              <icon-user/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.password">
          <a-input-password v-model:value="formState.password" size="large" :maxlength="30">
            <template #prefix>
              <icon-lock/>
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
            <a class="forget-password">注册账号？</a>或者
            <a class="forget-password">忘记密码？</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, toRaw} from 'vue';
  import {useStore} from 'vuex';
  import {message} from 'ant-design-vue';
  import Cookies from "js-cookie";

  const {commit, dispatch} = useStore();
  import {Form} from 'ant-design-vue';

  const useForm = Form.useForm;

  const formState = reactive({
    username: '',
    password: '',
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
    dispatch('accountLogin', form).then(res => {
      const {user, token} = res;
      message.success(`欢迎回来，${user.nickname}`);
      commit("changeLogin", false);
      commit("changeUser", user);
      Cookies.set("token", token, {expires: 7});
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
    }

    .other-tips {
      margin-top: 10px;

      .forget-password {

      }
    }

  }
</style>
