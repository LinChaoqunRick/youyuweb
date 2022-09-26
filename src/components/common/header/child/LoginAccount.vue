<template>
  <div class="login-account">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form">
      <a-form-item label="账号" v-bind="validateInfos.telephone">
        <a-input v-model:value="formState.telephone" :maxlength="30">
          <template #prefix>
            <icon-user/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password v-model:value="formState.password" :maxlength="30">
          <template #prefix>
            <icon-lock/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block html-type="submit" class="login-form-button" @click.prevent="onSubmit">
          登录
        </a-button>
        <div class="other-tips">
          <a class="forget-password">注册账号？</a>或者
          <a class="forget-password">忘记密码？</a>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {reactive, toRaw} from 'vue';
  import {Form} from 'ant-design-vue';

  const useForm = Form.useForm;

  const formState = reactive({
    telephone: '',
    password: '',
  });

  const rulesRef = reactive({
    telephone: [{required: true, message: '请输入账号'}],
    password: [{required: true, message: '请输入密码'}],
  });

  const {resetFields, validate, validateInfos} = useForm(formState, rulesRef);

  const onSubmit = () => {
    validate().then(() => {
      console.log(toRaw(formState));
    }).catch(err => {
      console.log('error', err);
    });
  };
</script>

<style lang="scss" scoped>
  .login-account {
    .other-tips {
      margin-top: 10px;

      .forget-password {

      }
    }

  }
</style>
