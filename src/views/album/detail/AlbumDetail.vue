<template>
  <div class="album-detail">
    <div class="album-images-wrapper">
      <ContentList
        url="getAlbumImageList"
        :params="params"
        auto-load
        data-text="照片"
        class="album-content-list"
        ref="ContentListRef">
        <template v-slot="{ list }">
          <div class="image-wrapper"><img v-for="item in list" :src="item.url" :alt="item.name" class="cp" /></div>
        </template>
      </ContentList>
    </div>
    <div class="album-info-body" :class="{'album-info-collapse':collapse}">
      <AlbumDetailInfo :albumId="albumId" />
      <div class="collapse-button" @click="onCollapse">
        <i-right theme="outline" size="16" fill="currentColor" />
      </div>
    </div>
    <a-button class="upload-btn" type="primary" shape="round">
      <template #icon>
        <i-upload-one theme="outline" size="16" fill="currentColor"/>
      </template>
      上传
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AlbumDetailInfo from '@/views/album/detail/AlbumDetailInfo.vue';
import ContentList from '@/components/common/system/ContentList.vue';
import { computed, ref } from 'vue';

const { dispatch } = useStore();

const route = useRoute();

const collapse = ref<boolean>(false);
const albumId = route.params.albumId;

const params = computed(() => ({ id: albumId }));

const onCollapse = () => {
  collapse.value = !collapse.value;
};

</script>

<style lang="scss" scoped>
.album-detail {
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;

  .album-images-wrapper {
    padding: 8px 16px;
    flex: 1;
    overflow: hidden;

    .album-content-list {
      .image-wrapper {
        height: 180px;
        width: 180px;
        overflow: hidden;
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
    }
  }

  .album-info-body {
    position: relative;
    height: 100%;
    width: 300px;
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

    &.album-info-collapse {
      margin-right: -300px;

      .collapse-button {
        .i-icon {
          transform: rotateY(180deg);
        }
      }
    }
  }

  .upload-btn {
    position: fixed;
    bottom: 55px;
    left: calc(50%);
    transform: translateX(-50%);
    opacity: 1;
    transition: 0.3s;

    ::v-deep(.i-icon) {
      position: relative;
      top: 1px;
      margin-right: 3px;
    }
  }
}
</style>
