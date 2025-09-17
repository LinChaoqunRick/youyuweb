<template>
  <a-spin :spinning="spinning" tip="检索中...">
    <a-form
      ref="FormRef"
      class="message-form"
      layout="inline"
      :model="formState"
      :rules="rules"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <div class="avatar">
        <a-avatar size="large" :style="{ backgroundColor: '#1890ff', verticalAlign: 'middle' }">
          {{ formState.nickname ? formState.nickname?.substring(0, 3) : '游客' }}
        </a-avatar>
      </div>
      <div class="form-box">
        <div v-if="!isLogin" class="form-top">
          <a-form-item
            class="email-item"
            label="邮箱"
            name="email"
            validate-first
          >
            <a-input
              v-model:value="formState.email"
              size="large"
              :maxlength="50"
              placeholder="必填：请输入邮箱"
              @blur="onFindVisitor"
            />
          </a-form-item>
          <a-form-item class="nickname-item" label="昵称" name="nickname">
            <a-input
              v-model:value="formState.nickname"
              :maxlength="12"
              size="large"
              placeholder="必填：请输入昵称"
            />
          </a-form-item>
          <a-form-item class="homepage-item" label="主页" name="homepage">
            <a-input
              v-model:value="formState.homepage"
              size="large"
              :maxlength="50"
              placeholder="选填：请输入主页"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              :loading="btnLoading"
              size="large"
              html-type="submit"
            >
              <i-send-one theme="outline" size="16" fill="currentColor" />
              提交
            </a-button>
          </a-form-item>
        </div>
        <div class="form-bottom">
          <a-form-item class="content-item" label="内容" name="content">
            <a-textarea
              ref="ContentTextareaRef"
              v-model:value="formState.content"
              type="textarea"
              :rows="4"
              :maxlength="500"
              size="large"
              placeholder="必填：请输入内容"
            />
          </a-form-item>
        </div>
      </div>
    </a-form>
  </a-spin>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { type FormInstance, type Input, message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { checkEmail } from '@/libs/validate/validate';
import type { Message } from '@youyu/shared/types/vo';

const btnLoading = ref(false);

const { getters, dispatch } = useStore();
const isLogin = computed(() => getters['isLogin']);
const userInfo = computed(() => getters['userInfo']);

const FormRef = ref<FormInstance>();
const ContentTextareaRef = ref<InstanceType<typeof Input> | null>(null);
const spinning = ref(false);

const rules = {
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { required: true, validator: checkEmail, trigger: 'change' },
  ],
  content: [{ required: true, message: '请输入内容' }],
};

const formState = reactive<Partial<Message>>({
  avatar: '',
  nickname: '',
  email: '',
  homepage: '',
  content: '',
});

const onFinish = () => {
  btnLoading.value = true;
  if (isLogin.value) {
    formState.userId = userInfo.value.id;
  }
  dispatch('createMessage', formState)
    .then(_ => {
      message.success('发布成功！你的留言将在审核通过后显示');
      formState.content = '';
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const onFindVisitor = () => {
  const { email } = formState;
  if (email) {
    FormRef.value!.validateFields('email').then(() => {
      spinning.value = true;
      dispatch('getVisitorByEmail', {email}).then(res => {
        const {data} = res;
        if (data) {
          Object.keys(formState).forEach(key => {
            formState[key] = data[key];
          })
        }
      }).finally(() => {
        spinning.value = false;
      })
    })
  }
};
</script>

<style lang="scss">
.message-form {
  display: flex;

  .form-box {
    flex: 1;
  }

  .ant-form-item-control {
    div {
      &:nth-child(n + 2) {
        height: 0 !important;
      }
    }
  }

  .form-top {
    display: flex;
    margin-bottom: 24px;

    .ant-form-item {
      &.nickname-item,
      &.email-item,
      &.homepage-item {
        flex: 1;
      }
    }
  }

  .form-bottom {
    position: relative;
    display: flex;

    .content-item {
      flex: 1;

      input {
        padding-right: 35px;
      }
    }

    .i-icon-smiling-face {
      position: absolute;
      top: 8px;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      color: var(--youyu-text2);
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .ant-form-item-label {
    display: none;
  }
}
</style>
