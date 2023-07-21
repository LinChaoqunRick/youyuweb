<template>
  <div class="moment-list">
    <div class="moment-middle">
      <UserMomentList :params="{orderBy: 'support_count'}" ref="UserMomentListRef"/>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MomentListHot"
  }
</script>

<script setup lang="ts">
  import {ref} from 'vue';

  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const UserMomentListRef = ref(null);
</script>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 750px;
    }
  }
</style>
