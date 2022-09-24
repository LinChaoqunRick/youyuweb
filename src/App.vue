<template>
  <div class="main-app">
    <YHeader/>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
  import YHeader from '@/components/common/header/YHeader.vue'

  let theme = localStorage.getItem("theme") || 'light';
  // theme === "dark" ? setChecked(true) : setChecked(false);
  document.documentElement.setAttribute("theme", theme);
</script>

<style lang="scss" scoped>
  .main-app {
    height: 100%;
    width: 100%;
    background-color: var(--youyu-body-background);
    padding-top: 60px;
    box-sizing: border-box;
  }
</style>
