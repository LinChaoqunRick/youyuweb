<template>
  <div class="article-aside" id="article-aside" :class="{'sticky-bottom': sticky}">
    <div v-for="item in 80">
      ArticleAside{{item}}
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted, onUnmounted} from "vue";
  import {getElementTop} from "@/assets/utils/utils";

  const sticky = ref(false);
  let articleAside: HTMLElement | null;
  let asideHeight: number | undefined;  // aside的clientHeight
  let bodyScrollBottom: number; // 文档滚顶的底部距离

  function handleScroll() {
    bodyScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    // console.log(getElementTop(articleAside));
    // console.log(asideHeight);
    if (bodyScrollBottom >= getElementTop(articleAside) + articleAside?.clientHeight) {
      console.log("true");
      sticky.value = true;
    } else {
      console.log("false");
      sticky.value = false;
    }
  }

  onMounted(() => {
    articleAside = document.getElementById("article-aside");
    asideHeight = articleAside?.clientHeight
    window.addEventListener("scroll", handleScroll, false);
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll, false);
  })

</script>

<style lang="scss" scoped>
  .article-aside {
    position: sticky;
    bottom: 8px;
    width: 100%;
    min-height: calc(100vh - 78px);
    background-color: skyblue;
  }

  .sticky-bottom {
    /*position: sticky;*/
    /*top: 0;*/
    /*bottom: 8px;*/
  }
</style>
