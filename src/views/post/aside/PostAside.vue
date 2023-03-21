<template>
  <div id="post-aside">
    <CustomerCalendar class="mb-10"/>
    <CategoryPanel class="mb-10"/>
    <CategoryPanel/>
  </div>
</template>

<script setup lang="ts">
  import CustomerCalendar from "@/components/common/utils/customerCalendar/CustomerCalendar.vue";
  import CategoryPanel from './CategoryPanel.vue';

</script>


<style lang="scss" scoped>
  #y-aside {

  }
</style>
