<template>
  <div class="message-item">
    <div class="message-avatar">
      <img :src="data.userId ? data.userInfo.avatar : data.avatar" alt="头像">
    </div>
    <div class="message-right">
      <div class="message-nickname">
        {{ data.userId ? data.userInfo.nickname : data.nickname }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Message } from '@/views/message/types';

defineProps({
  data: {
    type: Object as PropType<Message>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.message-item {
  display: flex;

  .message-avatar {
    width: 36px;
    height: 36px;
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
    .message-time-area {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #909090;
    }

    .message-content {
      font-size: 16px;
    }
  }
}
</style>
