<template>
  <div class="youyu-spin" :style="{'height': height}">
    <a-spin size="large"/>
  </div>
</template>

<script setup>
  const props = defineProps({
    height: {
      type: String,
      default: "160px"
    },
  });
</script>

<style lang="scss" scoped>
  .youyu-spin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
