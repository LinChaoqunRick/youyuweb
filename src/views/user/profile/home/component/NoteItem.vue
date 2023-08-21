<template>
{{ data}}
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

</script>

<style scoped lang="scss">

</style>
