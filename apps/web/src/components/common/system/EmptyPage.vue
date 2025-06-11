<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keepAlive && isRouterAlive"
                 :is="Component"
                 :key="route.name"
                 ref="ComponentRef"></component>
    </keep-alive>
    <component v-if="!route.meta.keepAlive && isRouterAlive"
               :is="Component"
               :key="route.name"
               ref="ComponentRef"></component>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, provide, ref } from 'vue';

defineOptions({
  name: 'EmptyPage'
});

const isRouterAlive = ref<boolean>(true);
const ComponentRef = ref(null);

function reload() {
  isRouterAlive.value = false;
  nextTick(function() {
    isRouterAlive.value = true;
  });
}

provide('reload', reload);

defineExpose({
  Component: ComponentRef
});
</script>

<style scoped>

</style>
