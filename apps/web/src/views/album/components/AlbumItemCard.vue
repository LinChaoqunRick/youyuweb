<template>
  <RouterLink :to="`/album/detail/${album.id}`" class="album-item-link">
    <div class="album-item-card">
      <!-- 相册封面 -->
      <div class="album-cover-wrapper">
        <img :src="album.cover || '/static/images/common/no_img_top.png'" :alt="album.name" class="album-cover">

        <!-- 封面叠加层 -->
        <div class="cover-overlay">
          <!-- 用户信息 -->
          <div class="user-info">
            <img :src="album.userInfo?.avatar" :alt="album.userInfo?.nickname" class="user-avatar">
            <span class="user-name">{{ album.userInfo?.nickname }}</span>
          </div>

          <!-- 统计信息和元数据 -->
          <div class="cover-meta">
            <div class="album-stats">
              <div class="stat-item">
                {{ formatDate(album.createTime) }}
              </div>
              <div class="stat-item">
                <i-material-three theme="outline" size="14" fill="currentColor" />
                <span>{{ album.imageCount }}</span>
              </div>
              <div class="stat-item album-meta" :class="['privacy-status', album.open ? 'open' : 'private']">
                <span>
                  {{ album.open ? '公开' : '私密' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 相册信息 -->
      <div class="album-info-section">
        <h3 class="album-name" :title="album.name">
          {{ album.name }}
        </h3>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import dayjs from 'dayjs';
import type { AlbumVo } from '@youyu/shared/types/vo/album';

const props = defineProps({
  album: {
    type: Object as PropType<AlbumVo>,
    required: true,
  },
});

console.log(props.album);

const formatDate = (date?: string) => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
};
</script>

<style scoped lang="scss">
.album-item-link {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.album-item-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--youyu-body-background2) 0%, var(--youyu-body-background) 100%);
  border: 1px solid rgb(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgb(0, 0, 0, 0.12);
    box-shadow: 0 12px 24px rgb(0, 0, 0, 0.15);
    transform: translateY(-6px);

    .album-cover {
      transform: scale(1.08);
    }

    .cover-overlay {
      opacity: 1;
    }
  }

  .album-cover-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    aspect-ratio: 1;

    .album-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cover-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 14px;
      background: linear-gradient(180deg, rgb(0, 0, 0, 0.3) 0%, rgb(0, 0, 0, 0) 40%, rgb(0, 0, 0, 0.5) 100%);
      opacity: 1;
      pointer-events: none;
      transition: opacity 0.3s ease;

      .user-info {
        display: flex;
        gap: 8px;
        align-items: center;

        .user-avatar {
          width: 32px;
          height: 32px;
          object-fit: cover;
          border: 2.5px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgb(0, 0, 0, 0.2);
        }

        .user-name {
          overflow: hidden;
          font-size: 13px;
          font-weight: 500;
          color: white;
          text-overflow: ellipsis;
          text-shadow: 0 1px 3px rgb(0, 0, 0, 0.4);
          white-space: nowrap;
        }
      }

      .album-stats {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;

        .stat-item {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 500;
          color: white;
          background-color: rgb(0, 0, 0, 0.35);
          border-radius: 6px;
          backdrop-filter: blur(6px);
          transition: all 0.2s ease;

          &.private-badge {
            background-color: rgb(255, 77, 79, 0.5);
          }

          &:hover {
            background-color: rgb(0, 0, 0, 0.45);
          }
        }

        .privacy-status {
          &.open {
            background-color: rgb(85, 255, 0, 0.42);
          }

          &.private {
            background-color: rgb(250, 0, 2, 0.42);
          }
        }

        .album-date {
          font-size: 11px;
          color: var(--youyu-text-secondary, #999);
        }
      }

      .cover-meta {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .create-date {
          font-size: 11px;
          font-weight: 500;
          color: white;
          text-shadow: 0 1px 2px rgb(0, 0, 0, 0.3);
        }
      }
    }
  }

  .album-info-section {
    flex: 0 0 auto;
    padding: 14px;
    background: var(--youyu-body-background2);
    transition: all 0.3s ease;

    .album-name {
      margin: 0;
      overflow: hidden;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.3;
      color: var(--youyu-text);
      text-overflow: ellipsis;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
  }
}
</style>
