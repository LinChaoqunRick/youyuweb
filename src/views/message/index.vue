<template>
  <div class="message">
    <div class="barrage-view gf">
      <Barrage v-model="dataList" />
      <div class="locate-button" :class="{ 'is-hide': formVisible }">
        <a-button type="primary" shape="round" @click="onLocate">
          <template #icon>
            <i-send-one theme="outline" size="16" fill="currentColor" />
          </template>
          我也说一句
        </a-button>
      </div>
    </div>
    <div class="message-view">
      <a-form
        layout="inline"
        :model="formState"
        :rules="rules"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        ref="FormRef"
      >
        <div class="avatar">
          <img v-if="!isLogin" :src="formState.avatar" alt="默认头像" title="点击切换" @click="onChangeAvatar" />
          <img v-else :src="userInfo.avatar" alt="头像" />
        </div>
        <div class="form-box">
          <div class="form-top" v-if="!isLogin">
            <a-form-item class="nickname-item" label="昵称" name="nickname">
              <a-input v-model:value="formState.nickname" :maxlength="12" size="large" placeholder="必填：请输入昵称" />
            </a-form-item>

            <a-form-item class="email-item" label="邮箱" name="email">
              <a-input v-model:value="formState.email" size="large" :maxlength="50" placeholder="必填：请输入邮箱" />
            </a-form-item>

            <a-form-item class="home-item" label="主页" name="home">
              <a-input v-model:value="formState.home" size="large" :maxlength="50" placeholder="选填：请输入主页" />
            </a-form-item>
          </div>
          <div class="form-bottom">
            <a-form-item class="content-item" label="内容" name="content">
              <a-input
                v-model:value="formState.content"
                :maxlength="100"
                size="large"
                placeholder="必填：请输入内容"
                ref="ContentTextareaRef"
              />
              <a-popover placement="leftBottom" overlayClassName="message-content-emoji-popover" trigger="click">
                <template #content>
                  <Emoji @emojiHandler="emojiHandler" />
                </template>
                <i-smiling-face theme="outline" size="22" fill="currentColor" style="cursor: pointer" />
              </a-popover>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" :loading="btnLoading" size="large" html-type="submit">
                <i-send-one theme="outline" size="16" fill="currentColor" />
                提交
              </a-button>
            </a-form-item>
          </div>
        </div>
      </a-form>
      <div class="message-list">
        <div class="list-title">留言({{ total }})</div>
        <ContentList url="listMessage" auto-load data-text="留言" class="message-content-list" ref="ContentListRef">
          <template v-slot="{ list }">
            <MessageItem v-for="item in list" :key="item.id" :data="item" />
          </template>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useIntersectionObserver } from '@vueuse/core';
import { useRequest } from 'vue-request';
import type { FormInstance } from 'ant-design-vue';

import { insert } from '@/assets/utils/utils';
import { message } from 'ant-design-vue';
import { checkEmail } from '@/libs/validate/validate';
import Emoji from '@/components/common/utils/emoji/index.vue';
import Barrage from '@/views/message/Barrage.vue';
import ContentList from '@/components/common/system/ContentList.vue';
import MessageItem from '@/views/message/components/MessageItem.vue';
import type { Message } from '@/views/message/types';

const formState = reactive<Message>({
  avatar: '',
  nickname: '',
  email: '',
  home: '',
  content: '',
  userId: undefined,
});

const { getters, dispatch } = useStore();

const isLogin = computed(() => getters['isLogin']);
const userInfo = computed(() => getters['userInfo']);

const FormRef = ref<FormInstance | null>(null);
const ContentTextareaRef = ref(null);
const formVisible = ref(false);
const btnLoading = ref(false);
const pageNum = ref(1);
const totalNum = ref(0);
const dataList = ref<Array<Message>>([]);
const total = ref(0);
const defaultAvatarList = [
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female1.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female2.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female3.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female4.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female5.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female6.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female7.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female8.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female9.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/female10.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male1.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male2.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male3.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male4.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male5.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male6.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male7.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male8.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male9.png',
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male10.png',
];
let defaultAvatarIndex = Math.floor(Math.random() * defaultAvatarList.length);

formState.avatar = defaultAvatarList[defaultAvatarIndex];

const rules = {
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { required: true, validator: checkEmail, trigger: 'change' },
  ],
  content: [{ required: true, message: '请输入内容' }],
};

const { stop } = useIntersectionObserver(FormRef, ([{ isIntersecting }], observerElement) => {
  formVisible.value = isIntersecting;
});

const onLocate = () => {
  FormRef?.value?.$el.scrollIntoView({
    behavior: 'smooth',
  });
};

const emojiHandler = (emoji: string) => {
  const textarea = ContentTextareaRef?.value?.$el;
  if (textarea) {
    formState.content = insert(textarea, emoji, {});
  }
};

const onFinish = () => {
  btnLoading.value = true;
  if (isLogin.value) {
    formState.userId = userInfo.value.id;
  }
  dispatch('createMessage', formState)
    .then(res => {
      message.success('发布成功');
      formState.content = '';
      dataList.value.push(res.data);
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const initData = async () => {
  await dispatch('listMessage', { pageNum: pageNum.value }).then(res => {
    total.value = res.data.total;
    res.data.list.forEach((item: Message, index: number) => {
      setTimeout(() => dataList.value.push(item), 500 * (index + 1));
    });

    if (pageNum.value >= totalNum.value) {
      // 已加载完全部数据
      loop.cancel();
      return;
    }
    totalNum.value = res.data.pages;
    pageNum.value++;
  });
};

const loop = useRequest(initData, {
  pollingInterval: 5 * 1000,
});

const onChangeAvatar = () => {
  defaultAvatarIndex = ++defaultAvatarIndex % defaultAvatarList.length;
  formState.avatar = defaultAvatarList[defaultAvatarIndex];
};
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  overflow: hidden;

  .barrage-view {
    position: relative;
    height: calc(100vh - 60px);

    .locate-button {
      position: absolute;
      bottom: 20px;
      left: calc(50%);
      transform: translateX(-50%);
      opacity: 1;
      transition: 0.3s;

      &.is-hide {
        opacity: 0;
      }

      ::v-deep(.i-icon) {
        position: relative;
        top: 1px;
        margin-right: 3px;
      }
    }
  }

  .message-view {
    padding: 24px 50px 0 50px;
    background-color: var(--youyu-background1);

    ::v-deep(.ant-form) {
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
          &.home-item {
            flex: 1;
          }
        }
      }

      .form-bottom {
        display: flex;
        position: relative;

        .content-item {
          flex: 1;

          input {
            padding-right: 35px;
          }
        }

        .i-icon-smiling-face {
          position: absolute;
          right: 12px;
          top: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
          color: var(--youyu-text2);
        }
      }

      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .ant-form-item-label {
        display: none;
      }
    }

    .message-list {
      padding: 24px 50px;

      .list-title {
        font-size: 18px;
        font-weight: bold;
      }

      .message-content-list {
        margin-top: 18px;

        ::v-deep(.message-item) {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.message-content-emoji-popover {
  .ant-popover-inner {
    padding: 4px;
  }
}
</style>
