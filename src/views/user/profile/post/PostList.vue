<template>
  <div class="post-list">
    <div class="list-top">
      <div class="sort-create-type">
        <a-checkbox v-model:checked="checked" @change="searchData">只看原创</a-checkbox>
      </div>
      <div class="sort-type">
        <div class="sort-item" :class="{'active': sort}" @click="handleSort(true)">
          <i-time theme="filled" size="13" fill="currentColor"/>
          最新
        </div>
        <div class="sort-item" :class="{'active': !sort}" @click="handleSort(false)">
          <i-fire theme="filled" size="13" fill="currentColor"/>
          最热
        </div>
      </div>
    </div>
    <div class="list-body">
      <YTable listUrl="getPostList" :params="listParams" ref="yTable">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
            <PostItem :data="item" :index="index"/>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "PostList"
  }
</script>

<script setup lang="ts">
  import {computed, ref, nextTick, inject, watch} from 'vue';
  import {useStore} from "vuex";

  import YTable from "@/components/common/table/YTable.vue";
  import PostItem from "./PostItem.vue";

  const {getters} = useStore();
  const user = inject('user');

  const userInfo = computed(() => getters['userInfo']);

  const yTable = ref(null);
  const checked = ref(false);
  const sort = ref(true); // true:最新 false:最热
  const listParams = computed(() => ({
    userId: user.value.id,
    original: checked.value,
    sort: sort.value
  }))

  function handleSort(value: boolean) {
    sort.value = value;
    searchData();
  }

  function searchData() {
    nextTick(() => {
      yTable.value.page = 1;
      yTable.value.initData();
    })
  }

</script>

<style lang="scss" scoped>
  .post-list {
    padding: 0 6px;

    .list-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 6px;

      .sort-type {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;
        font-weight: 400;
        cursor: pointer;
        background: var(--youyu-body-background-ligth);
        border-radius: 2px;
        padding: 3px;

        .sort-item {
          display: flex;
          align-items: center;
          padding: 2px 12px;
          line-height: 22px;
          font-size: 1.167rem;
          color: #8a919f;

          ::v-deep(svg) {
            margin-right: 4px;
          }
        }

        .active {
          color: #1890ff;
          border-radius: 2px;
          background: var(--youyu-body-background2);

          ::v-deep(svg) {
            margin-right: 4px;
          }
        }
      }
    }

    .list-body {
      .article-item {
        border-top: 1px solid #e4e6eb;
      }
    }
  }
</style>