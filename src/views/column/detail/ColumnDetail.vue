<template>
  <div class="column-detail">
    {{columnId}}
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="postList" tab="收录文章">
        <div class="post-list">
          <YTable listUrl="getColumnPosts" :params="listParams">
            <template #default="{dataList}">
              <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
                <PostItem :data="item" :index="index"/>
              </div>
            </template>
          </YTable>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from "vue";
  import {useStore} from "vuex";
  import {useRoute} from "vue-router";
  import YTable from "@/components/common/table/YTable.vue";
  import PostItem from "@/views/user/profile/post/PostItem.vue";

  const {dispatch} = useStore();
  const route = useRoute();

  const activeKey = ref('postList');
  const columnId = route.params.columnId;
  const listParams = computed(() => ({
    columnId,
    pageSize: 20
  }))

  const getColumnDetail = () => {
    dispatch('getColumnDetail', {columnId}).then(res => {
      console.log(res);
    })
  }

  getColumnDetail();
</script>

<style lang="scss" scoped>
  .column-detail {
    width: 800px;
    margin: 0 auto;

    ::v-deep(.y-table) {
      .ant-pagination {
        margin-top: 8px;
      }
    }

    ::v-deep(.ant-tabs) {
      background-color: var(--youyu-background1);
      padding: 8px 16px 0 16px;

      .ant-tabs-nav {
        margin: 0;
      }

      .ant-tabs-tab {
        padding: 0 0 8px 0;
      }
    }

    .post-list {
      padding: 8px 0;
    }
  }
</style>
