<template>
  <a-config-provider :locale="zhCN">
    <YHeader/>
    <div class="main-app">
      <router-view/>
    </div>
    <YFooter/>
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'

  import YHeader from '@/components/common/header/YHeader.vue';
  import YFooter from "@/components/common/footer/YFooter.vue";
</script>

<style lang="scss" scoped>
  .main-app {
    min-height: 100%;
    background-color: var(--youyu-body-background);
    padding-top: 60px;
    padding-bottom: 40px;
    box-sizing: border-box;
  }
</style>
