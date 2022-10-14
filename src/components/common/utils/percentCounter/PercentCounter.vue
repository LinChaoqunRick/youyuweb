<template>
  <div class="percent-counter" :style="{width: `${percent}%`}"></div>
</template>

<script setup>
  import {ref, onMounted, onUnmounted} from 'vue';

  const percent = ref(0);

  function handleScroll() {
    console.log("handleScroll");
    let hideHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    percent.value = document.documentElement.scrollTop / hideHeight * 100;
    console.log(percent.value);
  }

  onMounted(() => {
    document.addEventListener("scroll", handleScroll, false);
  })
  onUnmounted(() => {
    document.removeEventListener("scroll", handleScroll, false);
  })
</script>

<style lang="scss" scoped>
  .percent-counter {
    height: 2px;
    width: 0;
    position: absolute;
    background-color: #1980ff;
    bottom: -1px;
    left: 0;
  }
</style>
