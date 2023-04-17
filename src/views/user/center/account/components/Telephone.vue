<template>
  <div class="change-telephone">
    <!-- 如果之前绑定了手机号 -->
    <div v-if="props.user.username">
      <a-form :model="formPrevious" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
              ref="formRef" class="code-form">
        <div class="user-telephone">
          原手机号：{{props.user.username}}
        </div>
        <a-form-item label=" " name="code">
          <a-input v-model:value="formPrevious.code" :maxlength="6" size="small" placeholder="验证码">
            <template v-slot:suffix>
              <a-button type="link" class="send-code-btn" :disabled="preBtnProps.disabled" @click="onPreSendCode">
                {{preBtnProps.text}}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, inject} from "vue";
  import type {PropType} from "vue";
  import type {userType} from "@/types/user";
  import {useStore} from "vuex";
  import {reactive} from "vue";
  import {checkTelephone} from "@/libs/validate/validate";
  import {message} from "ant-design-vue";

  const modal = inject('modal');
  const labelCol = {span: 0};
  const wrapperCol = {span: 24};
  const {dispatch} = useStore();
  const formRef = ref();

  const props = defineProps({
    user: {
      type: Object as PropType<userType>
    }
  })

  const rulesRef = {
    code: [
      {required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change'}
    ],
  };

  const preBtnProps = reactive({
    text: '发送验证码',
    disabled: false
  });

  const formPrevious = reactive({
    telephone: props.user.username,
    code: ''
  })

  function onPreSendCode() {
    dispatch('messageSend', {telephone: props.user.username}).then(res => {
      message.success("发送成功");
      disableTimer(preBtnProps);
    })
  }

  function disableTimer(obj: object) {
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

  async function beforeConfirm() {
    const form = await formRef.value.validate().catch(console.log);
    if (form) {
      modal.confirmLoading = true;
      dispatch('messageVerify', formPrevious).then(res => {
        console.log(res);
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
  .change-telephone {
    .code-form {
      .user-telephone {
        font-weight: bold;
        margin-bottom: 8px;
        margin-left: 2px;
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
