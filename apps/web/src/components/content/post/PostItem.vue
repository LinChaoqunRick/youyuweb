<template>
  <div ref="thisRef" class="post-item">
    <div v-if="thumbnails.length < 3" class="article-item" :class="{ 'flex-revert': !!(index % 2) }">
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{ name: 'PostDetail', params: { postId: data.id } }">
          <img :src="thumbnails[0]" alt="" />
          <div class="item-slants">
            <div class="item-slant item-slant-top" />
            <div class="item-slant item-slant-bottom" />
          </div>
        </RouterLink>
      </div>
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{ name: 'PostDetail', params: { postId: data.id } }">
            {{ data.title }}
          </RouterLink>
        </div>
        <RouterLink
          class="post-link article-caption"
          :to="{ name: 'PostDetail', params: { postId: data.id } }"
          v-html="data.summary"
        />
        <div class="article-info">
          <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">
            {{ data.user.nickname }}
          </RouterLink>
          <span class="info-item category-name">{{ data.categoryName }}</span>
          <span class="info-item">{{ data.createTime.substr(0, 10) }}</span>
          <span class="info-item">{{ data.commentCount }}&ensp;评论</span>
          <span class="info-item">{{ data.viewCount }}&ensp;阅读</span>
        </div>
      </div>
    </div>
    <div v-else class="article-item article-item-more-pic">
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{ name: 'PostDetail', params: { postId: data.id } }">
            {{ data.title }}
          </RouterLink>
        </div>
      </div>
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{ name: 'PostDetail', params: { postId: data.id } }">
          <div v-for="img in thumbnails" :key="img" class="img-container">
            <img :src="img" alt="" />
          </div>
        </RouterLink>
      </div>
      <div class="article-info">
        <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">
          {{ data.user.nickname }}
        </RouterLink>
        <span class="info-item create-type" :class="[`create_type_${data.createType}`]">
          {{ createTypeList[data.createType] }}
        </span>
        <span class="info-item category-name">{{ data.categoryName }}</span>
        <span class="info-item">{{ data.createTime.substr(0, 10) }}</span>
        <span class="info-item">{{ data.commentCount }}&ensp;评论</span>
        <span class="info-item">{{ data.viewCount }}&ensp;阅读</span>
      </div>
    </div>
    <div class="hover-tag" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const createTypeList = ['原创', '转载', '翻译'];
const thisRef = ref(null);

const thumbnails = computed(() => {
  return props.data.thumbnail.split(',').splice(0, 3);
});
</script>

<style lang="scss" scoped>
.post-item {
  position: relative;
  display: flex;
  align-items: center;

  .article-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 180px;
    margin-bottom: 8px;
    background-color: var(--youyu-body-background2);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .image-wrapper {
      width: 253px;
      padding: 14px;
      overflow: hidden;

      .post-link {
        position: relative;
        display: block;
        width: 224px;
        height: 150px;
        overflow: hidden;
        color: inherit;
        border-radius: 8px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 18px 20px 16px 0;
      overflow: hidden;

      .article-title {
        width: 100%;
        margin-bottom: 8px;
        font-size: 19px;
        font-weight: 600;
        line-height: 1.4;
        cursor: pointer;
        transition: color 0.25s ease;

        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover {
          color: #1890ff;
        }
      }

      .article-caption {
        flex: 1;
        overflow: hidden;
        font-size: 14px;
        line-height: 1.8;
        color: var(--article-info-color);
        text-overflow: ellipsis;
        opacity: 0.85;
        cursor: pointer;
        transition: opacity 0.25s ease;

        &:hover {
          opacity: 1;
        }
      }

      .article-info {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 0;
        align-items: center;
        padding-top: 8px;
        font-size: 13px;
        color: var(--article-info-color);
        opacity: 0.75;
      }
    }
  }

  .article-item-more-pic {
    display: block;
    height: 240px;

    .content-wrapper {
      width: 100%;
      height: auto;
      padding: 16px 18px 10px;
    }

    .image-wrapper {
      display: flex;
      gap: 8px;
      width: 100%;
      padding: 0 18px;

      .post-link {
        display: flex;
        gap: 8px;
        width: 100%;
        height: 140px;
        color: inherit;

        .img-container {
          flex: 1;
          height: 140px;
          overflow: hidden;
          border-radius: 8px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      }
    }

    .article-info {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 0;
      align-items: center;
      padding-top: 10px;
      margin: 0 18px;
      font-size: 13px;
      color: var(--article-info-color);
      opacity: 0.75;
    }
  }

  .hover-tag {
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 0;
    background: linear-gradient(180deg, #1890ff 0%, #40a9ff 100%);
    border-radius: 0 4px 4px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-50%);
  }

  &:hover {
    .article-item {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    .hover-tag {
      height: 50%;
    }

    .image-wrapper {
      img {
        transform: scale(1.08);
      }
    }

    .article-item-more-pic {
      .img-container img {
        transform: scale(1.05);
      }
    }
  }
}

.flex-revert {
  flex-direction: row-reverse;

  .content-wrapper {
    padding: 18px 0 16px 20px !important;
  }
}

.article-info {
  .info-nickname {
    font-weight: 500;
    color: #1890ff;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .create-type {
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 500;
    background-color: rgba(24, 144, 255, 0.1);
    border-radius: 4px;
  }

  .category-name {
    font-weight: 500;
    color: #1890ff;
    transition: color 0.2s ease;
  }

  .create_type_0 {
    color: #52c41a;
    background-color: rgba(82, 196, 26, 0.1);
  }

  .create_type_1 {
    color: #ff4d4f;
    background-color: rgba(255, 77, 79, 0.1);
  }

  .create_type_2 {
    color: #597ef7;
    background-color: rgba(89, 126, 247, 0.1);
  }

  .info-item {
    &:nth-child(n + 2) {
      &::before {
        padding: 0 6px;
        color: rgba(0, 0, 0, 0.25);
        content: '·';
      }
    }
  }
}

.post-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
</style>

<style lang="scss" scoped>
.post-item {
  .article-item {
    .item-slants {
      position: absolute;
      inset: 0;
      border-radius: 10px;
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.15);
      pointer-events: none;

      .item-slant {
        position: absolute;
        inset: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

        &.item-slant-top {
          transform: rotate(109deg) translateY(220px);
        }

        &.item-slant-bottom {
          transform: rotate(70deg) translateY(190px);
        }
      }
    }

    &:hover {
      .item-slant {
        &.item-slant-top {
          background: linear-gradient(135deg, rgba(24, 144, 255, 0.85) 0%, rgba(64, 169, 255, 0.75) 100%);
          transform: rotate(109deg) translateY(159px);
        }

        &.item-slant-bottom {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
          transform: rotate(70deg) translateY(155px);
        }
      }
    }
  }

  .flex-revert {
    .item-slant-top {
      transform: rotate(-109deg) translateY(220px) !important;
    }

    .item-slant-bottom {
      transform: rotate(-70deg) translateY(190px) !important;
    }

    &:hover {
      .item-slant-top {
        background: linear-gradient(135deg, rgba(24, 144, 255, 0.85) 0%, rgba(64, 169, 255, 0.75) 100%);
        transform: rotate(-109deg) translateY(159px) !important;
      }

      .item-slant-bottom {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
        transform: rotate(-70deg) translateY(155px) !important;
      }
    }
  }
}
</style>
