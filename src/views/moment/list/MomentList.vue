<template>
  <div class="moment-list mt-8">
    <MomentList/>
  </div>
</template>

<script setup lang="ts">
  import MomentList from "../components/MomentEditor.vue";
</script>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;
  }
</style>
