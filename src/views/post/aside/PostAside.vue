<template>
  <div class="post-aside">
    <Announcement class="mb-8"/>
    <CustomCalendar class="mb-8"/>
    <CategoryPanel/>
  </div>
</template>

<script setup lang="ts">
import CustomCalendar from "@/components/common/utils/customerCalendar/CustomCalendar.vue";
import CategoryPanel from './CategoryPanel.vue';
import Announcement from "@/components/common/share/announcement/index.vue";

</script>


<style lang="scss" scoped>
.post-aside {
  width: 300px;
}
</style>
