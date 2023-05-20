<template>
  <div class="moment-list mt-8">
    <MomentEditor/>
  </div>
</template>

<script setup lang="ts">
  import MomentEditor from "../components/MomentEditor.vue";
</script>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;
  }
</style>
