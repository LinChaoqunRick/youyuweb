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
          <a-input v-model:value="formPrevious.code" :maxlength="11" size="small" placeholder="验证码">
            <template v-slot:suffix>
              <a-button type="link" class="send-code-btn">发送验证码</a-button>
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {PropType} from "vue";
  import type {userType} from "@/types/user";
  import {reactive} from "vue";
  import {checkTelephone} from "@/libs/validate/validate";

  const labelCol = {span: 0};
  const wrapperCol = {span: 24};

  const props = defineProps({
    user: {
      type: Object as PropType<userType>
    }
  })

  const rulesRef = {
    code: [
      {required: true, validator: checkTelephone, trigger: 'change'}
    ],
  };

  const formPrevious = reactive({
    id: props.user.id,
    code: ''
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
