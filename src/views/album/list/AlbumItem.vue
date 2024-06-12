<template>
  <div class="album-item cp">
    <div class="album-cover">
      <img :src="data.cover" alt="">
      <div class="detail-info">
        <div class="detail-info-user">
          <img :src="data.userInfo?.avatar" alt="">
          <div class="user-nickname">{{ data.userInfo?.nickname }}</div>
        </div>
        <div class="album-info-data">
          <div class="album-info-data-item">
            <i-material-three theme="outline" size="16" fill="currentColor" />
            <span>{{ data.imageCount }}</span>
          </div>
        </div>
      </div>
      <div class="detail-mask">
        <div class="detail-info-createTime">
          创建于：{{ dayjs(data.createTime).format('YYYY-MM-DD') }}
        </div>
        <div class="detail-info-content">
          简介：{{ data.content }}
        </div>
      </div>
    </div>
    <div class="album-info">
      <div class="album-info-name text-limit">{{ data.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AlbumType } from '@/views/album/type';
import type { PropType } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  data: {
    type: Object as PropType<AlbumType>,
    required: true
  }
});
</script>

<style scoped lang="scss">
.album-item {
  width: 230px;
  background-color: var(--youyu-body-background3);

  .album-cover {
    position: relative;
    height: 160px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .detail-info {
      z-index: 10;

      .detail-info-user {
        display: flex;
        align-items: center;

        .user-nickname {
          margin-left: 6px;
          color: black;
          font-weight: bold;
        }

        img {
          height: 24px;
          width: 24px;
          border-radius: 50%;
        }
      }

      .album-info-data {
        position: absolute;
        bottom: 4px;
        right: 8px;

        .album-info-data-item {
          display: flex;
          justify-items: center;
          align-items: center;
          padding: 0 6px 0 3px;
          border-radius: 4px;
          background-color: rgba(102, 102, 102, 0.2);

          span {
            margin-left: 4px;
          }
        }
      }
    }

    .detail-info, .detail-mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 12px;
    }

    .detail-mask {
      opacity: 0;
      padding-top: 45px;
      background-color: var(--mask-background);
      color: #FFFFFF;
      transition: .3s;
    }
  }

  .album-info {
    padding: 6px 10px;

    .album-info-name {
      font-weight: bold;
    }
  }

  &:hover {
    .detail-mask {
      opacity: 1;
    }

    .user-nickname {
      color: #1890ff !important;
    }

    .album-info-data-item {
      color: #FFFFFF !important;
    }
  }
}
</style>
