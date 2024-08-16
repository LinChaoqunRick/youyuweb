<template>
  <div class="post-list">
    <div class="article-list">
      <YTable listUrl="getPostList" :params="{ pageSize: 15 }">
        <template #default="{ dataList }">
          <div v-for="(item, index) in dataList" v-slide-in class="article-body" :key="item.id" ref="postItem">
            <PostItem :data="item" :index="index" />
          </div>
        </template>
      </YTable>
    </div>
    <div class="article-right">
      <PostAside v-aside3 />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostList',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import YTable from '@/components/common/table/YTable.vue';
import PostItem from '@/components/content/post/PostItem.vue';
import PostAside from '../aside/PostAside.vue';

const postItem = ref([]);
</script>

<style lang="scss" scoped>
.post-list {
  display: flex;
  justify-content: center;
  padding: 8px 0;

  .article-list {
    width: 54%;
    max-width: 860px;

    .article-body {
      width: 100%;
    }
  }

  .article-right {
    width: 300px;
    margin-left: 8px;
    position: relative;
  }
}
</style>
