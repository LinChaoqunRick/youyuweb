<template>
  <div class="album-list" v-if="isLogin">
    <div class="actions-wrapper">
      <a-button class="create-btn" shape="round" type="primary" @click="onAdd">
        <i-folder-plus theme="outline" size="16" fill="#fff" style="margin-right: 4px" />
        新增
      </a-button>
      <AlbumActions />
    </div>
    <AlbumCommonList list-url="getMineAlbumList" ref="AlbumCommonListRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/common/AlbumAdd.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';
import AlbumCommonList from '@/views/album/list/common/AlbumCommonList.vue';
import { useStore } from 'vuex';

const { getters } = useStore();

const AlbumCommonListRef = ref<typeof AlbumCommonList | null>(null);
const isLogin = computed(() => getters['isLogin']);

const onAdd = async () => {
  const res = await openModal({
    component: AlbumAdd,
    title: '创建相册',
    maskClosable: false,
    width: '580px',
  }).catch(console.log);
  if (res) {
    AlbumCommonListRef.value?.YTableRef.value.refreshData();
  }
};
</script>

<style lang="scss" scoped>
.album-list {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: auto;

  .actions-wrapper {
    position: absolute;
    top: 8px;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;

    button {
      margin-right: 16px;
    }

    ::v-deep(.ant-input-affix-wrapper) {
      width: 200px;
    }

    ::v-deep(> span) {
      margin-right: 16px;
      cursor: pointer;
    }
  }
}
</style>
