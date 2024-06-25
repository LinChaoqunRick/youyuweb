<template>
  <ContentData url="getAlbumAccessible" :params="{id: albumId}" v-slot="{ data }" class="content-data-container">
    <div class="album-detail-container">
      <div v-if="data" class="album-detail" :class="{'album-detail-collapse': collapse}">
        <div class="album-images-wrapper">
          <ContentList
            url="getAlbumImageList"
            :params="params"
            auto-load
            data-text="张照片"
            class="album-content-list"
            ref="ContentListRef">
            <template v-slot="{ list }">
              <div v-for="(item, index) in list" class="image-wrapper" @click="onImageClick(item, index)"><img
                :src="item.url" :alt="item.name" class="cp" /></div>
            </template>
          </ContentList>
        </div>
        <div class="album-info-body">
          <AlbumDetailInfo :albumId="albumId" />
          <div class="collapse-button" @click="onCollapse">
            <i-right theme="outline" size="16" fill="currentColor" />
          </div>
        </div>
        <div id="albumUploadBtn" class="upload-btn" @click="onClickUpload"></div>
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

const { getters, dispatch } = useStore();

const route = useRoute();
const userInfo = computed(() => getters['userInfo']);

const collapse = ref<boolean>(false);
const albumId = route.params.albumId;
const ContentListRef = ref(null);
const imageList = computed(() => ContentListRef.value?.list);

const params = computed(() => ({ id: albumId }));

const onCollapse = () => {
  collapse.value = !collapse.value;
};

const onClickUpload = async () => {
  const res = await openModal({
    component: UploadImageList,
    componentProps: {
      albumId: albumId
    },
    maskClosable: false,
    title: '上传照片',
    width: '1200px'
  });
};

const onApply = () => {
  console.log('onApply');
};

const onImageClick = (item: object, index: object) => {
  openImage({
    componentProps: {
      list: imageList.value.map((item) => item.url),
      current: index,
      originTransfer: (index: number) => {
        const originUrl = imageList.value[index].originUrl;
        if (originUrl) {
          return originUrl;
        } else {
          return dispatch('getAlbumImageOrigin', { id: imageList.value[index].id }).then(res => {
            imageList.value[index].originUrl = res.data;
            return res.data;
          });
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped>
$infoBodyWidth: 300px;

.content-data-container {
  height: calc(100vh - 100px);

  .album-detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);

    .album-detail {
      display: flex;
      height: 100%;
      width: 100%;

      .album-images-wrapper {
        padding: 8px 16px;
        flex: 1;
        overflow: auto;

        .album-content-list {
          .image-wrapper {
            height: 180px;
            width: 180px;
            overflow: hidden;
            margin: 0 12px 12px 0;
          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: .3s;

            &:hover {
              transform: scale(1.05);
            }
          }

          ::v-deep(.data-list) {
            display: flex;
            flex-wrap: wrap;
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
        transition: .3s;
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
          transition: all .3s ease-in-out;
          color: #bebebe;

          &:hover {
            color: var(--youyu-text2);
          }
        }
      }

      .upload-btn {
        position: fixed;
        bottom: 55px;
        left: calc(50%);
        transform: translateX(calc(-50% - #{$infoBodyWidth} / 2));
        opacity: 1;
        transition: 0.3s;

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
