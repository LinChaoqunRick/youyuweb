<template>
  <div class="user-home">
    <ContentList url="getUserDynamics" :params="params" auto-load>
      <template v-slot="{list}">
        {{list}}
      </template>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
  import {computed, inject} from 'vue';
  import ContentList from "@/components/common/system/ContentList.vue";
  import type {userType} from "@/types/user";

  const user = inject<userType>('user');

  const params = computed(() => ({
    userId: user.value.id,
    pageSize: 10
  }))
</script>

<style scoped>

</style>
