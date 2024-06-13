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
import { useStore } from 'vuex';
import AlbumItem from '@/views/album/list/AlbumItem.vue';
import YTable from '@/components/common/table/YTable.vue';

const { dispatch } = useStore();

const onAdd = () => {
  dispatch('getAlbumOssPolicy', {albumId: 1}).then(res => {
    console.log(res);
  });
};

</script>

<style lang="scss" scoped>
.album-list {
  padding: 16px;

  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
  }

  ::v-deep(.y-table) {
    .table-pagination {
      margin-top: 12px;
    }
  }

  .create-btn {
    position: absolute;
    bottom: 12px;
  }
}
</style>
