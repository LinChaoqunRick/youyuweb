<template>
  <div class="collection-list">
    <div class="collect-menu">
      <RouterLink v-for="item in menuList" class="menu-item" :to="item.path">
        {{ item.name }}
      </RouterLink>
    </div>
    <BaseLayout />
  </div>
</template>

<script setup>
import { inject } from 'vue';
import BaseLayout from '@/components/common/system/BaseLayout.vue';

const user = inject('user');
const menuList = [
  { name: '收藏夹', path: { name: 'userFavoritesFolder', params: { userId: user.value.id } } },
  { name: '专栏', path: { name: 'userFavoritesColumn', params: { userId: user.value.id } } },
  { name: '笔记', path: { name: 'userFavoritesNote', params: { userId: user.value.id } } },
];
</script>

<style lang="scss" scoped>
.collection-list {
  padding: 12px;
  background-color: var(--youyu-body-background2);

  .collect-menu {
    padding-bottom: 12px;

    .menu-item {
      padding: 4px 8px;
      margin-right: 4px;
      border-radius: 2px;
    }

    a {
      color: var(--youyu-text2) !important;

      &.router-link-active {
        color: #1890ff !important;
        background-color: var(--youyu-body-background5);
      }
    }
  }
}
</style>
