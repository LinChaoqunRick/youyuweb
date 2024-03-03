<template>
  <div class="message">
    <div class="barrage-wrapper">
      <div v-for="(item, index) in showList" v-slide-in-left="onShowFinish(item, index)" class="barrage-item">
        {{ item.content }}
      </div>
      <div class="locate-button" :class="{ 'is-hide': formVisible }">
        <a-button type="primary" shape="round" @click="onLocate">
          <template #icon>
            <i-send-one theme="outline" size="16" fill="currentColor" />
          </template>
          我也说一句
        </a-button>
      </div>
    </div>
    <div class="message-list">
      <a-form
        layout="inline"
        :model="formState"
        :rules="rules"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        ref="FormRef"
      >
        <div class="form-top">
          <a-form-item class="nickname-item" label="昵称" name="nickname">
            <a-input v-model:value="formState.nickname" :maxlength="10" size="large" placeholder="必填：请输入昵称" />
          </a-form-item>

          <a-form-item class="email-item" label="邮箱" name="email">
            <a-input v-model:value="formState.email" size="large" :maxlength="50" placeholder="必填：请输入邮箱" />
          </a-form-item>

          <a-form-item class="home-item" label="主页" name="home">
            <a-input v-model:value="formState.home" size="large" :maxlength="50" placeholder="选填：请输入主页" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" :loading="btnLoading" size="large" html-type="submit">
              <i-send-one theme="outline" size="16" fill="currentColor" />
              提交
            </a-button>
          </a-form-item>
        </div>
        <div class="form-bottom">
          <a-form-item class="content-item" label="内容" name="content">
            <a-textarea
              v-model:value="formState.content"
              :maxlength="200"
              size="large"
              placeholder="必填：请输入内容"
              ref="ContentTextareaRef"
            />
          </a-form-item>
          <a-popover placement="leftBottom" overlayClassName="message-content-emoji-popover" trigger="click">
            <template #content>
              <Emoji @emojiHandler="emojiHandler" />
            </template>
            <i-smiling-face theme="outline" size="22" fill="currentColor" style="cursor: pointer" />
          </a-popover>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useIntersectionObserver } from '@vueuse/core';
import { insert } from '@/assets/utils/utils';
import Emoji from '@/components/common/utils/emoji/index.vue';
import { message } from 'ant-design-vue';
import { checkEmail } from '@/libs/validate/validate';
import { useRequest } from 'vue-request';

const formState = reactive({
  nickname: '',
  email: '',
  home: '',
  content: '',
});
const { dispatch } = useStore();
const FormRef = ref(null);
const ContentTextareaRef = ref(null);
const formVisible = ref(false);
const btnLoading = ref(false);
const pageNum = ref(1);
const totalNum = ref(0);
const dataList = ref([]);
const showList = ref([]);

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
  FormRef.value.$el.scrollIntoView({
    behavior: 'smooth',
  });
};

const emojiHandler = emoji => {
  const textarea = ContentTextareaRef.value.$el;
  if (textarea) {
    formState.content = insert(textarea, emoji, {});
  }
};

const onFinish = values => {
  btnLoading.value = true;
  dispatch('createMessage', formState)
    .then(res => {
      message.success('发布成功');
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const initData = async () => {
  await dispatch('listMessage', { pageNum: pageNum.value }).then(res => {
    dataList.value.push(res.data.list);
    res.data.list.forEach((item, index) => {
      setTimeout(() => showList.value.push(item), 2000 * (index + 1));
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

const onShowFinish = (item, index) => {
  return () => {
    showList.value = showList.value.filter(i => {
      console.log(i.id, item.id);
      return i.id != item.id;
    });
  };
};
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  overflow: hidden;

  .barrage-wrapper {
    position: relative;
    height: calc(100vh - 60px);

    .barrage-item {
      position: absolute;
    }

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

  .message-list {
    padding: 24px 50px;
    background-color: var(--youyu-background1);

    ::v-deep(.ant-form) {
      display: flex;
      flex-direction: column;

      .form-top {
        display: flex;
        margin-bottom: 24px;

        .ant-form-item {
          &.nickname-item,
          &.email-item,
          &.home-item {
            flex: 1;
          }

          .ant-form-item-control {
            div {
              &:nth-child(n + 2) {
                height: 0 !important;
              }
            }
          }
        }
      }

      .form-bottom {
        position: relative;
        display: inline-flex;

        .content-item {
          flex: 1;
        }

        .i-icon {
          position: absolute;
          right: -20px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
        }
      }

      .ant-form-item-label {
        display: none;
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