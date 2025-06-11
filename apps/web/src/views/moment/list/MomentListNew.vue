<template>
  <div class="moment-list">
    <div class="moment-middle">
      <UserMomentList ref="UserMomentListRef"/>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MomentListNew"
  }
</script>

<script setup lang="ts">
  import {ref} from 'vue';

  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const UserMomentListRef = ref(null);

  const unshiftItem = (data) => {
    UserMomentListRef.value.unshiftItem(data);
  }

  defineExpose({
    unshiftItem
  })
</script>

<style lang="scss" scoped>
  .no-data {

  }

  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 100%;
    }
  }
</style>
