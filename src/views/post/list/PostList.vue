<template>
  <div class="post-list">
    <div class="article-list">
      <YTable listUrl="getPostList" @onLoaded="onLoaded">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="article-body" :key="item.postId" ref="postItem">
            <PostItem :data="item" :index="index"/>
          </div>
        </template>
      </YTable>
    </div>
    <div class="article-right">
      <PostAside v-aside3/>
    </div>
  </div>
</template>

<script setup>
  import {ref, nextTick} from "vue";
  import {useIntersectionObserver} from '@vueuse/core';
  import {addClass} from "@/assets/utils/utils.ts"

  import YTable from "@/components/common/table/YTable.vue";
  import PostItem from "@/components/content/post/PostItem.vue";
  import PostAside from "../aside/PostAside.vue";

  const postItem = ref([]);

  const onLoaded = () => {
    // nextTick(() => {
    //   postItem.value.forEach(item => {
    //     const {stop} = useIntersectionObserver(
    //       item,
    //       ([{isIntersecting}], observerElement) => {
    //         if (isIntersecting) {
    //           addClass(item, "animate__animated")
    //           addClass(item, "animate__fadeIn")
    //           stop();
    //         }
    //       },
    //     )
    //   })
    // })
  }
</script>

<style lang="scss" scoped>
  .post-list {
    display: flex;
    justify-content: center;
    padding: 8px 0;

    .article-list {
      width: 54%;
      margin-bottom: 8px;

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
