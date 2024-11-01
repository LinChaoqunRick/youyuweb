<template>
  <div class="album-list">
    <Teleport defer to="#album-actions">
      <div class="actions-wrapper">
        <a-button class="create-btn" shape="round" type="primary" @click="onAdd">
          <i-folder-plus theme="outline" size="16" fill="#fff" style="margin-right: 4px" />
          新增
        </a-button>
        <AlbumActions />
      </div>
    </Teleport>
    <YTable listUrl="getAlbumList" ref="YTableRef">
      <template #default="{ dataList }">
        <div class="list-wrapper">
          <div v-for="item in dataList" class="album-item-body" :key="item.id">
            <AlbumItem :data="item" />
          </div>
        </div>
      </template>
    </YTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AlbumItem from '@/views/album/list/AlbumItem.vue';
import YTable from '@/components/common/table/YTable.vue';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/list/AlbumAdd.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';

const YTableRef = ref<typeof YTable | null>(null);

const onAdd = async () => {
  const res = await openModal({
    component: AlbumAdd,
    title: '创建相册',
    maskClosable: false,
    width: '580px',
  }).catch(console.log);
  if (res) {
    YTableRef.value?.refreshData();
  }
};
</script>

<style lang="scss" scoped>
.album-list {
  .actions-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
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

  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    grid-gap: 50px 0;

    ::v-deep(.album-item) {
      width: 270px;
      height: 220px;
    }
  }

  ::v-deep(.y-table) {
    height: 100%;

    .table-pagination {
      margin-top: 18px;
      position: sticky;
      top: 95%;
      background-color: transparent !important;
    }
  }
}
</style>
