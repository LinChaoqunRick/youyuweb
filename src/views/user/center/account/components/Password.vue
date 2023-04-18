<template>
  <div class="change-password">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="code-form">
      <a-form-item label=" " name="telephone">
        <a-input v-model:value="formValidate.telephone" :maxlength="11" placeholder="新手机号"/>
      </a-form-item>
      <a-form-item label=" " name="code">
        <a-input v-model:value="formValidate.code" :maxlength="6" size="small" placeholder="验证码">
          <template v-slot:suffix>
            <a-button type="link" class="send-code-btn" :disabled="sendBtnProps.disabled" @click="onNextSendCode">
              {{sendBtnProps.text}}
            </a-button>
          </template>
        </a-input>
      </a-form-item>
      <div class="code-error" v-if="!sendBtnProps.correct">验证码错误或已过期，请重试</div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {inject, reactive, ref} from "vue";
  import type {PropType} from "vue";
  import {useStore} from "vuex";
  import {checkTelephone} from "@/libs/validate/validate";
  import {message} from "ant-design-vue";
  import type {userType} from "@/types/user";

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
    telephone: [
      {required: true, validator: checkTelephone, trigger: 'change'}
    ],
    code: [
      {required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change'}
    ],
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
    code: ''
  })

  function onPreSendCode() {
    dispatch('messageSend', {telephone: props.user.username}).then(res => {
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
</script>

<style lang="scss" scoped>

</style>
