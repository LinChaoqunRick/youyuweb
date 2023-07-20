<template>
  <div class="moment-list">
    <UserMomentList :userIds="user.id"/>
  </div>
</template>

<script setup lang="ts">
  import {computed, inject} from 'vue';
  import {useStore} from "vuex";
  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const {getters, commit, dispatch} = useStore();

  const user = inject('user');
</script>

<style lang="scss" scoped>
  .moment-list {
    ::v-deep(.user-moment-list) {
      .load-more-box {
        margin-bottom: 0 !important;
      }
    }
  }
</style>
