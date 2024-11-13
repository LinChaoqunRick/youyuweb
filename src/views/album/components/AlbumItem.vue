<template>
  <RouterLink :to="`/album/detail/${data.id}`">
    <div class="album-item cp">
      <div class="album-cover">
        <img :src="data.cover || '/static/images/common/no_img_top.png'" alt="" />
        <div class="detail-info">
          <div class="detail-info-user">
            <img :src="data.userInfo?.avatar" alt="" />
            <div class="user-nickname">{{ data.userInfo?.nickname }}</div>
          </div>
          <div class="album-info-data">
            <div class="edit-btn" v-if="false">编辑</div>
            <!--            <div class="album-info-data-item" v-if="!data.open">-->
            <!--              <i-lock theme="outline" size="15" fill="currentColor" />-->
            <!--            </div>-->
            <div class="album-info-data-item">
              <i-material-three theme="outline" size="16" fill="currentColor" />
              <span class="data-image-count">{{ data.imageCount }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="album-info">
        <div class="album-info-name text-limit">{{ data.name }}</div>
        <div :class="[data.open ? 'album-open' : 'album-private']">{{ data.open ? '公开' : '私密' }}</div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import dayjs from 'dayjs';
import type { AlbumDetailData } from '@/views/album/detail/types';

const props = defineProps({
  data: {
    type: Object as PropType<AlbumDetailData>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.album-item {
  background-color: var(--youyu-body-background2);
  overflow: hidden;
  color: var(--youyu-text);
  display: flex;
  flex-direction: column;

  .album-cover {
    position: relative;
    flex: 1;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .detail-info {
      .detail-info-user {
        display: flex;
        align-items: center;

        .user-nickname {
          margin-left: 6px;
          color: black;
        }

        img {
          height: 24px;
          width: 24px;
          border-radius: 50%;
        }
      }

      .album-info-data {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        padding-right: 10px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.36));

        .edit-btn {
          opacity: 0;
          color: #1890ff;
          font-size: 14px;
          margin-right: 4px;
        }

        .album-info-data-item {
          display: flex;
          justify-items: center;
          align-items: center;
          padding: 0 6px;
          border-radius: 4px;
          background-color: rgba(102, 102, 102, 0.2);
          color: white;
          height: 24px;
          margin-left: 3px;

          .data-image-count {
            margin-left: 3px;
          }
        }
      }
    }

    .detail-info {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 12px;
    }
  }

  .album-info {
    padding: 8px 10px;

    .album-open {
      color: #52c41a;
    }

    .album-private {
      color: red;
    }

    .album-info-name {
      //font-weight: bold;
    }
  }

  &:hover {
    .edit-btn {
      opacity: 1 !important;
    }
  }
}
</style>
