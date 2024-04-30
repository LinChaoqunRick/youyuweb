<template>
  <div class="register-account">
    <div class="register-form-container">
      <div class="tip-box">
        <Transition name="fade">
          <a-alert type="error" :message="tip.message" banner closable v-if="tip.show" @close="tip.show = false"/>
        </Transition>
      </div>
      <a-form
        :model="formState"
        :rules="rulesRef"
        class="register-form"
        ref="formRef">
        <a-form-item label="" v-if="!formState.type" name="username">
          <a-input v-model:value="formState.username"
                   size="large"
                   :maxlength="11"
                   placeholder="手机号">
            <template #prefix>
              <i-phone fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-else name="email">
          <a-input v-model:value="formState.email"
                   size="large"
                   :maxlength="30"
                   type="email"
                   placeholder="邮箱">
            <template #prefix>
              <i-mail fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-button type="link" class="type-switch" @click="onChangeType">使用{{formState.type?'手机':'邮箱'}}</a-button>
        <a-form-item label="" name="code" class="verification-code">
          <a-input v-model:value="formState.code"
                   size="large"
                   :maxlength="6"
                   placeholder="验证码">
            <template #prefix>
              <i-key fill="#c0c4cc"/>
            </template>
          </a-input>
          <a-button type="primary"
                    size="large"
                    class="get-code-button"
                    :loading="codeBtnProp.loading"
                    :disabled="codeBtnProp.disabled"
                    @click="handleSendCode">
            {{codeBtnProp.text}}
          </a-button>
        </a-form-item>
        <a-form-item label="" name="nickname">
          <a-input v-model:value="formState.nickname"
                   size="large"
                   :maxlength="30"
                   placeholder="昵称">
            <template #prefix>
              <i-user fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" name="password">
          <a-input-password v-model:value="formState.password"
                            size="large"
                            :maxlength="30"
                            placeholder="密码">
            <template #prefix>
              <i-lock fill="#c0c4cc"/>
            </template>
          </a-input-password>
        </a-form-item>
        <!--<a-form-item label="" name="confirmPassword">
          <a-input-password v-model:value="formState.confirmPassword"
                            size="large"
                            :maxlength="30"
                            placeholder="确认密码">
            <template #prefix>
              <i-lock fill="#c0c4cc"/>
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

<script setup lang="ts">
  import {ref, reactive, toRaw, inject, nextTick} from 'vue';
  import {useStore} from 'vuex';
  import {message, Form} from 'ant-design-vue';
  import {checkPassword, checkTelephone} from "@/libs/validate/validate";
  import smsCode from "@/enums/sms/smsCode";

  const {commit, dispatch} = useStore();

  const handleSwitch = inject<Function | null>('handleSwitch')

  const formState = reactive({
    type: 0,
    email: '',
    username: '',
    code: '',
    nickname: '',
    password: '',
  });

  const codeBtnProp = reactive({
    disabled: false,
    loading: false,
    text: '发送验证码'
  })

  const tip = reactive({
    show: false,
    message: ""
  })

  const loading = ref(false);
  const formRef = ref<typeof Form | null>(null);

  const rulesRef = reactive({
    username: [
      {required: true, message: '请输入手机号', trigger: 'blur'},
      {validator: checkTelephone, message: '请输入正确的手机号', trigger: 'change'}
    ],
    email: [
      {required: true, message: '请输入邮箱'},
      {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
    ],
    code: [{required: true, message: '请输入验证码'}],
    nickname: [{required: true, message: '请输入昵称'}],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      {validator: checkPassword, trigger: 'change'}
    ],
    // confirmPassword: [{required: true, message: '请确认密码'}],
  });

  const onSubmit = () => {
    tip.show = false;
    formRef.value?.validate().then(() => {
      loading.value = true;
      dispatch('register', toRaw(formState)).then(res => {
        message.success("注册成功!");
        handleSwitch && handleSwitch()
      }).catch(e => {
        tip.message = e.message;
        tip.show = true;
      })
    }).finally(() => {
      loading.value = false;
    });
  };

  function handleSendCode() {
    tip.show = false;
    if (formState.type) { // 如果是邮箱登录
      formRef.value?.validateFields('email').then(res => {
        codeBtnProp.loading = true;
        dispatch("sendEmailCode", {target: formState.email, repeat: true}).then(res => {
          disableTimer();
          message.success("已发送");
        }).catch((e) => {
          setErrorMessage(e.message);
        }).finally(() => {
          codeBtnProp.loading = false;
        })
      }).catch(console.log)
    } else { // 如果是手机登录
      formRef.value.validateFields('username').then(res=>{
        codeBtnProp.loading = true;
        dispatch("messageSend", {
          telephone: formState.username,
          repeat: true,
          type: smsCode.REGISTER
        }).then(res => {
          disableTimer();
          message.success("已发送");
        }).catch((e) => {
          setErrorMessage(e.message);
        }).finally(() => {
          codeBtnProp.loading = false;
        })
      })
    }
  }

  function setErrorMessage(message: string) {
    tip.show = false;
    setTimeout(() => {
      tip.show = true;
      tip.message = message;
    }, 50)
  }

  function onChangeType() {
    formState.type ^= 1;
  }

  function disableTimer() {
    let second: number = 60;
    codeBtnProp.text = `${second}秒后重新发送`
    codeBtnProp.disabled = true;
    const interval = setInterval(() => {
      codeBtnProp.text = `${second}秒后重新发送`
      second = second - 1;
      if (second <= 0) {
        clearInterval(interval);
        codeBtnProp.text = `发送验证码`
        codeBtnProp.disabled = false;
      }
    }, 1000)
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

      .register-form {
        position: relative;

        .type-switch {
          position: absolute;
          right: -85px;
          top: 3px;
        }
      }

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
      top: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .other-tips {
      margin-top: 10px;
    }

  }
</style>
