<template>
  <div class="favorites-item cp">
    <div class="favorites-preview">
      <img :src="getFavoriteCover" alt="" />
      <div class="post-count">
        <i-star theme="outline" size="12" fill="currentColor" />
        {{ data.count }}
      </div>
    </div>
    <div class="favorites-data">
      <div class="favorites-name">{{ data.name }}</div>
      <div class="favorites-data-bottom">
        <span>创建于：{{ data.createTime.slice(0, 10) }}</span>
        <span>类型：{{ open ? '公开' : '私密' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

interface FavoritesType {
  id?: string;
  userId?: number;
  name?: string;
  postIds?: string;
  cover?: string;
  open?: number;
  isTop?: number;
  likeCount?: number;
  createTime?: string;
  updateTime?: string;
  previewPosts?: [];
}

const props = defineProps({
  data: {
    type: Object as PropType<FavoritesType>,
    require: true,
  },
});

const getFavoriteCover = computed(() => {
  const firstPost = props.data?.previewPosts?.[0];
  return firstPost ? firstPost.cover : props.data?.cover;
});
</script>

<style scoped lang="scss">
.favorites-item {
  display: flex;
  height: 85px;
  padding: 6px 0;
  background-color: var(--youyu-background1);

  .favorites-preview {
    position: relative;
    height: 100%;
    margin-right: 8px;

    img {
      height: 100%;
      border-radius: 2px;
    }

    .post-count {
      display: flex;
      align-items: center;
      position: absolute;
      right: 4px;
      bottom: 4px;
      line-height: 18px;
      padding: 0 4px;
      font-size: 12px;
      border-radius: 2px;
      color: white;
      background-color: rgba(0, 0, 0, 0.7);

      .i-icon {
        margin-right: 2px;
      }
    }
  }

  .favorites-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .favorites-name {
      font-size: 16px;
    }

    .favorites-data-bottom {
      color: var(--youyu-text1);

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
