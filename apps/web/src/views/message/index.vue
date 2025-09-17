<template>
  <div class="message">
    <div class="top-content">
      <a-card title="申请友链">
        <p style="color: red;">
          请按以下格式申请友链，谢谢！
        </p>
        <div ref="templateRef">
          <span>站点名称：(必填)</span>
          <span>网址：(必填)</span>
          <span>头像：(必填)</span>
          <span>简介：(选填)</span>
        </div>
        <a @click="onCopyTemplate">复制</a>
      </a-card>
      <a-card title="本站信息">
        <div ref="mineRef">
          <span>站点名称：有语</span>
          <span>网址：https://v2.youyul.com</span>
          <span>头像：https://v2.youyul.com/favicon.ico</span>
          <span>简介：一个人是可以做到他想做的一切的，需要的只是坚韧不拔的毅力和持久不懈的努力。</span>
        </div>
        <a @click="onCopyMime">复制</a>
      </a-card>
    </div>
    <div class="message-view">
      <p class="message-tip">
        🥳注意：所有留言为手动审核后显示，请勿重复操作，谢谢配合！😘
      </p>
      <MessageForm />
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
import { ref } from 'vue';
import { copyToClipboard } from '@/assets/utils/utils';
import ContentList from '@/components/common/system/ContentList.vue';
import MessageForm from '@/views/message/components/MessageForm.vue';
import MessageItem from '@/views/message/components/MessageItem.vue';
import type { Message } from '@youyu/shared/types/vo';

const templateRef = ref<HTMLDivElement>();
const mineRef = ref<HTMLDivElement>();
const total = ref(0);

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
