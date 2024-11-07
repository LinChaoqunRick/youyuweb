<template>
  <YTable listUrl="getAlbumList" ref="YTableRef" :params="props.tableParams">
    <template #default="{ dataList }">
      <div class="list-wrapper">
        <div v-for="item in dataList" class="album-item-body" :key="item.id">
          <AlbumItem :data="item" />
        </div>
      </div>
    </template>
  </YTable>
</template>

<script setup lang="ts">
import AlbumItem from '@/views/album/components/AlbumItem.vue';
import YTable from '@/components/common/table/YTable.vue';
import { ref } from 'vue';

const YTableRef = ref<typeof YTable | null>(null);

const props = defineProps({
  tableParams: {
    type: Object,
    default: () => ({
      pageSize: 8,
    }),
  },
});

defineExpose({
  YTableRef,
});
</script>

<style scoped lang="scss">
.y-table {
  width: 100%;
  height: 100%;
  overflow: auto;

  ::v-deep(.ant-spin-nested-loading) {
    height: 100%;

    .ant-spin-container {
      display: flex;
      flex-direction: column;
      height: 100%;

      .table-body {
        flex: 1;

        .list-wrapper {
          height: 100%;
        }
      }

      .table-pagination {
        margin-top: 20px;
        height: 80px;
        position: sticky;
        top: 88%;
        background-color: transparent !important;
      }
    }
  }

  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-content: flex-start;
    justify-items: center;
    align-items: center;
    align-content: space-evenly;

    ::v-deep(.album-item) {
      width: 270px;
      height: 230px;
    }
  }
}
</style>
