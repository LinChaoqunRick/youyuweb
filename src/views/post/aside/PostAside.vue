<template>
  <div id="post-aside">
    <CustomCalendar class="mb-8"/>
    <CategoryPanel/>
  </div>
</template>

<script setup lang="ts">
  import CustomCalendar from "@/components/common/utils/customerCalendar/CustomCalendar.vue";
  import CategoryPanel from './CategoryPanel.vue';

</script>


<style lang="scss" scoped>
  #y-aside {

  }
</style>
