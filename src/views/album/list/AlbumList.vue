<template>
  <div class="album-list">
    <YTable listUrl="getAlbumList" ref="YTableRef">
      <template #default="{dataList}">
        <div class="list-wrapper">
          <div v-for="item in dataList" class="album-item-body" :key="item.id">
            <AlbumItem :data="item" />
          </div>
        </div>
      </template>
    </YTable>
    <a-button class="create-btn" type="primary" @click="onAdd">新增</a-button>
  </div>
</template>

<script setup lang="ts">
import AlbumItem from '@/views/album/list/AlbumItem.vue';
import YTable from '@/components/common/table/YTable.vue';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/list/AlbumAdd.vue';
import { ref } from 'vue';

const YTableRef = ref(null);

const onAdd = async () => {
  const res = await openModal({
    component: AlbumAdd,
    title: '创建相册',
    maskClosable: false,
    width: '580px'
  }).catch(console.log);
  if (res) {
    YTableRef.value.refreshData();
  }
};

</script>

<style lang="scss" scoped>
.album-list {
  padding: 40px 16px;
  height: calc(100vh - 100px);
  overflow: auto;

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

  .create-btn {
    position: absolute;
    bottom: 12px;
  }
}
</style>
