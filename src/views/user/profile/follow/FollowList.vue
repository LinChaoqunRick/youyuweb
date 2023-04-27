<template>
  <div class="follow-list">
    <div class="follow-menu"></div>
    <div class="list-body">
      <YTable listUrl="getFollowList" :params="listParams" :pageSize="20">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="list-item" :key="item.postId">
            <UserItem :data="item"/>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from "vuex";
  import {computed, inject, ref, watch} from "vue";
  import YTable from "@/components/common/table/YTable.vue";
  import UserItem from "./UserItem.vue";

  const {getters, dispatch} = useStore();
  const user = inject('user');

  const userInfo = computed(() => getters['userInfo']);
  const listParams = computed(() => ({
    userId: user.value.id,
    pageSize: 20
  }))
</script>

<style lang="scss" scoped>
  .follow-list {
    .follow-menu {
      height: 40px;
    }

    .list-body {
      padding: 0 10px;

      .list-item {
        border-top: 1px solid #e4e6eb;
      }
    }
  }
</style>
