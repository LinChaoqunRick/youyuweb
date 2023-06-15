<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive include="PostList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
  console.log(1111);
</script>

<style lang="scss" scoped>

</style>
