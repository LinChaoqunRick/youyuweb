<template>
  <div class="change-password">
    <div v-if="props.user.username">
      <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
              ref="formRef" class="code-form">
        <div class="user-telephone">
          当前手机号：{{props.user.username}}
        </div>
        <a-form-item label=" " name="code">
          <a-input v-model:value="formValidate.code" :maxlength="6" size="large" placeholder="验证码">
            <template v-slot:suffix>
              <a-button type="link" class="send-code-btn" :disabled="sendBtnProps.disabled" @click="onSendCode">
                {{sendBtnProps.text}}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label=" " name="password">
          <a-input v-model:value="formValidate.password" :maxlength="30" size="large" type="password"
                   placeholder="新密码"/>
        </a-form-item>
        <div class="code-error" v-if="!sendBtnProps.correct">验证码错误或已过期，请重试</div>
      </a-form>
    </div>
    <div v-else>
      邮箱校验
    </div>
  </div>
</template>

<script setup lang="ts">
  import {inject, reactive, ref} from "vue";
  import type {PropType} from "vue";
  import {useStore} from "vuex";
  import {checkTelephone, checkPassword} from "@/libs/validate/validate";
  import {message} from "ant-design-vue";
  import type {userType} from "@/types/user";
  import {cleanCookieLocalStorage} from "@/assets/utils/utils";

  const props = defineProps({
    user: {
      type: Object as PropType<userType>
    }
  })

  const modal = inject('modal');
  const labelCol = {span: 0};
  const wrapperCol = {span: 24};
  const {dispatch} = useStore();
  const formRef = ref();
  const tryCount = ref(0);


  const rulesRef = {
    code: [
      {required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change'}
    ],
    password: [
      {required: true, validator: checkPassword, trigger: 'change'}
    ]
  };

  interface btnProp {
    text: string,
    disabled: boolean,
    correct: boolean
  }

  const sendBtnProps = reactive<btnProp>({
    text: '发送验证码',
    disabled: false,
    correct: true
  });

  const formValidate = reactive({
    telephone: props.user.username,
    code: '',
    password: ''
  })

  function onSendCode() {
    dispatch('messageSend', {
      telephone: props.user.username,
      type: 2
    }).then(res => {
      message.success("发送成功");
      disableTimer(sendBtnProps);
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

  async function beforeConfirm(done) {
    if (tryCount.value >= 6) {
      message.error('校验失败次数过多，请稍后再试');
      return;
    }

    const form = await formRef.value.validate().catch(console.log);
    if (form) {
      sendBtnProps.correct = true;
      modal.confirmLoading = true;
      dispatch('messageVerify', formValidate).then(async res => {
        if (!res.data) {
          tryCount.value++;
          sendBtnProps.correct = false;
        } else {
          await dispatch("savePassword", {
            telephone: props.user.username,
            password: formValidate.password
          }).then(res => {
            if (res.data) {
              message.success("修改成功,请重新登录");
              done();

              setTimeout(() => {
                cleanCookieLocalStorage();
                location.reload();
              }, 1000)
            } else {
              message.success("修改失败");
            }
          }).catch(console.log);
        }
      }).finally(() => {
        modal.confirmLoading = false;
      })
    }
  }

  defineExpose({
    beforeConfirm
  })
</script>

<style lang="scss" scoped>
  .change-password {
    .code-form {
      .send-code-btn {
        height: auto;
      }

      .user-telephone {
        font-weight: bold;
        margin-bottom: 8px;
        margin-left: 2px;
      }

      .code-error {
        position: absolute;
        bottom: 0;
        color: red;
      }
    }

    ::v-deep(.ant-form) {
      label {
        display: none;
      }

      .ant-input-suffix {
        button {
          padding: 0;
        }
      }
    }
  }
</style>
