<template>
  {{data}}
</template>

<script lang="ts">
  export default {
    name: "MomentReplyItem"
  }
</script>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>

</style>
