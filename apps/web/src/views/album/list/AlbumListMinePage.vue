<template>
  <div v-if="isLogin" class="album-list">
    <div class="actions-wrapper">
      <a-button
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
    <AlbumCommonList ref="AlbumCommonListRef" list-url="getMineAlbumList" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import openModal from '@/libs/tools/openModal';
import AlbumAdd from '@/views/album/common/AlbumAdd.vue';
import AlbumCommonList from '@/views/album/common/AlbumCommonList.vue';
import AlbumActions from '@/views/album/components/AlbumActions.vue';

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
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;

  .actions-wrapper {
    position: absolute;
    top: 8px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
