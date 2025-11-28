<template>
  <div v-if="data" class="album-detail-info">
    <div class="header-tip">
      <a-alert type="info" show-icon>
        <template #message>
          此相册为
          <span class="open-status" :class="{ 'private-album': !data.open }">{{ data.open ? '公开' : '私密' }}</span>
          相册
        </template>
        <template v-if="userInfo.id === data.userId" #action>
          <a-button type="link" block @click="onEdit"> 编辑 </a-button>
        </template>
      </a-alert>
    </div>
    <div class="owner-info">
      <img :src="data.userInfo?.avatar" alt="" />
      <div class="owner-info-nickname">
        {{ data.userInfo?.nickname }}
      </div>
    </div>
    <div v-if="!data.open && userInfo.id === data.userInfo?.id" class="authorized-users">
      <div>授权用户：</div>
      <div class="authorized-users-list cp">
        <div v-for="item in data.authorizedUserList" :key="item.id" class="authorized-users-item">
          <img :src="item.avatar" :title="item.nickname" alt="" />
        </div>
        <div class="authorized-users-item" title="添加用户">+{{ restAuthUserNumber ? restAuthUserNumber : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { useStore } from 'vuex';
import openModal from '@/libs/tools/openModal';
import AlbumEdit from '@/views/album/common/AlbumEdit.vue';
import type { AlbumDetailData } from './types';

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true,
  },
});

const { getters, dispatch } = useStore();
const data = ref<AlbumDetailData | null>(null);
const userInfo = computed(() => getters['userInfo']);
const restAuthUserNumber = computed(() =>
  data.value?.authorizedUsers
    ? data.value.authorizedUsers?.split(',').length - (data.value?.authorizedUserList?.length ?? 0)
    : 0,
);

const initData = () => {
  dispatch('getAlbumDetail', { id: props.albumId }).then(res => {
    data.value = res.data;
  });
};
initData();

const onEdit = async () => {
  console.log(data.value);
  const res = await openModal({
    component: AlbumEdit,
    componentProps: {
      formValidate: reactive(cloneDeep(data.value)),
    },
    title: '编辑相册',
    maskClosable: false,
    width: '580px',
  }).catch(console.log);

  if (res) {
    initData();
  }
};

defineExpose({
  data: data,
});
</script>

<style scoped lang="scss">
.album-detail-info {
  height: 100%;
  padding: 36px 16px 10px;
  margin-left: auto;
  background-color: var(--youyu-background1);

  .header-tip {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 30px;

    .open-status {
      color: #52c41a;

      &.private-album {
        color: red;
      }
    }

    ::v-deep(.ant-alert) {
      padding: 2px 12px;
      border: none;
      border-radius: 0;

      button {
        height: fit-content !important;
        padding: 0 !important;
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
      margin-left: 4px;
      color: #1890ff;
    }
  }

  .owner-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 16px;
    border-bottom: var(--youyu-border);

    img {
      width: 120px;
      height: 120px;
      border: 4px solid var(--youyu-border-color);
      border-radius: 50%;
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
      display: flex;
      width: 18px;
      margin-left: 2px;

      &:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        font-weight: bold;
        color: var(--youyu-text2);
        text-align: center;
        background-color: rgb(200, 200, 200, 0.4);
        border-radius: 50%;
      }

      img {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
}
</style>
