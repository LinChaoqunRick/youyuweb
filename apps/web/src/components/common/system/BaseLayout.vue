<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" v-if="route.meta?.keepAlive && isRouterAlive" :key="route.name" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta?.keepAlive && isRouterAlive" :key="route.name" />
  </router-view>
</template>

<script setup lang="ts">
import { ref, provide, nextTick } from 'vue';

defineOptions({ name: 'BaseLayout' });

const isRouterAlive = ref<boolean>(true);

/**
 * 刷新当前路由
 * - keepAlive 页面：通过销毁重建来刷新
 * - 非 keepAlive 页面：天然会重新 mount
 */
function reload() {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
}

provide('reload', reload);

defineExpose({
  reload,
});
</script>
