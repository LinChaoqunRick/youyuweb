<template>
  <ContentData
    v-slot="{ data }"
    url="getAlbumAccessible"
    :params="{ id: albumId }"
    class="content-data-container"
  >
    <div class="album-detail-container">
      <div v-if="data" class="album-detail" :class="{ 'album-detail-collapse': collapse }">
        <div class="album-images-wrapper youyu-scrollbar">
          <div v-if="userInfo.id === albumDetailData?.userId" class="album-detail-top-menu">
            <a-button type="primary" shape="round" @click="onClickUpload">
              <template #icon>
                <i-upload-one theme="outline" size="16" fill="currentColor" />
              </template>
              上传
            </a-button>
            <a-button
              v-if="!selection"
              type="primary"
              shape="round"
              @click="onSelection"
            >
              <template #icon>
                <i-full-selection theme="outline" size="16" fill="currentColor" />
              </template>
              选择
            </a-button>
            <a-button
              v-if="selection"
              type="primary"
              shape="round"
              @click="onSelection"
            >
              <template #icon>
                <i-close theme="outline" size="16" fill="currentColor" />
              </template>
              取消
            </a-button>
            <a-button
              v-if="selection"
              :loading="setCoverLoading"
              type="primary"
              shape="round"
              :disabled="!(checkedList.length === 1)"
              @click="onSetCover"
            >
              <template #icon>
                <i-pic theme="outline" size="16" fill="currentColor" />
              </template>
              设为封面
            </a-button>
            <a-button
              v-if="selection"
              :loading="deleteLoading"
              type="primary"
              danger
              shape="round"
              :disabled="!checkedList.length"
              @click="onDelete"
            >
              <template #icon>
                <i-delete-five theme="outline" size="16" fill="currentColor" />
              </template>
              删除
            </a-button>
          </div>
          <ContentList
            ref="ContentListRef"
            url="getAlbumImageList"
            :params="params"
            auto-load
            data-text="照片"
            unit="张"
            class="album-content-list"
          >
            <template #default="{ list }">
              <div
                v-for="(item, index) in imageList"
                :key="item.id"
                class="image-wrapper"
                :class="{ 'album-cover': item.id === albumDetailData?.coverImageId }"
                @click="onImageClick(item, index)"
              >
                <svg
                  v-if="albumDetailData?.coverImageId ? item.id === albumDetailData?.coverImageId : index === 0"
                  class="album-cover-tag icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-fengmian" />
                </svg>
                <img :src="item.url" :alt="item.name" class="cp">
                <div v-if="selection && checkedList.includes(item)" class="item-check">
                  <i-check-one theme="filled" size="24" fill="#1677FF" />
                </div>
                <div class="image-info-box">
                  <div class="info-data-item">
                    <i-time theme="outline" size="13" fill="currentColor" />
                    <div class="info-create-time">
                      {{ dayjs(item.createTime).format('YYYY-MM-DD') }}
                    </div>
                  </div>
                  <div class="info-data-item">
                    <i-link-cloud theme="outline" size="13" fill="currentColor" />
                    <div class="info-create-time">
                      {{ formatSize(item.size) }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </ContentList>
        </div>
        <div class="album-info-body">
          <AlbumDetailInfo ref="AlbumDetailInfoRef" :album-id="albumId" />
          <div class="collapse-button" @click="onCollapse">
            <i-right theme="outline" size="16" fill="currentColor" />
          </div>
        </div>
      </div>
      <div v-else-if="data === false" class="inaccessible-wrapper">
        <div class="tip-text">
          您没有权限访问该相册
        </div>
        <a-button v-login="onApply" type="primary">
          申请访问
        </a-button>
      </div>
    </div>
  </ContentData>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { message, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ContentData from '@/components/common/system/ContentData.vue';
import ContentList from '@/components/common/system/ContentList.vue';
import type { UploadResult } from '@/components/common/utils/upload/types';
import { convertHEICUrlToBlob, getUrlImageFormat, formatSize } from '@/components/common/utils/upload/utils';
import openModal from '@/libs/tools/openModal';
import AlbumDetailInfo from '@/views/album/detail/AlbumDetailInfo.vue';
import type { AlbumImageItem } from '@/views/album/detail/types';
import UploadImageList from '@/views/album/detail/UploadImageList.vue';
import openImage from '../../../../../../packages/shared/vue-hooks/openImage';

defineOptions({
  name: 'AlbumDetail',
});

const { getters, dispatch } = useStore();

const route = useRoute();
const userInfo = computed(() => getters['userInfo']);

const collapse = ref<boolean>(false);
const albumId: string = route.params.albumId as string;
const ContentListRef = ref<InstanceType<typeof ContentList> | null>(null);
const AlbumDetailInfoRef = ref<InstanceType<typeof AlbumDetailInfo> | null>(null);
const imageList = computed<Array<AlbumImageItem>>(() => ContentListRef.value?.list as Array<AlbumImageItem>);
const setCoverLoading = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);

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
    centered: true,
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
        const {originUrl} = imageList.value[index];
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
    id: albumDetailData.value?.id,
    coverImageId: newCoverId,
  })
    .then(res => {
      message.success('设置成功');
      albumDetailData.value!.coverImageId = newCoverId;
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
          ContentListRef.value &&
            (ContentListRef.value.list =
              ContentListRef.value?.list.filter(item => !checkedList.value.includes(item)) ?? []);
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
$imageWrapperPadding: 2px;
$gridGap: 2px;
$imageWidth: 152px;

.content-data-container {
  height: calc(100vh - 100px);

  .album-detail-container {
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
          &:nth-child(n + 2) {
            margin-left: 6px;
          }
        }

        ::v-deep(.i-icon) {
          position: relative;
          top: 1px;
          margin-right: 3px;
        }

        .album-detail-top-menu {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 48px;
          padding-right: 20px;
          background-color: var(--youyu-body-background2);
          border-bottom: var(--youyu-navigation-border);
        }

        .album-content-list {
          padding: $imageWrapperPadding;

          .image-wrapper {
            position: relative;
            width: $imageWidth;
            height: $imageWidth;
            overflow: hidden;
            background-color: rgb(192, 192, 192, 0.8);

            &:hover {
              .image-info-box {
                transform: translateY(0);
              }
            }

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
            }

            .image-info-box {
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              justify-content: space-between;
              padding: 2px;
              font-size: 11px;
              color: white;
              background: linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.42));
              cursor: pointer;
              transition: 0.3s;
              transform: translateY(100%);

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
            width: 100%;
            height: 100%;
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
            height: 42px;
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
}
</style>
