<template>
  <div class="message-item">
    <div class="message-avatar">
      <img :src="data.userId ? data.userInfo.avatar : data.avatar" alt="头像"/>
    </div>
    <div class="message-right">
      <div class="message-nickname">{{ data.userId ? data.userInfo.nickname : data.nickname }}</div>
      <div class="message-time-area">
        <div class="create-time" :title="data.createTime">
          {{ $dayjs().to(data.createTime) }}
        </div>
        <div class="create-area" v-if="data.adname">・{{ data.adname }}</div>
      </div>
      <div class="message-content">{{ data.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss">
.message-item {
  display: flex;

  .message-avatar {
    margin-top: 4px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;

    img {
      height: 100%;
      width: 100%;
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
