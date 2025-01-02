<template>
  <div class="collection-list">
    <div class="collect-menu">
      <RouterLink class="menu-item" v-for="item in menuList" :to="item.path">
        {{ item.name }}
      </RouterLink>
    </div>
    <EmptyPage/>
  </div>
</template>

<script setup>
import {inject} from "vue";
import EmptyPage from "@/components/common/system/EmptyPage.vue";

const user = inject('user');
const menuList = [
  {name: "收藏夹", path: {name: 'userFavoritesFolder', params: {userId: user.value.id}}},
  {name: "专栏", path: {name: 'userFavoritesColumn', params: {userId: user.value.id}}},
  {name: "笔记", path: {name: 'userFavoritesNote', params: {userId: user.value.id}}},
]
</script>

<style lang="scss" scoped>
.collection-list {
  background-color: var(--youyu-body-background2);
  padding: 12px;

  .collect-menu {
    padding-bottom: 12px;

    .menu-item {
      padding: 4px 8px;
      border-radius: 2px;
      margin-right: 4px;
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
