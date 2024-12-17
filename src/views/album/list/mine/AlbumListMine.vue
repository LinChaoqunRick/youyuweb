<template>
  <div class="album-list" v-if="isLogin">
    <div class="mine-album-menu">
      <div v-for="(item, index) in menus" :key="index" class="album-mine-menu-item">
        <nav-link :route="item">
          <component :is="item.icon" theme="outline" size="16" fill="currentColor" :strokeWidth="3"></component>
          <span>{{ item.title }}</span>
        </nav-link>
      </div>
    </div>
    <div class="view-container">
      <empty-page />
    </div>
  </div>
  <div v-else class="login-hit mt-8">
    <div class="hint-text">登录以查看更多内容</div>
    <a-button type="primary" v-login>立即登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import EmptyPage from '@/components/common/system/EmptyPage.vue';
import NavLink from '@/components/common/header/menu/child/NavLink.vue';

const { getters } = useStore();

const isLogin = computed(() => getters['isLogin']);

const menus = [
  {
    title: '相册',
    path: '/album/list/mine/page',
    icon: 'i-picture-album',
    // exact: true,
  },
  {
    title: '回收站',
    path: '/album/list/mine/recycle',
    icon: 'i-delete',
  },
];
</script>

<style lang="scss" scoped>
.album-list {
  height: 100%;
  display: flex;

  .mine-album-menu {
    width: 213px;
    height: 100%;
    background-color: var(--youyu-body-background2);

    .album-mine-menu-item {
      height: 42px;
      line-height: 42px;
      padding-left: 22px;
      margin: 6px;
      border-radius: 6px;

      .i-icon {
        margin-right: 6px;
      }

      ::v-deep(.nav-link) {
        a {
          display: block;
          height: 100%;
          width: 100%;
          color: var(--youyu-text) !important;

          &.router-link-active {
            color: #1890ff !important;
          }
        }
      }

      &:has(.router-link-active) {
        background-color: #e6f4ff;
      }
    }
  }

  .view-container {
    flex: 1;
    overflow: hidden;
  }
}

.login-hit {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .hint-text {
    margin-bottom: 20px;
  }
}
</style>
