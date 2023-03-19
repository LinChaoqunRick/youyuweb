<template>
  <div class="collect-list">
    <div class="list-body">
      <YTable listUrl="getPostCollectList" :params="listParams" ref="yTable">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
            <PostItem :data="item" :index="index"/>
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
  import PostItem from "../post/PostItem.vue";

  const {getters, dispatch} = useStore();
  const user = inject('user');

  const userInfo = computed(() => getters['userInfo']);
  const listParams = computed(() => ({
    userId: user.value.id,
  }))

  function initData() {
    dispatch('getPostCollectList', {userId: user.value.id}).then(res => {
      console.log(res);
    })
  }

</script>

<style scoped>

</style>
