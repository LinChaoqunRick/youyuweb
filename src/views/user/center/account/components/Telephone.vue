<template>
  <div class="change-telephone">
    <!-- 如果之前绑定了手机号 -->
    <div v-if="props.user.username && !next">
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
        <div class="code-error" v-if="!preBtnProps.correct">验证码错误或已过期，请重试</div>
      </a-form>
    </div>
    <div v-else>
      <a-form :model="formNew" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
              ref="formRef" class="code-form">
        <a-form-item label=" " name="telephone">
          <a-input v-model:value="formNew.telephone" :maxlength="11" placeholder="新手机号"/>
        </a-form-item>
        <a-form-item label=" " name="code">
          <a-input v-model:value="formNew.code" :maxlength="6" size="small" placeholder="验证码">
            <template v-slot:suffix>
              <a-button type="link" class="send-code-btn" :disabled="nextBtnProps.disabled" @click="onNextSendCode">
                {{nextBtnProps.text}}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <div class="code-error" v-if="!nextBtnProps.correct">验证码错误或已过期，请重试</div>
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
  const tryCount = ref(0);
  const next = ref(false);

  const props = defineProps({
    user: {
      type: Object as PropType<userType>
    }
  })

  interface btnProp {
    text: string,
    disabled: boolean,
    correct: boolean
  }

  const rulesRef = {
    telephone: [
      {required: true, validator: checkTelephone, trigger: 'change'}
    ],
    code: [
      {required: true, message: '请输入6位验证码', min: 6, max: 6, trigger: 'change'}
    ],
  };

  const preBtnProps = reactive<btnProp>({
    text: '发送验证码',
    disabled: false,
    correct: true
  });

  const nextBtnProps = reactive<btnProp>({
    text: '发送验证码',
    disabled: false,
    correct: true
  });

  const formPrevious = reactive({
    telephone: props.user.username,
    code: ''
  })

  const formNew = reactive({
    telephone: '',
    code: ''
  })

  function onPreSendCode() {
    dispatch('messageSend', {telephone: props.user.username}).then(res => {
      message.success("发送成功");
      disableTimer(preBtnProps);
    })
  }

  function onNextSendCode() {
    dispatch('messageSend', {telephone: formNew.telephone}).then(res => {
      message.success("发送成功");
      disableTimer(nextBtnProps);
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
      modal.confirmLoading = true;
      if (props.user.username && !next.value) {
        preBtnProps.correct = true;
        dispatch('messageVerify', formPrevious).then(res => {
          if (!res.data) {
            tryCount.value++;
            preBtnProps.correct = false;
          } else {
            next.value = true;
            tryCount.value = 0;
          }
        }).finally(() => {
          modal.confirmLoading = false;
        })
      } else {
        nextBtnProps.correct = true;
        await dispatch('messageVerify', formNew).then(res => {
          if (!res.data) {
            tryCount.value++;
            nextBtnProps.correct = false;
          } else {
            dispatch("saveTelephone", {oldTel: props.user.username, newTel: formNew.telephone}).then(res => {
              if (res.data) {
                message.success("修改成功");
                done();
              } else {
                message.success("修改失败");
              }
            }).catch(console.log);
          }
        }).catch(console.log)
          .finally(() => {
            modal.confirmLoading = false;
          })
      }
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
