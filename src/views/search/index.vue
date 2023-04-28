<template>
  <div class="search">
    <div class="view-navigation">
      <div class="sort-banner">
        <div v-for="menu in sortList"
             class="menu-item"
             @click="onClick(menu)"
             :class="{'active-item':type == menu.type}">
          {{menu.title}}
        </div>
      </div>
    </div>
    <div class="search-content">
      <PostList/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, onActivated} from 'vue';
  import {useRoute, useRouter} from "vue-router";
  import PostList from "./components/PostList.vue";

  const route = useRoute();
  const router = useRouter();
  const type = computed(() => route.query.type)

  document.title = `搜索 · ${route.query.q}`

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

  const onClick = (item) => {
    // router.push({path: route.path, query: Object.assign({}, route.query, {type: item.type})});
  }
</script>

<style lang="scss" scoped>
  .search {
    padding-top: 56px;

    .view-navigation {
      position: fixed;
      left: 0;
      right: 0;
      top: 60px;
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

    .search-content {
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: var(--youyu-background1);
    }
  }
</style>
