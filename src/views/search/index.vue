<template>
  <div class="search">
    <div class="view-navigation">
      <div class="sort-banner">
        <div class="menu-item" :class="{'active-item':type == menu.type}" v-for="menu in sortList">{{menu.title}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useRoute} from "vue-router";

  const route = useRoute();
  const type = ref(route.query.type)

  const sortList = [
    {
      title: '文章',
      type: 1
    },
    {
      title: '用户',
      type: 2
    }
  ];
</script>

<style lang="scss" scoped>
  .search {
    .view-navigation {
      height: 48px;
      background-color: var(--youyu-navigation);

      .sort-banner {
        display: flex;
        align-items: center;
        width: 960px;
        height: 100%;
        margin: auto;

        .menu-item {
          margin-right: 20px;
          cursor: pointer;
          color: #909090;

          &.active-item {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
