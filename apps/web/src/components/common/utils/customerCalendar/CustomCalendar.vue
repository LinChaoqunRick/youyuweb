<template>
  <a-card title="创作日历" style="width: 100%">
    <a-calendar :fullscreen="false"/>
  </a-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
::v-deep(.ant-card-body) {
  padding: 8px 24px;
}

::v-deep(.ant-picker-calendar) {
  padding: 0;
  background: transparent;

  .ant-picker-panel {
    background-color: transparent;
  }
}
</style>
