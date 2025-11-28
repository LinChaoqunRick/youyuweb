<template>
  <div class="album-detail-wrapper">
    <div v-if="album" :class="{ 'album-detail-collapse': collapse }" class="album-detail">
      <div class="album-images-wrapper youyu-scrollbar">
        <div class="album-detail-top">
          <div class="album-name">
            {{ album.name }}
          </div>
          <div v-if="userInfo.id === album?.userId" class="album-detail-top-menu">
            <a-button
              v-if="selection"
              :disabled="!(checkedList.length === 1)"
              :loading="setCoverLoading"
              shape="round"
              type="primary"
              @click="onSetCover"
            >
              <template #icon>
                <i-pic fill="currentColor" size="16" theme="outline" />
              </template>
              设为封面
            </a-button>
            <a-button
              v-if="selection"
              :disabled="!checkedList.length"
              :loading="deleteLoading"
              danger
              shape="round"
              type="primary"
              @click="onDelete"
            >
              <template #icon>
                <i-delete-five fill="currentColor" size="16" theme="outline" />
              </template>
              删除
            </a-button>
            <a-button shape="round" type="primary" @click="onClickUpload">
              <template #icon>
                <i-upload-one fill="currentColor" size="16" theme="outline" />
              </template>
              上传
            </a-button>
            <a-button v-if="!selection" shape="round" type="primary" @click="onSelection">
              <template #icon>
                <i-full-selection fill="currentColor" size="16" theme="outline" />
              </template>
              选择
            </a-button>
            <a-button v-if="selection" shape="round" type="primary" @click="onSelection">
              <template #icon>
                <i-close fill="currentColor" size="16" theme="outline" />
              </template>
              取消
            </a-button>
          </div>
        </div>
        <!-- @vue-generic {import('@youyu/shared/types/vo/album').AlbumImageVo} -->
        <vue-content-page
          ref="VueContentPageRef"
          :url="GET_ALBUM_IMAGE_PAGE"
          :params="{ id: albumId, pageSize: 25 }"
          class="album-content-list"
          data-text="照片"
          unit-text="张"
        >
          <template #default="{ list }">
            <vue-image v-for="(item, index) in list" :key="item.id" :url="item.url" @click="onImageClick(item, index)">
              <template #top>
                <div>
                  <svg
                    v-if="album.coverImageId ? item.id === album?.coverImageId : index === 0"
                    aria-hidden="true"
                    class="album-cover-tag icon"
                  >
                    <use xlink:href="#icon-fengmian" />
                  </svg>
                  <div v-if="selection && checkedList.includes(item)" class="item-check">
                    <i-check-one fill="#1677FF" size="24" theme="filled" />
                  </div>
                </div>
              </template>
              <template #bottom>
                <div class="image-info-box">
                  <div class="info-item">
                    <span class="info-label">日期</span>
                    <span class="info-value">{{ dayjs(item.createTime).format('MM-DD') }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">大小</span>
                    <span class="info-value">{{ formatSize(item.size) }}</span>
                  </div>
                </div>
              </template>
            </vue-image>
          </template>
        </vue-content-page>
      </div>
      <div class="album-info-body">
        <AlbumDetailInfo ref="AlbumDetailInfoRef" :album-id="albumId" />
        <div class="collapse-button" @click="onCollapse">
          <i-right fill="currentColor" size="16" theme="outline" />
        </div>
      </div>
    </div>
    <div v-else-if="album === false" class="inaccessible-wrapper">
      <div class="tip-text">您没有权限访问该相册</div>
      <a-button v-login="onApply" type="primary"> 申请访问 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { GET_ALBUM_DETAIL, GET_ALBUM_IMAGE_PAGE } from '@youyu/shared/apis';
import { VueContentPage } from '@youyu/shared/components-vue';
import { VueImage } from '@youyu/shared/components-vue';
import http from '@youyu/shared/network';
import { convertHEICUrlToBlob } from '@youyu/shared/utils';
import openImage from '@youyu/shared/vue-hooks/openImage';
import { message, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import type { UploadResult } from '@/components/common/utils/upload/types';
import { getUrlImageFormat, formatSize } from '@/components/common/utils/upload/utils';
import openModal from '@/libs/tools/openModal';
import { useLoadingStore } from '@/store/system';
import AlbumDetailInfo from '@/views/album/detail/AlbumDetailInfo.vue';
import UploadImageList from '@/views/album/detail/UploadImageList.vue';
import type { AlbumImageVo } from '@youyu/shared/types/vo/album';
import type { AlbumVo } from '@youyu/shared/types/vo/album';
import type { ComponentExposed } from 'vue-component-type-helpers';

const loadingStore = useLoadingStore();

defineOptions({
  name: 'AlbumDetail',
});

const { getters, dispatch } = useStore();

const route = useRoute();
const userInfo = computed(() => getters['userInfo']);
const collapse = ref<boolean>(false);
const albumId: string = route.params.albumId as string;
const album = ref<AlbumVo | null>(null);
const VueContentPageRef = ref<ComponentExposed<typeof VueContentPage> | null>(null);
const AlbumDetailInfoRef = ref<InstanceType<typeof AlbumDetailInfo> | null>(null);
const setCoverLoading = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);
const selection = ref(false);
const checkedList = ref<AlbumImageVo[]>([]);
const imageList = computed(() => VueContentPageRef.value?.dataList ?? []);

/**
 * 获取相册详情
 */
function getAlbumDetail() {
  loadingStore.setContentLoading(true);
  http
    .post<AlbumVo>(GET_ALBUM_DETAIL, { id: albumId })
    .then(res => {
      album.value = res.data;
    })
    .finally(() => {
      loadingStore.setContentLoading(false);
    });
}

getAlbumDetail();

const onCollapse = () => {
  collapse.value = !collapse.value;
};

const onClickUpload = async () => {
  await openModal({
    component: UploadImageList,
    componentProps: {
      albumId: albumId,
    },
    maskClosable: false,
    title: '上传照片',
    width: '1200px',
    centered: true,
    beforeConfirm: (done: () => void, data: UploadResult[]) => {
      if (!data) {
        // data为undefined表示都上传成功了
        done();
      } else {
        const successData = data.map(item => {
          item.file.url = item.file.thumb;
          return item.file;
        });
        // imageList.value.unshift(...successData);
      }
    },
  });
};

const onApply = () => {
  console.log('onApply');
};

const onImageClick = (item: AlbumImageVo, index: number) => {
  console.log(item);
  if (selection.value) {
    if (checkedList.value.includes(item)) {
      const findIndex = checkedList.value.findIndex(i => i === item);
      checkedList.value.splice(findIndex, 1);
    } else {
      checkedList.value.push(item);
    }
  } else {
    openImage({
      componentProps: {
        list: imageList.value.map(item => item.url),
        current: index,
        originTransfer: (index: number) => {
          const { originUrl } = imageList.value[index];
          if (originUrl) {
            return originUrl;
          } else {
            return dispatch('getAlbumImageOrigin', { id: imageList.value[index].id }).then(async res => {
              const format = getUrlImageFormat(res.data);
              if (format.toLowerCase() === 'heic') {
                imageList.value[index].originUrl = await convertHEICUrlToBlob(res.data);
              } else {
                imageList.value[index].originUrl = res.data;
              }
              return imageList.value[index].originUrl;
            });
          }
        },
      },
    });
  }
};

const onSelection = () => {
  selection.value = !selection.value;
  if (!selection.value) {
    checkedList.value = [];
  }
};

const onSetCover = () => {
  setCoverLoading.value = true;
  const newCoverId = checkedList.value[0].id;
  dispatch('setAlbumCover', {
    id: album.value?.id,
    coverImageId: newCoverId,
  })
    .then(res => {
      message.success('设置成功');
      album.value!.coverImageId = newCoverId;
      selection.value = false;
    })
    .finally(() => {
      setCoverLoading.value = false;
    });
};

const onDelete = () => {
  deleteLoading.value = true;
  Modal.confirm({
    title: '删除照片',
    content: '确定删除这些照片？',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      const ids = checkedList.value.map(item => item.id).join(',');
      dispatch('removeAlbumImage', { ids: ids })
        .then(res => {
          message.success('删除成功');
          VueContentPageRef.value &&
            (VueContentPageRef.value.list =
              VueContentPageRef.value?.list.filter(item => !checkedList.value.includes(item)) ?? []);
          checkedList.value = [];
        })
        .finally(() => {
          deleteLoading.value = false;
        });
    },
    onCancel() {
      deleteLoading.value = true;
    },
  });
};
</script>

