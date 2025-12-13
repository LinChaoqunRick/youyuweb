<template>
  <div class="album-list">
    <div class="actions-wrapper">
      <a-button
        v-if="isOwn"
        class="create-btn"
        shape="round"
        type="primary"
        @click="onAdd"
      >
        <i-folder-plus
          theme="outline"
          size="16"
          fill="#fff"
          style="margin-right: 4px"
        />
        新增
      </a-button>
      <AlbumActions />
    </div>
    <AlbumCommonList ref="AlbumCommonListRef" list-url="getAlbumList" :table-params="tableParams" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/common/AlbumAdd.vue';
import AlbumCommonList from '@/views/album/common/AlbumCommonList.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';

const AlbumCommonListRef = ref<typeof AlbumCommonList | null>(null);
const route = useRoute();

const { getters } = useStore();
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => route.params.userId == userInfo.value.id);

const tableParams = {
  pageSize: 12,
  userId: route.params.userId,
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--youyu-body-background2);

  .actions-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
