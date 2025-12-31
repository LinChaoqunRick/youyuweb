<template>
  <div v-if="isLogin" class="album-list">
    <div class="mine-album-menu">
      <div v-for="(item, index) in menus" :key="index" class="album-mine-menu-item">
        <nav-link :route="item">
          <component :is="item.icon" theme="outline" size="16" fill="currentColor" :stroke-width="3"></component>
          <span>{{ item.title }}</span>
        </nav-link>
      </div>
    </div>
    <div class="view-container">
      <base-layout />
    </div>
  </div>
  <div v-else class="login-hit mt-8">
    <div class="hint-text">登录以查看更多内容</div>
    <a-button v-login type="primary">立即登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import NavLink from '@/components/common/header/menu/child/NavLink.vue';
import BaseLayout from '@/components/common/system/BaseLayout.vue';

defineOptions({
  name: 'AlbumListMine',
});

const { getters } = useStore();

const isLogin = computed(() => getters['isLogin']);

const menus = [
  {
    title: '相册',
    path: '/album/mine/page',
    icon: 'i-picture-album',
    // exact: true,
  },
  {
    title: '回收站',
    path: '/album/mine/recycle',
    icon: 'i-delete',
  },
];
</script>

<style lang="scss" scoped>
.album-list {
  display: flex;
  height: 100%;

  .mine-album-menu {
    width: 213px;
    height: 100%;
    background-color: var(--youyu-body-background2);

    .album-mine-menu-item {
      height: 42px;
      padding-left: 22px;
      margin: 6px;
      line-height: 42px;
      border-radius: 6px;

      .i-icon {
        margin-right: 6px;
      }

      ::v-deep(.nav-link) {
        a {
          display: block;
          width: 100%;
          height: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .hint-text {
    margin-bottom: 20px;
  }
}
</style>
