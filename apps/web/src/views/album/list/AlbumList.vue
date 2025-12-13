<template>
  <div class="album-list">
    <div class="album-list-top-menu">
      <nav-link v-for="route in routes" :key="route.title" :route="route" />
    </div>
    <div class="album-list-content">
      <empty-page />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import NavLink from '@/components/common/header/menu/child/NavLink.vue';
import EmptyPage from '@/components/common/system/EmptyPage.vue';

const { getters } = useStore();
const isLogin = computed(() => getters['isLogin']);

const routes = [{ path: '/album/list/all', title: '全部相册' }];
if (isLogin.value) {
  routes.push({ path: '/album/list/mine', title: '个人中心' });
}
</script>

<style lang="scss" scoped>
.album-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: hidden;

  .album-list-top-menu {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 121px;
    background-color: var(--youyu-body-background2);
    border-bottom: var(--youyu-navigation-border);

    ::v-deep(.nav-link) {
      position: relative;
      height: fit-content;
      padding: 0 16px;

      &::before {
        position: absolute;
        left: 0;
        width: 1px;
        height: 12px;
        background-color: var(--youyu-text1);
        content: '';
      }

      &:first-child {
        &::before {
          display: none;
        }
      }
    }
  }

  .album-list-content {
    flex: 1;
    overflow: auto;
  }
}
</style>
