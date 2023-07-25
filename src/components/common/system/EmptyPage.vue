<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"
                 v-if="$route.meta.keepAlive && isRouterAlive"
                 :key="Component.name"
                 ref="ComponentRef"></component>
    </keep-alive>
    <component :is="Component"
               v-if="!$route.meta.keepAlive && isRouterAlive"
               :key="Component.name"
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
  ComponentRef
})
</script>

<style scoped>

</style>
