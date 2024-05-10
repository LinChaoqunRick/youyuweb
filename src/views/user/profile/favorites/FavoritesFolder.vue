<template>
  <div class="collect-list">
    <a-button class="add-btn" type="primary" size="small" @click="onAdd">新增</a-button>
    <div class="list-body">
      <ContentData url="listFavorites" :params="listParams" v-slot="{ data }" ref="ContentDataRef">
        <FavoritesItem v-for="item in data" :data="item" :key="item.id"/>
      </ContentData>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject, ref} from 'vue';
import openModal from "@/libs/tools/openModal";
import ContentData from '@/components/common/system/ContentData.vue';
import FavoritesItem from '@/views/user/profile/favorites/components/FavoritesItem.vue';
import FavoritesAdd from "@/views/user/profile/favorites/components/FavoritesAdd.vue";

const user = inject('user');
const ContentDataRef = ref<typeof ContentData>();
const listParams = computed(() => ({
  userId: user.value.id,
}));

const onAdd = async () => {
  console.log(1000);
  const res = await openModal({
    component: FavoritesAdd,
    title: '新建收藏夹',
    maskClosable: false,
    width: '620px'
  }).catch(console.log);
  ContentDataRef.value?.initData();
}
</script>

<style lang="scss" scoped>
.collect-list {
  position: relative;
  padding-bottom: 6px;

  .add-btn {
    position: absolute;
    right: 0;
    top: -30px;
  }

  .list-body {
    .article-item {
      border-top: 1px solid var(--youyu-border-color);

      button {
        font-size: 13px;
      }
    }
  }
}
</style>
