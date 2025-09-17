<template>
  <div class="message-item">
    <div class="message-avatar">
      <a-avatar v-if="data.avatar" :src="data.avatar" />
      <a-avatar v-else size="large" :style="{ backgroundColor: '#1890ff', verticalAlign: 'middle' }">
        {{ data.nickname?.substring(0, 3) }}
      </a-avatar>
    </div>
    <div class="message-right">
      <div class="message-nickname">
        {{ data.nickname }}
      </div>
      <div class="message-time-area">
        <div class="create-time" :title="data.createTime">
          {{ data.createTime ? $dayjs().to(data.createTime) : '-' }}
        </div>
        <div v-if="data.adname" class="create-area">
          ・{{ data.adname }}
        </div>
      </div>
      <div class="message-content">
        {{ data.content }}
      </div>
      <div class="message-bottom">
        <span class="reply-text cp" @click="showForm = !showForm">
          {{ showForm ? '取消回复' : '回复' }}
        </span>
        <MessageForm v-if="showForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue';
import MessageForm from '@/views/message/components/MessageForm.vue';
import type { Message } from '@youyu/shared/types/vo';

defineProps({
  data: {
    type: Object as PropType<Message>,
    required: true,
  },
});

const showForm = ref(false);
</script>

<style scoped lang="scss">
.message-item {
  display: flex;
  padding: 12px;
  border: 1px dashed var(--youyu-body-text1);
  border-radius: 16px;

  .message-avatar {
    width: 40px;
    height: 40px;
    margin-top: 4px;
    margin-right: 12px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .message-right {
    width: 100%;

    .message-nickname {
      font-weight: bold;
    }

    .message-time-area {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #909090;
    }

    .message-content {
      margin-top: 8px;
      font-size: 16px;
      white-space: pre-wrap;
    }

    .message-bottom {
      .reply-text {
        display: inline-block;
        margin-top: 4px;
        color: #1890ff;
      }

      ::v-deep(.ant-form) {
        margin: 8px 0 4px;
      }
    }
  }
}
</style>
