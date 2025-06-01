<template>
  <div class="comment-hint">
    <div class="comment-hint-items">
      <div class="hint-item">
        <i-info theme="filled" size="24" fill="#637792"/>
        <div class="hint-text">
          您尚未
          <span class="login-btn" @click="handleLogin">登录</span>
        </div>
      </div>
      <div class="hint-item">
        <i-check-one theme="filled" size="20" fill="#67c23a"/>
        <div class="hint-text">登录后参与交流、发表评论</div>
      </div>
      <div class="hint-item">
        <i-check-one theme="filled" size="20" fill="#67c23a"/>
        <div class="hint-text">获取后续更新提醒</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from 'vuex';

  const {commit} = useStore();

  function handleLogin() {
    commit("changeLogin", true);
  }
</script>

<style lang="scss" scoped>
  .comment-hint {
    display: flex;
    justify-content: center;
    height: 100%;
    background-color: var(--youyu-body-background);
    padding: 24px;
    border-radius: 6px;

    .comment-hint-items {
      .hint-item {
        display: flex;
        align-items: center;

        .hint-text {
          font-size: 18px;
          font-weight: 700;
          color: #637792;
          margin-left: 5px;

          .login-btn {
            color: #1890ff;
            cursor: pointer;
            margin-left: 2px;
            transition: .3s;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        &:nth-child(n+2) {
          padding-left: 1.5px;

          .hint-text {
            font-size: 16px;
            font-weight: normal;
            color: inherit;
          }
        }
      }
    }
  }
</style>
