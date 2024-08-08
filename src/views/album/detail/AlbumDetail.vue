<template>
  <ContentData url="getAlbumAccessible" :params="{ id: albumId }" v-slot="{ data }" class="content-data-container">
    <div class="album-detail-container">
      <div v-if="data" class="album-detail" :class="{ 'album-detail-collapse': collapse }">
        <div class="album-images-wrapper">
          <ContentList
            url="getAlbumImageList"
            :params="params"
            auto-load
            data-text="张照片"
            class="album-content-list"
            ref="ContentListRef"
          >
            <template v-slot="{ list }">
              <div
                v-for="(item, index) in imageList"
                :key="item.id"
                class="image-wrapper"
                @click="onImageClick(item, index)"
              >
                <img :src="item.url" :alt="item.name" class="cp" />
                <div class="item-check" v-if="selection && checkedList.includes(item)">
                  <i-check-one theme="filled" size="24" fill="#1677FF" />
                </div>
                <div class="image-info-box gf">
                  <div class="info-data-item">
                    <i-time theme="outline" size="13" fill="currentColor" />
                    <div class="info-create-time">{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</div>
                  </div>
                  <div class="info-data-item">
                    <i-link-cloud theme="outline" size="13" fill="currentColor" />
                    <div class="info-create-time">{{ formatSize(item.size) }}</div>
                  </div>
                </div>
              </div>
            </template>
          </ContentList>
        </div>
        <div class="album-info-body">
          <AlbumDetailInfo :albumId="albumId" ref="AlbumDetailInfoRef" />
          <div class="collapse-button" @click="onCollapse">
            <i-right theme="outline" size="16" fill="currentColor" />
          </div>
        </div>
        <div class="upload-btn" v-if="userInfo.id === albumDetailData?.userId">
          <a-button type="primary" shape="round" @click="onClickUpload">
            <template #icon>
              <i-upload-one theme="outline" size="16" fill="currentColor" />
            </template>
            上传
          </a-button>
          <a-button type="primary" shape="round" v-if="!selection" @click="onSelection">
            <template #icon>
              <i-full-selection theme="outline" size="16" fill="currentColor" />
            </template>
            选择
          </a-button>
          <a-button type="primary" shape="round" v-if="selection" @click="onSelection">
            <template #icon>
              <i-close theme="outline" size="16" fill="currentColor" />
            </template>
            取消
          </a-button>
          <a-button
            type="primary"
            shape="round"
            v-if="selection"
            :disabled="!(checkedList.length === 1)"
            @click="onSetCover"
          >
            <template #icon>
              <i-pic theme="outline" size="16" fill="currentColor" />
            </template>
            设为封面
          </a-button>
          <a-button type="primary" danger shape="round" v-if="selection" :disabled="!checkedList.length" @click="onDelete">
            <template #icon>
              <i-delete-five theme="outline" size="16" fill="currentColor" />
            </template>
            删除
          </a-button>
        </div>
      </div>
      <div v-else-if="data === false" class="inaccessible-wrapper gf">
        <div class="tip-text">您没有权限访问该相册</div>
        <a-button type="primary" v-login="onApply">申请访问</a-button>
      </div>
    </div>
  </ContentData>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ContentData from '@/components/common/system/ContentData.vue';
import AlbumDetailInfo from '@/views/album/detail/AlbumDetailInfo.vue';
import ContentList from '@/components/common/system/ContentList.vue';
import { computed, ref } from 'vue';
import openModal from '@/libs/tools/openModal';
import UploadImageList from '@/views/album/detail/UploadImageList.vue';
import openImage from '@/libs/tools/openImage';
import { message, Modal } from 'ant-design-vue';
import { convertHEICUrlToBlob, getUrlImageFormat, formatSize } from '@/components/common/utils/upload/utils';
import dayjs from 'dayjs';
import type { UploadResult } from '@/components/common/utils/upload/types';
import type { AlbumImageItem } from '@/views/album/detail/types';

const { getters, dispatch } = useStore();

const route = useRoute();
const userInfo = computed(() => getters['userInfo']);

const collapse = ref<boolean>(false);
const albumId = route.params.albumId;
const ContentListRef = ref<InstanceType<typeof ContentList>>(null);
const AlbumDetailInfoRef = ref<InstanceType<typeof AlbumDetailInfo>>(null);
const imageList = computed<Array<AlbumImageItem>>(() => ContentListRef.value?.list);

const params = computed(() => ({ id: albumId, pageSize: 25 }));
const albumDetailData = computed(() => AlbumDetailInfoRef.value?.data);
const selection = ref(false);
const checkedList = ref<Array<AlbumImageItem>>([]);

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
    beforeConfirm: (done: Function, data: UploadResult[]) => {
      if (!data) {
        // data为undefined表示都上传成功了
        done();
      } else {
        const successData = data.map(item => {
          item.file.url = item.file.thumb;
          return item.file;
        });
        imageList.value.unshift(...successData);
      }
    },
  });
};

