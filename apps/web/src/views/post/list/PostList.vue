<template>
  <div class="post-list">
    <div class="article-list">
      <YTable list-url="getPostList" :params="{ pageSize: 15 }">
        <template #default="{ dataList }">
          <div v-for="(item, index) in dataList" :key="item.id" ref="postItem" v-slide-in class="article-body">
            <PostItem :data="item" :index="index" />
          </div>
        </template>
      </YTable>
    </div>
    <div class="article-right">
      <PostAside v-side-fixed />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import YTable from '@/components/common/table/YTable.vue';
import PostItem from '@/components/content/post/PostItem.vue';
import PostAside from '../aside/PostAside.vue';

defineOptions({
  name: 'PostList',
});

const postItem = ref([]);

onMounted(() => {
  console.log('PostList');
});
</script>

<style lang="scss" scoped>
.post-list {
  display: flex;
  justify-content: center;
  padding: 8px 0;

  .article-list {
    width: 50%;

    .article-body {
      width: 100%;
    }
  }

  .article-right {
    position: relative;
    width: 300px;
    margin-left: 8px;
  }
}
</style>
