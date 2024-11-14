<template>
  <div class="album-list">
    <div class="actions-wrapper">
      <a-button class="create-btn" shape="round" type="primary" @click="onAdd">
        <i-folder-plus theme="outline" size="16" fill="#fff" style="margin-right: 4px" />
        新增
      </a-button>
      <AlbumActions />
    </div>
    <AlbumCommonList list-url="getMineAlbumList" :table-params="tableParams" ref="AlbumCommonListRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/common/AlbumAdd.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';
import AlbumCommonList from '@/views/album/list/common/AlbumCommonList.vue';

const AlbumCommonListRef = ref<typeof AlbumCommonList | null>(null);

const tableParams = {
  pageSize: 12,
};

const onAdd = async () => {
  const res = await openModal({
    component: AlbumAdd,
    title: '创建相册',
    maskClosable: false,
    width: '580px',
  }).catch(console.log);
  if (res) {
    AlbumCommonListRef.value?.YTableRef.refreshData();
  }
};
</script>

<style lang="scss" scoped>
.album-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--youyu-body-background2);

  .actions-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 0;

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

  ::v-deep(.y-table) {
    .list-wrapper {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px 0;
    }
  }
}
</style>
