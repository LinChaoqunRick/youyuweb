<template>
  <div class="bind-email">
    <a-form
      :model="formValidate"
      :colon="false"
      :rules="rulesRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="formRef"
      class="note-form"
    >
      <a-form-item label="" name="email">
        <a-input v-model:value="formValidate.email" size="large" :maxlength="100" placeholder="新的邮箱" />
      </a-form-item>
      <a-form-item label=" " name="code">
        <a-input v-model:value="formValidate.code" :maxlength="6" size="large" placeholder="验证码">
          <template v-slot:suffix>
            <a-button
              type="link"
              class="send-code-btn"
              :disabled="sendBtnProps.disabled"
              :loading="sendBtnProps.loading"
              @click="onSendCode"
            >
              {{ sendBtnProps.text }}
            </a-button>
          </template>
        </a-input>
      </a-form-item>
      <div class="code-error" v-if="!sendBtnProps.correct">{{ sendBtnProps.message }}</div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { checkPassword } from '@/libs/validate/validate';
import type { userType } from '@/types/user';

const modal = inject('modal');
const labelCol = { span: 0 };
const wrapperCol = { span: 24 };
const formRef = ref();
const { dispatch } = useStore();

const props = defineProps({
  user: {
    type: Object as PropType<userType>,
  },
});

const formValidate = reactive({
  email: '',
  code: '',
});

const rulesRef = {
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  code: [{ required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change' }],
};

interface btnProp {
  text: string;
  disabled: boolean;
  loading: boolean;
  correct: boolean;
  tryCount: number;
}

const sendBtnProps = reactive<btnProp>({
  text: '发送验证码',
  disabled: false,
  loading: false,
  correct: true,
  tryCount: 0,
});

function onSendCode() {
  sendBtnProps.tryCount = 0;
  sendBtnProps.correct = true;
  sendBtnProps.loading = true;
  formRef.value
    .validateFields('email')
    .then(res => {
      dispatch('sendEmailCode', { target: formValidate.email, repeat: true })
        .then(res => {
          message.success('发送成功');
          disableTimer(sendBtnProps);
        })
        .catch(e => {
          sendBtnProps.correct = false;
          sendBtnProps.message = e.message;
        })
        .finally(() => {
          sendBtnProps.loading = false;
        });
    })
    .catch(console.log);
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

async function beforeConfirm(done) {
  if (sendBtnProps.tryCount >= 6) {
    message.error('校验失败次数过多，请稍后再试');
    return;
  }
  const form = await formRef.value.validate().catch(console.log);
  if (form) {
    dispatch('saveEmail', {
      userId: props.user.id,
      email: formValidate.email,
      code: formValidate.code,
    })
      .then(res => {
        if (res.data) {
          message.success('修改成功！');
          done();
        }
      })
      .catch(e => {
        sendBtnProps.correct = false;
        sendBtnProps.message = e.message;
      });
  }
}

defineExpose({
  beforeConfirm,
});
</script>

<style lang="scss" scoped>
.bind-email {
  position: relative;

  .send-code-btn {
    height: auto;
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

  .code-error {
    color: red;
  }
}
</style>
