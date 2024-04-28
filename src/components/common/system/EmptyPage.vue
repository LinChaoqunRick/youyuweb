<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keepAlive && isRouterAlive"
                 :is="Component"
                 :key="route.path"
                 ref="ComponentRef"></component>
    </keep-alive>
    <component :is="Component" :key="route.path"
               v-if="!route.meta.keepAlive && isRouterAlive"
               ref="ComponentRef"></component>
  </router-view>
</template>

<script lang="ts">
export default {
  name: "EmptyPage",
}
</script>

<script setup lang="ts">
import {nextTick, provide, ref} from "vue";

const isRouterAlive = ref<boolean>(true);

const ComponentRef = ref(null);

function reload() {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  })
}

provide('reload', reload);

defineExpose({
  Component: ComponentRef
})
</script>

<style scoped>

</style>
