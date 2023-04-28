<template>
  <div class="post-list">
    <YTable listUrl="getPostList" :params="listParams" :beforeGetData="beforeGetData">
      <template #default="{dataList}">
        <div v-for="(item, index) in dataList" class="article-body" :key="item.postId" ref="postItem">
          <PostItem :data="item" :index="index"/>
        </div>
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

<style scoped>

</style>
