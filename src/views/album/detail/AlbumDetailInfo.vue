<template>
  <div class="album-detail-info">
    <div class="header-tip">
      <a-alert type="info" show-icon>
        <template #message>
          此相册为
          <span class="open-status" :class="{'private-album': !data.open}">{{ data.open ? '公开' : '私密' }}</span>
          相册
        </template>
        <template #action v-if="userInfo.id === data.userId">
          <a-button type="link" block @click="onEdit">编辑</a-button>
        </template>
      </a-alert>
    </div>
    <div class="album-name">
      <div class="album-name-text">{{ data.name }}</div>
    </div>
    <div class="owner-info">
      <img :src="data.userInfo?.avatar" alt="" />
      <div class="owner-info-nickname">{{ data.userInfo?.nickname }}</div>
    </div>
    <div class="authorized-users" v-if="!data.open && (userInfo.id === data.userInfo?.id)">
      <div>授权用户：</div>
      <div class="authorized-users-list cp">
        <div class="authorized-users-item" v-for="item in data.authorizedUserList">
          <img :src="item.avatar" :title="item.nickname" alt="" />
        </div>
        <div class="authorized-users-item" title="添加用户">
          +{{ restAuthUserNumber ? restAuthUserNumber : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';
import openModal from '@/libs/tools/openModal';
import AlbumEdit from '@/views/album/list/AlbumEdit.vue';
import { cloneDeep } from 'lodash';
import type { AlbumDetailData } from './types';

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true
  }
});

const { getters, dispatch } = useStore();
const data = ref<AlbumDetailData | null>(null);
const userInfo = computed(() => getters['userInfo']);
const restAuthUserNumber = computed(() => data.value?.authorizedUsers ? data.value.authorizedUsers?.split(',').length - (data.value?.authorizedUserList?.length ?? 0) : 0);

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

  if (res) {
    initData();
  }
};

defineExpose({
  data: data
});
</script>

<style scoped lang="scss">
.album-detail-info {
  background-color: var(--youyu-background1);
  height: 100%;
  margin-left: auto;
  padding: 36px 16px 10px 16px;

  .header-tip {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 30px;

    .open-status {
      color: #52c41a;

      &.private-album {
        color: red;
      }
    }

    ::v-deep(.ant-alert) {
      padding: 2px 12px;
      border-radius: 0;
      border: none;

      button {
        padding: 0 !important;
        height: fit-content !important;
      }
    }
  }

  .album-name {
    display: flex;
    align-items: center;

    .album-name-text {
      font-size: 16px;
      font-weight: bold;
    }

    .operation-item {
      color: #1890ff;
      margin-left: 4px;
    }
  }

  .owner-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-bottom: var(--youyu-border);

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 4px solid var(--youyu-border-color);
    }

    .owner-info-nickname {
      margin-top: 8px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .authorized-users {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: var(--youyu-border);

    .authorized-users-list {
      display: flex;
      align-items: center;
    }

    .authorized-users-item {
      width: 18px;
      display: flex;
      margin-left: 2px;

      &:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(200, 200, 200, 0.4);
        color: var(--youyu-text2);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
      }

      img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
}
</style>
