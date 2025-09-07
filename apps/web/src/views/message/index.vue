<template>
  <div class="message">
    <div class="top-content">
      <a-card title="申请友链">
        <p style="color: red;">
          请按以下格式申请友链，谢谢！
        </p>
        <div ref="templateRef">
          <span>站点名称：</span>
          <span>描述：</span>
          <span>头像：</span>
          <span>网址：</span>
        </div>
        <a @click="onCopyTemplate">复制</a>
      </a-card>
      <a-card title="本站信息">
        <div ref="mineRef">
          <span>站点名称：有语</span>
          <span>描述：一个人是可以做到他想做的一切的，需要的只是坚韧不拔的毅力和持久不懈的努力。</span>
          <span>头像：https://v2.youyul.com/favicon.ico</span>
          <span>网址：https://v2.youyul.com</span>
        </div>
        <a @click="onCopyMime">复制</a>
      </a-card>
    </div>
    <div class="message-view">
      <p class="message-tip">
        🥳注意：所有留言为手动审核后显示，请勿重复操作，谢谢配合！😘
      </p>
      <a-form
        ref="FormRef"
        layout="inline"
        :model="formState"
        :rules="rules"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
      >
        <div class="avatar">
          <img
            v-if="!isLogin"
            :src="formState.avatar"
            alt="默认头像"
            title="点击切换"
            @click="onChangeAvatar"
          >
          <img v-else :src="userInfo.avatar" alt="头像">
        </div>
        <div class="form-box">
          <div v-if="!isLogin" class="form-top">
            <a-form-item class="nickname-item" label="昵称" name="nickname">
              <a-input
                v-model:value="formState.nickname"
                :maxlength="12"
                size="large"
                placeholder="必填：请输入昵称"
              />
            </a-form-item>
            <a-form-item class="email-item" label="邮箱" name="email">
              <a-input
                v-model:value="formState.email"
                size="large"
                :maxlength="50"
                placeholder="必填：请输入邮箱"
              />
            </a-form-item>
            <a-form-item class="home-item" label="主页" name="home">
              <a-input
                v-model:value="formState.home"
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
      <div class="message-list">
        <div class="list-title">
          全部留言({{ total }})
        </div>
        <ContentList
          ref="ContentListRef"
          v-model:total="total"
          url="listMessage"
          auto-load
          data-text="留言"
          class="message-content-list"
        >
          <template #default="{ list }">
            <MessageItem v-for="item in list as Message[]" :key="item.id" :data="item" />
          </template>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { copyToClipboard } from '@/assets/utils/utils';
import ContentList from '@/components/common/system/ContentList.vue';
import { checkEmail } from '@/libs/validate/validate';
import MessageItem from '@/views/message/components/MessageItem.vue';
import type { Barrage } from '@/views/message/types';
import type {Message} from '@/views/message/types';
import type { FormInstance, Input } from 'ant-design-vue';

const formState = reactive<Barrage>({
  avatar: '',
  nickname: '',
  email: '',
  home: '',
  content: ''
});

const { getters, dispatch } = useStore();
const isLogin = computed(() => getters['isLogin']);
const userInfo = computed(() => getters['userInfo']);
const FormRef = ref<FormInstance | null>(null);
const ContentTextareaRef = ref<InstanceType<typeof Input> | null>(null);
const templateRef = ref<HTMLDivElement>();
const mineRef = ref<HTMLDivElement>();
const btnLoading = ref(false);
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
  'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default/male10.png'
];

let defaultAvatarIndex = Math.floor(Math.random() * defaultAvatarList.length);

formState.avatar = defaultAvatarList[defaultAvatarIndex];

const rules = {
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { required: true, validator: checkEmail, trigger: 'change' }
  ],
  content: [{ required: true, message: '请输入内容' }]
};

const onFinish = () => {
  btnLoading.value = true;
  if (isLogin.value) {
    formState.userId = userInfo.value.id;
  }
  dispatch('createMessage', formState)
    .then(_ => {
      message.success('发布成功');
      formState.content = '';
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const onChangeAvatar = () => {
  defaultAvatarIndex = ++defaultAvatarIndex % defaultAvatarList.length;
  formState.avatar = defaultAvatarList[defaultAvatarIndex];
};

const onCopyTemplate = () =>{
  copyToClipboard(templateRef.value!.innerText);
}

const onCopyMime = () =>{
  copyToClipboard(mineRef.value!.innerText);
}
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  padding-top: 30px;
  overflow: hidden;
  background-color: var(--youyu-body-background1);

  .top-content {
    display: flex;
    justify-content: center;

    ::v-deep(.ant-card) {
      width: 36vw;

      &:nth-child(n+2) {
        margin-left: 30px;
      }

      .ant-card-body {
        font-size: 16px;

        span {
          display: block;
          margin: 4px 0;
        }
      }
    }
  }

  .message-view {
    padding: 30px 50px 0;

    .message-tip {
      margin-bottom: 30px;
      font-size: 24px;
      color: red;
      text-align: center;
    }

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
