<template>
  <div class="container">
    <slot/>
    <slot name="loadMoreBox"/>
    <slot name="failedBox"/>
    <slot name="noDataBox"/>
    <slot name="loadedAllBox"/>
  </div>
</template>

<script>
  export default {
    name: "BaseLayout'"
  }
</script>

<style scoped>

</style>
