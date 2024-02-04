<template>
  <div class="custom-calendar">
    <div class="calender-header">嗨!</div>
    <a-calendar :fullscreen="false" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.custom-calendar {
  background-color: var(--youyu-background1);
  border-radius: 8px;
  padding: 12px 24px;

  .calender-header {
    text-align: right;
  }

  ::v-deep(.ant-picker-calendar) {
    padding: 0;
    background: transparent;
  }
}
</style>