const onApply = () => {
  console.log('onApply');
};

const onImageClick = (item: AlbumImageItem, index: number) => {
  if (selection.value) {
    if (checkedList.value.includes(item)) {
      const findIndex = checkedList.value.findIndex(i => i === item);
      checkedList.value.splice(findIndex, 1);
    } else {
      checkedList.value.push(item);
    }
    return;
  }
  openImage({
    componentProps: {
      list: imageList.value.map(item => item.url),
      current: index,
      originTransfer: (index: number) => {
        const originUrl = imageList.value[index].originUrl;
        if (originUrl) {
          return originUrl;
        } else {
          return dispatch('getAlbumImageOrigin', { id: imageList.value[index].id }).then(res => {
            const format = getUrlImageFormat(res.data);
            if (format.toLowerCase() === 'heic') {
              imageList.value[index].originUrl = convertHEICUrlToBlob(res.data);
            } else {
              imageList.value[index].originUrl = res.data;
            }
            return imageList.value[index].originUrl;
          });
        }
      },
    },
  });
};

const onSelection = () => {
  selection.value = !selection.value;
  if (!selection.value) {
    checkedList.value = [];
  }
};

const onSetCover = () => {
  const newCover = checkedList.value[0].path;
  dispatch('updateAlbum', { ...albumDetailData.value, cover: newCover }).then(res => {
    message.success('保存成功');
  });
};

const onDelete = () => {
  Modal.confirm({
    title: '删除照片',
    content: '确定删除这些照片？',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      const ids = checkedList.value.map(item => item.id).join(',');
      dispatch('removeAlbumImage', { ids: ids }).then(res => {
        message.success('删除成功');
        ContentListRef.value.list = ContentListRef.value?.list.filter(item => !checkedList.value.includes(item));
        checkedList.value = [];
      });
    },
  });
};
</script>

<style lang="scss" scoped>
$infoBodyWidth: 300px;
$imageWrapperPadding: 10px;
$gridGap: 2px;
$imageWidth: 164px;

.content-data-container {
  height: calc(100vh - 100px);

  .album-detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    background: rgba(0, 0, 0, 0.15) !important;
    backdrop-filter: blur(10px) !important;

    .album-detail {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;

      .album-images-wrapper {
        padding: $imageWrapperPadding;
        flex: 1;
        overflow-y: auto;

        .album-content-list {
          .image-wrapper {
            height: $imageWidth;
            width: $imageWidth;
            overflow: hidden;
            position: relative;
            background-color: rgba(192, 192, 192, 0.8);

            &:hover {
              .image-info-box {
                transform: translateY(0);
              }
            }

            .item-check {
              position: absolute;
              bottom: 4px;
              right: 9px;
            }

            .image-info-box {
              display: flex;
              justify-content: space-between;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.6);
              color: white;
              padding: 2px;
              font-size: 11px;
              cursor: pointer;
              transform: translateY(100%);
              transition: 0.3s;

              .info-data-item {
                display: flex;
                align-items: center;

                ::v-deep(.i-icon) {
                  margin-right: 2px;
                }
              }
            }
          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: 0.3s;

            &:hover {
              transform: scale(1.05);
            }
          }

          ::v-deep(.data-list-wrapper) {
            margin-top: 0;

            .data-list {
              display: grid;
              grid-template-columns: repeat(auto-fill, $imageWidth);
              grid-gap: $gridGap;
            }
          }

          ::v-deep(.bottom-operation) {
            > div {
              color: var(--youyu-text) !important;
            }
          }
        }
      }

      .album-info-body {
        position: relative;
        height: 100%;
        width: $infoBodyWidth;
        overflow: visible;
        border-right: var(--youyu-navigation-border);
        transform: translateX(0);
        transition: 0.3s;
        z-index: 1;

        .collapse-button {
          display: flex;
          align-items: center;
          position: absolute;
          top: calc(50% - 33px);
          left: -16px;
          width: 0;
          height: 66px;
          border: 8px solid transparent;
          border-left: 0;
          border-right: 16px solid var(--youyu-background2);
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          color: #bebebe;

          &:hover {
            color: var(--youyu-text2);
          }
        }
      }

      .upload-btn {
        position: fixed;
        bottom: 20px;
        left: calc(50%);
        transform: translateX(calc(-50% - #{$infoBodyWidth} / 2));
        opacity: 1;
        transition: 0.3s;

        button {
          &:nth-child(n + 2) {
            margin-left: 6px;
          }
        }

        ::v-deep(.i-icon) {
          position: relative;
          top: 1px;
          margin-right: 3px;
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
      height: 260px;
      width: 400px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: bold;

      .tip-text {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
