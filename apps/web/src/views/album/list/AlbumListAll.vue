<template>
  <div class="album-list">
    <div class="actions-wrapper">
      <AlbumActions />
    </div>
    <AlbumCommonList :table-params="tableParams" />
  </div>
</template>

<script setup lang="ts">
import AlbumCommonList from '@/views/album/common/AlbumCommonList.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';

const tableParams = {
  pageSize: 10,
};
</script>

<style lang="scss" scoped>
.album-list {
  height: 100%;

  .actions-wrapper {
    position: absolute;
    top: 8px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;

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
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
