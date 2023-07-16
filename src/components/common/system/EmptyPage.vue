<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"></component>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"></component>
  </router-view>
</template>

<script>
  export default {
    name: "EmptyPage",
  }
</script>

<style scoped>

</style>
