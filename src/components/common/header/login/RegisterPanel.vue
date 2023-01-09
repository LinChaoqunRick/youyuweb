<template>
  <div class="register-account">
    <div class="register-form-container">
      <div class="tip-box">
        <a-alert type="error" :message="tip.message" banner closable v-if="tip.showTip" @close="tip.showTip = false"/>
      </div>
      <a-form
        :model="formState"
        class="register-form"
        ref="form">
        <a-form-item label="" v-bind="validateInfos.email">
          <a-input v-model:value="formState.email"
                   size="large"
                   :maxlength="30"
                   type="email"
                   placeholder="邮箱"
                   @blur="validate('email', { trigger: 'blur' }).catch(() => {})">
            <template #prefix>
              <icon-mail fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.verificationCode" class="verification-code">
          <a-input v-model:value="formState.verificationCode"
                   size="large"
                   :maxlength="6"
                   placeholder="验证码">
            <template #prefix>
              <icon-key fill="#c0c4cc"/>
            </template>
          </a-input>
          <a-button type="primary"
                    size="large"
                    class="get-code-button"
                    @click="handleSendCode">
            获取验证码
          </a-button>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.nickname">
          <a-input v-model:value="formState.nickname"
                   size="large"
                   :maxlength="30"
                   placeholder="昵称">
            <template #prefix>
              <icon-user fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.password">
          <a-input-password v-model:value="formState.password"
                            size="large"
                            :maxlength="30"
                            placeholder="密码">
            <template #prefix>
              <icon-lock fill="#c0c4cc"/>
            </template>
          </a-input-password>
        </a-form-item>
        <!--<a-form-item label="" v-bind="validateInfos.confirmPassword">
          <a-input-password v-model:value="formState.confirmPassword"
                            size="large"
                            :maxlength="30"
                            placeholder="确认密码">
            <template #prefix>
              <icon-lock fill="#c0c4cc"/>
            </template>
          </a-input-password>
        </a-form-item>-->
        <a-form-item>
          <a-button type="primary"
                    size="large"
                    block
                    html-type="submit"
                    class="register-form-button"
                    :loading="loading"
                    @click.prevent="onSubmit">
            注册
          </a-button>
          <div class="other-tips">
            <span>已有账号？立即</span>
            <a class="forget-password" @click="handleSwitch">登录</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  import {ref, reactive, toRaw, inject} from 'vue';
  import {useStore} from 'vuex';
  import {message} from 'ant-design-vue';
  import Cookies from "js-cookie";
  import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";

  const {commit, dispatch} = useStore();
  import {Form} from 'ant-design-vue';

  const handleSwitch = inject('handleSwitch')

  const useForm = Form.useForm;

  const formState = reactive({
    email: '',
    verificationCode: '',
    nickname: '',
    password: '',
    // confirmPassword: ''
  });

  const tip = reactive({
    showTip: false,
    message: ""
  })

  const loading = ref(false);
  const form = ref(null);

  const rulesRef = reactive({
    email: [
      {required: true, message: '请输入的邮箱'},
      {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
    ],
    verificationCode: [{required: true, message: '请输入验证码'}],
    nickname: [{required: true, message: '请输入昵称'}],
    password: [{required: true, message: '请输入密码'}],
    // confirmPassword: [{required: true, message: '请确认密码'}],
  });

  const {resetFields, validate, validateInfos} = useForm(formState, rulesRef);

  const onSubmit = () => {
    loading.value = true;
    validate().then(() => {
      dispatch('register', toRaw(formState)).then(res => {
        message.success("注册成功!");
        handleSwitch()
      })
    }).catch(err => {
      console.log('error', err);
    }).finally(_ => {
      loading.value = false;
    });
  };

  function handleSendCode() {
    validate(['email']).then(res => {
      dispatch("getRegisterCode", {target: formState.email}).then(res => {
        console.log(res);
      }).catch(e => {

      })
    }).catch(console.log)
  }
</script>

<style lang="scss" scoped>
  .register-account {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .register-form-container {
      width: 320px;
      /*background-color: skyblue;*/

      .verification-code {
        ::v-deep(.ant-form-item-control-input-content) {
          display: flex !important;
          align-items: center;

          .get-code-button {
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }

      ::v-deep(.ant-form) {
        .ant-form-item {
          /*margin-bottom: 18px;*/

          &:last-child {
            margin-bottom: 0 !important;
          }
        }
      }
    }

    .tip-box {
      position: absolute;
      width: 320px;
      top: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .other-tips {
      margin-top: 10px;
    }

  }
</style>
