<template>
  <div class="article-layout">
    <div class="article-nav">
      <div class="article-nav-item">
        <router-link to="/article/default">推荐</router-link>
      </div>
      <div class="article-nav-separator">|</div>
      <div class="article-nav-item">
        <router-link to="/article/new">最新</router-link>
      </div>
      <div class="article-nav-separator">|</div>
      <div class="article-nav-item">
        <router-link to="/article/hot">热榜</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "Layout"
  }
</script>

<style lang="scss" scoped>
  .article-layout {
    width: 72%;
    background-color: var(--youyu-body-background1);
    padding: 10px;

    .article-nav {
      display: flex;
      align-items: center;
      padding-bottom: 8px;

      .article-nav-item {
        color: var(--youyu-body-text1);
        padding: 0 10px;
        cursor: pointer;
      }

      .article-nav-separator {
        color: var(--youyu-body-text1);
      }
    }
  }
</style>
