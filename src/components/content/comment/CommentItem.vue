<template>
  <div class="comment-item">
    <div class="user-avatar">
      <img :src="data.avatar"/>
    </div>
    <div class="content-box">
      <div class="user-box">
        <div class="user-nickname">{{data.nickname}}</div>
        <div class="create-time" :title="data.createTime">{{dayjs().to(dayjs(data.createTime))}}</div>
      </div>
      <div class="comment-content">
        {{data.content}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import RelativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(RelativeTime);


  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .comment-item {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    padding: 16px 0;

    .user-avatar {
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .content-box {
      flex: 1 1 auto;
      margin-left: 12px;

      .user-box {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 4px;

        .user-nickname {
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .create-time {
          font-size: 14px;
          color: #8a919f;
          margin-left: auto;
        }
      }

      .comment-content {
        font-weight: 400;
        font-size: 14px;
        line-height: 2rem;
        color: #515767;
        margin-top: 8px;
      }
    }
  }
</style>
