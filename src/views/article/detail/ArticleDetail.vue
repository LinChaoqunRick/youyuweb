<template>
  <div class="article-detail">
    <div class="article-aside">

    </div>
    <div class="article-body">
      <div v-for="item in 100">ArticleDetail</div>
    </div>
    <div class="article-operation">
      点赞
    </div>
    <Teleport to="#header">
      <PercentCounter/>
    </Teleport>
  </div>
</template>

<script setup>
  import PercentCounter from "@/components/common/utils/percentCounter/PercentCounter.vue"

</script>

<style lang="scss" scoped>
  .article-detail {
    max-width: 1150px;
    display: flex;
    margin: 8px auto;
    justify-content: center;

    .article-aside {
      width: 25%;
      background-color: deepskyblue;
    }

    .article-body {
      width: 75%;
      background-color: #fff;
      margin-left: 8px;
      padding: 8px 16px;
    }

    .article-operation {
      position: fixed;
      right: 6%;
      top: 24%;
    }
  }
</style>
