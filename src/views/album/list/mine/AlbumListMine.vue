<template>
  <div class="album-list">
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
</template>

<script setup lang="ts">
import EmptyPage from '@/components/common/system/EmptyPage.vue';
import NavLink from '@/components/common/header/menu/child/NavLink.vue';

const menus = [
  {
    title: '相册',
    path: '/album/mine',
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
  height: 100%;
  display: flex;

  .mine-album-menu {
    width: 240px;
    height: 100%;
    background-color: var(--youyu-body-background2);

    ::v-deep(a) {
      display: block;
      height: 100%;
      width: 100%;
      color: var(--youyu-text) !important;

      &.router-link-active {
        color: #1890ff !important;
      }
    }

    .album-mine-menu-item {
      height: 42px;
      line-height: 42px;
      padding-left: 22px;
      margin: 6px;
      border-radius: 6px;

      .i-icon {
        margin-right: 6px;
      }

      .nav-link {
        justify-content: flex-start;
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
</style>
