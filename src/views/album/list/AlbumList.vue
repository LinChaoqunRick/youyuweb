<template>
  <div class="album-list">
    <div class="album-list-top-menu">
      <nav-link v-for="route in routes" :route="route" :key="route.title" />
      <div id="album-actions"></div>
    </div>
    <div class="album-list-content">
      <empty-page />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavLink from '@/components/common/header/menu/child/NavLink.vue';
import EmptyPage from '@/components/common/system/EmptyPage.vue';

const routes = [
  { path: '/album/list/all', title: '全部相册' },
  { path: '/album/list/mine', title: '个人中心' },
];
</script>

<style lang="scss" scoped>
.album-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: hidden;

  .album-list-top-menu {
    height: 48px;
    display: flex;
    align-items: center;
    background-color: var(--youyu-body-background2);
    padding-left: 121px;

    ::v-deep(.nav-link) {
      position: relative;
      height: fit-content;
      padding: 0 16px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 12px;
        background-color: var(--youyu-text1);
      }

      &:first-child {
        &::before {
          display: none;
        }
      }
    }

    #album-actions {
      flex: 1;
      overflow: hidden;
    }
  }

  .album-list-content {
    flex: 1;
    padding-top: 30px;
    overflow: auto;
  }
}
</style>
