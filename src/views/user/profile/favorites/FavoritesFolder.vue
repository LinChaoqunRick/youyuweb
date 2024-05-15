<template>
  <div class="collect-list" :class="[`view-${view}`]">
    <a-button class="add-btn" type="primary" size="small" @click="onAdd">新增</a-button>
    <transition name="fade" mode="out-in">
      <div v-if="view === 'list'" class="list-body">
        <ContentData url="listFavorites" :params="listParams" v-slot="{ data }" ref="ContentDataRef">
          <FavoritesItem v-for="item in data" :data="item" :key="item.id" @onDetail="onDetail(item)" />
        </ContentData>
      </div>
      <div v-else class="detail-body">
        <div class="detail-top cp">
          <div class="back-button" @click="view = 'list'">
            <i-left theme="outline" size="16" fill="currentColor" />
            <span>返回</span>
          </div>
        </div>
        <FavoritesItem :data="detailFavorite" />
        <a-divider>文章列表</a-divider>
        <YTable listUrl="favoritesPostPage" :params="tableParams" ref="yTable">
          <template #default="{ dataList }">
            <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
              <PostItem :data="item" :index="index">
                <template #footer>
                  <a-popconfirm title="将本文移出收藏夹?" @confirm="onRemove(item)">
                    <a-button v-if="isOwn" size="small" type="primary" danger>移除</a-button>
                  </a-popconfirm>
                </template>
              </PostItem>
            </div>
          </template>
        </YTable>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import openModal from '@/libs/tools/openModal';
import ContentData from '@/components/common/system/ContentData.vue';
import FavoritesItem from '@/views/user/profile/favorites/components/FavoritesItem.vue';
import FavoritesAdd from '@/views/user/profile/favorites/components/FavoritesAdd.vue';
import YTable from '@/components/common/table/YTable.vue';
import PostItem from '../post/PostItem.vue';
import type { FavoritesType } from '@/views/user/profile/favorites/type';

const user = inject('user');
const view = ref('list');
const detailFavorite = ref<FavoritesType | null>(null);
const ContentDataRef = ref<typeof ContentData>();
const listParams = computed(() => ({
  userId: user.value.id,
}));
const tableParams = computed(() => ({
  favoritesId: detailFavorite.value?.id,
  pageSize: 20,
}));
const { getters, dispatch } = useStore();
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => userInfo.value.id === user.value.id);
const yTable = ref<typeof YTable | null>(null);

const onAdd = async () => {
  const res = await openModal({
    component: FavoritesAdd,
    title: '新建收藏夹',
    maskClosable: false,
    width: '620px',
  })
    .then(res => {
      ContentDataRef.value?.initData();
    })
    .catch(console.log);
};

const onDetail = (item: FavoritesType) => {
  view.value = 'detail';
  detailFavorite.value = item;
};

const onRemove = item => {
  console.log(item);
  dispatch('cancelPostCollect', {
    postId: item.id,
    userId: userInfo.value.id,
    favoritesId: detailFavorite.value?.id
  }).then(res => {
    if (res.data) {
      message.success('已从您的收藏夹中移除');
      yTable.value?.initData();
    }
  });
};
</script>

<style lang="scss" scoped>
.collect-list {
  position: relative;

  .add-btn {
    position: absolute;
    right: 0;
    top: -30px;
  }

  .list-body {
    ::v-deep(.favorites-item) {
      margin-bottom: 6px;

      button {
        font-size: 13px;
      }
    }
  }

  .detail-body {
    .detail-top {
      color: #1890ff;
      border-top: 1px solid var(--youyu-border-color);
      padding-top: 6px;

      .back-button {
        display: inline-flex;
        align-items: center;
        //background-color: var(--youyu-body-background5);
        //padding: 0 4px;
        //border-radius: 2px;

        .i-icon {
          margin-right: 2px;
        }
      }
    }
  }
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  //opacity: 0;
}
</style>
