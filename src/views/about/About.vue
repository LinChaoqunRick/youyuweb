<template>
  <div class="about-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
  console.log(123123123);
</script>

<style lang="scss" scoped>
  .about-container {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
</style>
