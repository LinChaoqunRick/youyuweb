<template>
  <div class="article-container">
    <ArticleLayout/>
    <div class="article-aside">
      aside
    </div>
  </div>
</template>

<script setup>
  import ArticleLayout from "@/views/article/layout/ArticleLayout.vue"
</script>

<style lang="scss" scoped>
  .article-container {
    display: flex;
    justify-content: center;
    margin: 8px auto;
    max-width: 1150px;

    .article-aside {
      width: 260px;
      background-color: deepskyblue;
      margin-left: 8px;
    }
  }
</style>
