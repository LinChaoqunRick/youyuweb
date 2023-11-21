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
</script>

<style lang="scss" scoped>
  .about-container {
    display: flex;
    justify-content: center;
    height: 100%;
  }
</style>
