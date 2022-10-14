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
    <div class="article-aside">
      aside
    </div>
  </div>
</template>

<script setup>
  import YTable from "@/components/common/table/YTable.vue";
  import ArticleItem from "@/components/content/article/ArticleItem.vue";
</script>

<style lang="scss" scoped>
  .article-container {
    display: flex;
    justify-content: center;
    margin: 8px auto;
    max-width: 1100px;

    .article-list {
      width: 75%;

      .article-body {
        margin-bottom: 8px;
        width: 100%;
      }
    }

    .article-aside {
      width: 25%;
      background-color: deepskyblue;
      margin-left: 8px;
      padding: 10px;
    }
  }
</style>
