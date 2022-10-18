<template>
  <div id="y-aside">
    <div v-for="item in 60">
      ArticleAside{{item}}
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
  #y-aside {
    background-color: var(--article-background);
    padding: 10px;
    border-radius: 8px;
  }
</style>
