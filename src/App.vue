<template>
  <div class="app">
    <a-config-provider :locale="zhCN">
      <div class="header" id="header">
        <YHeader/>
      </div>
      <div class="main-app" v-if="isRouterAlive">
        <router-view/>
      </div>
      <div class="footer" id="footer">
        <YFooter/>
      </div>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import {nextTick, ref, provide} from 'vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN'

  import YHeader from '@/components/common/header/YHeader.vue';
  import YFooter from "@/components/common/footer/YFooter.vue";

  const isRouterAlive = ref(true);

  function reload() {
    isRouterAlive.value = false;
    nextTick(function () {
      isRouterAlive.value = true;
    })
  }

  provide('reload', reload);
</script>

<style lang="scss" scoped>
  .app {
    min-height: 100vh;
    background-color: var(--youyu-body-background);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .header {
      height: 60px;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .main-app {
      flex: 1;
    }

    .footer {
      height: 40px;
    }
  }
</style>
