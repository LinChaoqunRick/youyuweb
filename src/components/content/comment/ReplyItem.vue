<template>
  <div class="reply-container">
    <div class="reply-info">
      <div class="user-info">
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <img :src="data.user.avatar"/>
        </a-popover>
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <div class="user-nickname">{{data.user.nickname}}</div>
        </a-popover>
      </div>
      <p class="reply-text" v-if="data.userTo">回复</p>
      <div class="user-info" v-if="data.userTo">
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.userTo"/>
          </template>
          <img :src="data.userTo.avatar"/>
        </a-popover>
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <div class="user-nickname">{{data.userTo.nickname}}</div>
        </a-popover>
      </div>
    </div>
    <div class="reply-content" v-html="data.content">

    </div>
    <div class="reply-operation">
      <div class="ope-item">
        <i-good-two theme="outline" size="16" fill="currentColor"/>
        点赞<span v-if="data.supportCount">({{data.supportCount}})</span>
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
  import UserCard from "@/components/content/comment/UserCard.vue";

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
          cursor: pointer;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          margin-right: 4px;
        }

        .user-nickname {
          cursor: pointer;
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
      margin-left: 30px;
    }

    .reply-operation {
      display: flex;
      align-items: center;
      margin-left: 30px;


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
            top: 1.5px;
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
