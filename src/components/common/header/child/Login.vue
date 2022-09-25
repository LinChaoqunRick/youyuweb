<template>
  <a-popover v-model:visible="visible" trigger="click" overlayClassName="login-container">
    <template #content>
      <h3 class="login-tips">您尚未登录，登录后您可以：</h3>
      <ul class="login-guide-list">
        <li class="login-guide-list-item" v-for="item in guideList">
          <div class="login-guide-icon-wrap">
            <component :is="item.icon" size="16" fill="#1e80ff"/>
          </div>
          <div class="login-guide-text">
            {{item.label}}
          </div>
        </li>
      </ul>
      <a-button type="primary" block class="guide-login-button" @click="handleLogin">立即登录</a-button>
      <div class="register-tips">首次使用？<a type="text">点我注册</a></div>
    </template>
    <button class="login-button">登录&ensp;|&ensp;注册</button>
  </a-popover>
  <transition name="fade">
    <LoginPanel v-if="loginPanelStatus"/>
  </transition>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {computed} from 'vue';
  import {useStore} from "vuex";

  import LoginPanel from "./LoginPanel.vue";

  const guideList = ref([
    {
      label: "发布博客随笔",
      icon: "icon-write"
    },
    {
      label: "参与交流评论",
      icon: "icon-comment"
    },
    {
      label: "收藏有用文章",
      icon: "icon-star"
    },
    {
      label: "关注优秀作者",
      icon: "icon-user"
    },
    {
      label: "获取后续提醒",
      icon: "icon-remind"
    },
    {
      label: "其他更多功能",
      icon: "icon-more"
    },
  ]);

  const visible = ref<boolean>(false);

  let {getters, commit} = useStore();
  let loginPanelStatus = computed(() => getters['loginPanelStatus'])

  const handleLogin = () => {
    visible.value = false;
    commit("changeLogin", true);
  }
</script>

<style lang="scss" scoped>
  .login-button {
    background: rgba(30, 128, 255, .05);
    border: 1px solid rgba(30, 128, 255, .3);
    border-radius: 4px;
    color: #007fff;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    height: 38px;
    width: 112px;
    cursor: pointer;
  }

  .login-tips {
    font-weight: bold;
    color: var(--youyu-login-color);
  }

  .login-guide-list {
    width: 300px;
    display: flex;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    align-items: center;

    .login-guide-list-item {
      width: 120px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:nth-child(2n) {
        margin-left: 36px;
      }

      .login-guide-icon-wrap {
        width: 28px;
        height: 28px;
        border-radius: 14px;
        background-color: #eaf2ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .login-guide-text {
        margin-left: 8px;
        color: var(--youyu-login-color);
      }
    }

    p:nth-child(n + 2) {
      margin-left: 6px;
    }
  }

  .guide-login-button {
    /*width: 100%;*/
    height: 38px;
  }

  .register-tips {
    color: #8a919f;
    font-size: 13px;
    line-height: 22px;
    text-align: center;
    margin-top: 10px;
  }
</style>

<style lang="scss">
  .login-container.ant-popover {
    .ant-popover-arrow-content {
      background-color: var(--youyu-login-background);
    }

    .ant-popover-inner {
      background-color: var(--youyu-login-background);
      color: var(--youyu-login-color);
    }
  }
</style>
