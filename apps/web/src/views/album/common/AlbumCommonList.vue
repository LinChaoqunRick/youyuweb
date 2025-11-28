<template>
  <YTable ref="YTableRef" :list-url="listUrl" :params="props.tableParams">
    <template #default="{ dataList }">
      <div class="list-wrapper">
        <div v-for="item in dataList" :key="item.id" class="album-item-body">
          <AlbumItemCard :album="item" />
        </div>
      </div>
    </template>
  </YTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import YTable from '@/components/common/table/YTable.vue';
import AlbumItemCard from '@/views/album/components/AlbumItemCard.vue';

const YTableRef = ref<typeof YTable | null>(null);

const props = defineProps({
  listUrl: {
    type: String,
    default: 'getAlbumList',
  },
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
        position: sticky;
        top: 88%;
        height: 80px;
        margin-top: 20px;
        background-color: transparent !important;
      }
    }
  }

  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    align-content: start;
    padding: 16px 16px 0;

    ::v-deep(.album-item-link) {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 0.95;
    }

    ::v-deep(.album-item-body) {
      display: flex;
    }
  }
}
</style>
