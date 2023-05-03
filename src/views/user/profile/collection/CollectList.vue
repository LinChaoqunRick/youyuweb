<template>
  <div class="collect-list">
    <div class="list-body">
      <YTable listUrl="getPostCollectList" :params="listParams" ref="yTable">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
            <PostItem :data="item" :index="index">
              <template #footer>
                <a-button v-if="isOwn" size="small" type="primary" danger @click="onRemove(item)">移除</a-button>
              </template>
            </PostItem>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from "vuex";
  import {computed, inject, ref, watch} from "vue";
  import {message} from "ant-design-vue";
  import YTable from "@/components/common/table/YTable.vue";
  import PostItem from "../post/PostItem.vue";

  const {getters, dispatch} = useStore();
  const user = inject('user');
  const yTable = ref(null);
  const userInfo = computed(() => getters['userInfo']);
  const listParams = computed(() => ({
    userId: user.value.id,
    pageSize: 20
  }))
  const isOwn = computed(() => userInfo.value.id === user.value.id);

  const onRemove = (item) => {
    dispatch("cancelPostCollect", {
      postId: item.id,
      userId: userInfo.value.id,
    }).then(res => {
      if (res.data) {
        message.success("已从您的收藏夹中移除");
        yTable.value.initData();
      }
    })
  }
</script>

<style lang="scss" scoped>
  .collect-list {
    .list-body {
      .article-item {
        button {
          font-size: 13px;
        }
      }
    }
  }
</style>