<style lang="scss" scoped>
$infoBodyWidth: 300px;
$imageWrapperPadding: 4px;
$gridGap: 2px;
$imageWidth: 152px;

.album-detail-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);

  .album-detail {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .album-images-wrapper {
      flex: 1;
      overflow-y: auto;

      button {
        margin-right: 6px;
      }

      ::v-deep(.i-icon) {
        position: relative;
        top: 1px;
        margin-right: 3px;
      }

      .album-detail-top {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
        padding: 0 20px;
        background-color: var(--youyu-body-background2);
        border-bottom: var(--youyu-navigation-border);

        .album-name {
          font-size: 16px;
          font-weight: bold;
        }
      }

      .album-content-list {
        padding: $imageWrapperPadding;

        .album-cover-tag {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          font-size: 48px;
        }

        .item-check {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 1;
        }

        .image-info-box {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
          font-size: 12px;
          color: white;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
          cursor: pointer;
          transition: 0.3s;
          transform: translateY(100%);

          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4px;

            .info-label {
              font-size: 10px;
              opacity: 0.7;
              letter-spacing: 0.5px;
            }

            .info-value {
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 0.3px;
            }
          }
        }

        ::v-deep(.data-list) {
          font-size: 0;

          .vue-image-wrapper {
            margin-right: $imageWrapperPadding;
            margin-bottom: $imageWrapperPadding;

            &:hover {
              .image-info-box {
                transform: translateY(0);
              }
            }
          }
        }

        ::v-deep(.vue-content-page-status) {
          height: 36px;
          background: none;
        }
      }
    }

    .album-info-body {
      position: relative;
      z-index: 1;
      width: $infoBodyWidth;
      height: 100%;
      overflow: visible;
      border-right: var(--youyu-navigation-border);
      transition: 0.3s;
      transform: translateX(0);

      .collapse-button {
        position: absolute;
        top: calc(50% - 33px);
        left: -16px;
        display: flex;
        align-items: center;
        width: 0;
        height: 66px;
        color: #bebebe;
        border: 8px solid transparent;
        border-right: 16px solid var(--youyu-background2);
        border-left: 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--youyu-text2);
        }
      }
    }

    &.album-detail-collapse {
      .upload-btn {
        transform: translateX(-50%);
      }

      .album-info-body {
        margin-right: -$infoBodyWidth !important;

        .collapse-button {
          .i-icon {
            transform: rotateY(180deg) !important;
          }
        }
      }
    }
  }

  .inaccessible-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 260px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;

    .tip-text {
      margin-bottom: 12px;
    }
  }
}
</style>
