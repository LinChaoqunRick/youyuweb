<template>
  <div class="reply-container">
    <div class="reply-info">
      <div class="user-info">
        <img :src="data.user.avatar"/>
        <div class="user-nickname">{{data.user.nickname}}</div>
      </div>
      <p class="reply-text">回复</p>
      <div class="user-info">
        <img :src="data.userTo.avatar"/>
        <div class="user-nickname">{{data.userTo.nickname}}</div>
      </div>
    </div>
    <div class="reply-content" v-html="data.content">

    </div>
    <div class="reply-operation">
      <div class="ope-item">
        <i-good-two theme="outline" size="16" fill="currentColor"/>
        点赞
      </div>
      <div class="ope-item">
        <i-comment theme="outline" size="16" fill="currentColor"/>
        回复
      </div>
      <div class="ope-item delete-ope">
        删除
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object
    }
  })
</script>

<style lang="scss" scoped>
  .reply-container {

    .reply-info {
      display: flex;
      align-items: center;

      .user-info {
        display: flex;
        align-items: center;

        img {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          margin-right: 4px;
        }

        .user-nickname {
          font-weight: bold;
        }
      }

      .reply-text {
        margin: 0 4px;
        font-size: 14px;
      }
    }

    .reply-content {
      font-size: 16px;
      margin: 8px 0;
    }

    .reply-operation {
      display: flex;
      align-items: center;

      .ope-item {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8a919f;
        margin-right: 10px;
        padding-top: 6px;
        cursor: pointer;

        &:hover {
          color: #1890ff;
        }

        &.delete-ope {
          color: #ff4d4f;
          margin-left: auto;
          display: none;
        }

        ::v-deep(.i-icon) {
          margin-right: 3px;

          &.i-icon-comment {
            position: relative;
            top: 2px;
          }
        }
      }
    }

    &:hover {
      .delete-ope {
        display: inherit;
      }
    }
  }
</style>
