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
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from 'vue';
  import {useRoute, useRouter} from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const type = computed(() => route.query.type)

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
    router.push({path: route.path, query: Object.assign({}, route.query, {type: item.type})})
  }
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
