<template>
  <div class="post-list">
    <YTable listUrl="getPostList" :params="listParams" :beforeGetData="beforeGetData">
      <template #default="{dataList}">
        <PostItem v-for="(item, index) in dataList" :key="item.postId" :data="item" :index="index"/>
      </template>
    </YTable>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive} from 'vue';
  import {useRoute} from "vue-router";
  import YTable from "@/components/common/table/YTable.vue";
  import PostItem from "@/views/user/profile/post/PostItem.vue";

  const route = useRoute();

  const listParams = reactive({
    pageSize: 20,
    key: route.query.q
  })

  const beforeGetData = () => {
    return !!route.query.q
  }
</script>

<style lang="scss" scoped>
  .post-list {
    background-color: var(--youyu-background1);
    padding: 10px 0 6px 10px;

    .post-item {
      margin-bottom: 6px;
      border-radius: 2px;
    }
  }
</style>
