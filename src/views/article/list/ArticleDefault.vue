<template>
  <div class="article-list">
    <YTable listUrl="getArticleList">
      <template #default="{dataList}">
        <div v-for="(item, index) in dataList" class="article-body" :key="item.blogID">
          <ArticleItem :data="item" :index="index"/>
        </div>
      </template>
    </YTable>
  </div>
</template>

<script setup>
  import YTable from "@/components/common/table/YTable.vue";
  import ArticleItem from "@/components/content/article/ArticleItem.vue";
</script>

<style lang="scss" scoped>
  .article-list {
    width: 100%;

    .article-body {
      margin-bottom: 8px;
      width: 100%;
    }
  }
</style>
