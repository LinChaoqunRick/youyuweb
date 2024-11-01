<template>
  <div class="album-list">
    <div class="actions-wrapper">
      <AlbumActions />
    </div>
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
import AlbumItem from '@/views/album/components/AlbumItem.vue';
import YTable from '@/components/common/table/YTable.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';
</script>

<style lang="scss" scoped>
.album-list {
  height: 100%;

  .actions-wrapper {
    position: absolute;
    top: 8px;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;

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
    padding-top: 30px;

    ::v-deep(.album-item) {
      width: 270px;
      height: 220px;
    }
  }

  ::v-deep(.y-table) {
    height: 100%;

    .table-body {
      height: 100%;
    }

    .table-pagination {
      margin-top: 18px;
      position: sticky;
      top: 95%;
      background-color: transparent !important;
    }
  }
}
</style>
