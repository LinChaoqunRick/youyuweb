<template>
  <div class="album-detail-info">
    <div class="album-name">
      <div class="album-name-text">{{ data.name }}</div>
      <div class="album-name-isOpen" :class="{'private-album': !data.open}">{{ data.open ? '公开' : '私密' }}</div>
      <span class="operation-item edit cp" v-if="userInfo.id === data.userId" @click="onEdit">编辑</span>
    </div>
    <Teleport to="#albumUploadBtn" v-if="userInfo.id === data.userId">
      <a-button type="primary" shape="round">
        <template #icon>
          <i-upload-one theme="outline" size="16" fill="currentColor" />
        </template>
        上传
      </a-button>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';
import openModal from '@/libs/tools/openModal';
import AlbumEdit from '@/views/album/list/AlbumEdit.vue';
import {cloneDeep} from 'lodash';

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true
  }
});

const { getters, dispatch } = useStore();
const data = ref({});
const userInfo = computed(() => getters['userInfo']);

const initData = () => {
  dispatch('getAlbumDetail', { id: props.albumId }).then(res => {
    data.value = res.data;
  });
};
initData();

const onEdit = async () => {
  const res = await openModal({
    component: AlbumEdit,
    componentProps: {
      formValidate: reactive(cloneDeep(data.value))
    },
    title: '编辑相册',
    maskClosable: false,
    width: '580px'
  }).catch(console.log);
};
</script>

<style scoped lang="scss">
.album-detail-info {
  background-color: var(--youyu-background1);
  height: 100%;
  margin-left: auto;
  padding: 10px 16px;

  .album-name {
    display: flex;
    align-items: center;

    .album-name-text {
      font-size: 16px;
    }

    .album-name-isOpen {
      margin-left: 4px;
      font-size: 13px;
      padding: 0 6px;
      background-color: rgba(103, 187, 85, 0.3);
      color: #67bb55;
      border-radius: 4px;

      &.private-album {
        color: #fc5531;
        background-color: rgba(252, 85, 49, 0.3);
      }
    }

    .operation-item {
      color: #1890ff;
      margin-left: 4px;
    }
  }
}
</style>
