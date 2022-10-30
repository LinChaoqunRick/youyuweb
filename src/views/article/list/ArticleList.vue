<template>
  <div class="article-container">
    <div class="article-list">
      <YTable listUrl="getArticleList">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="article-body" :key="item.blogID">
            <ArticleItem :data="item" :index="index"/>
          </div>
        </template>
      </YTable>
    </div>
    <div class="article-right">
      <ArticleAside v-aside2/>
    </div>
  </div>
</template>

<script setup>
  import YTable from "@/components/common/table/YTable.vue";
  import ArticleItem from "@/components/content/article/ArticleItem.vue";
  import ArticleAside from "../aside/ArticleAside.vue";
</script>

<style lang="scss" scoped>
  .article-container {
    display: flex;
    justify-content: center;
    margin: 8px auto 0 auto;
    max-width: 1100px;

    .article-list {
      flex: 1;
      margin-bottom: 8px;

      .article-body {
        width: 100%;
      }
    }

    .article-right {
      width: 290px;
      margin-left: 8px;
      position: relative;
    }
  }
</style>
