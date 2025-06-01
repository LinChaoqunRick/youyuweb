<template>
  <div class="user-list">
    <YTable listUrl="getUserList" :params="listParams" :beforeGetData="beforeGetData">
      <template #default="{dataList}">
        <UserItem v-for="(item, index) in dataList" :key="item.postId" :data="item"/>
      </template>
    </YTable>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive} from 'vue';
  import {useRoute} from "vue-router";
  import YTable from "@/components/common/table/YTable.vue";
  import UserItem from "@/components/content/user/item/UserItem.vue";

  const route = useRoute();

  const listParams = reactive({
    pageSize: 20,
    key: route.query.q
  })

  const beforeGetData = () => {
    return !!route.query.q
  }
</script>

<style lang="scss" scoped>
  .user-list {
    background-color: var(--youyu-background1);
    padding-bottom: 6px;

    .user-item {
      margin-bottom: 6px;
      border-radius: 2px;
    }
  }
</style>
