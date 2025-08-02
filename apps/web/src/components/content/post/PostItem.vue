<template>
  <div ref="thisRef" class="post-item">
    <div v-if="thumbnails.length < 3" class="article-item" :class="{'flex-revert': !!(index % 2)}">
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
          <img :src="thumbnails[0]">
          <div class="item-slants">
            <div class="item-slant item-slant-top" />
            <div class="item-slant item-slant-bottom" />
          </div>
        </RouterLink>
      </div>
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
            {{ data.title }}
          </RouterLink>
        </div>
        <RouterLink
          class="post-link article-caption"
          :to="{name:'PostDetail',params:{postId:data.id}}"
          v-html="data.summary"
        />
        <div class="article-info">
          <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">
            {{ data.user.nickname }}
          </RouterLink>
          <span
            class="info-item create-type"
            :class="[`create_type_${data.createType}`]"
          >{{ createTypeList[data.createType] }}</span>
          <span class="info-item category-name">{{ data.categoryName }}</span>
          <span class="info-item">{{ (data.createTime).substr(0, 10) }}</span>
          <span class="info-item">{{ data.commentCount }}&ensp;评论</span>
          <span class="info-item">{{ data.viewCount }}&ensp;阅读</span>
        </div>
      </div>
    </div>
    <div v-else class="article-item article-item-more-pic">
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
            {{ data.title }}
          </RouterLink>
        </div>
      </div>
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
          <div v-for="img in thumbnails" class="img-container">
            <img :src="img">
          </div>
        </RouterLink>
      </div>
      <div class="article-info">
        <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">
          {{ data.user.nickname }}
        </RouterLink>
        <span
          class="info-item create-type"
          :class="[`create_type_${data.createType}`]"
        >{{ createTypeList[data.createType] }}</span>
        <span class="info-item category-name">{{ data.categoryName }}</span>
        <span class="info-item">{{ (data.createTime).substr(0, 10) }}</span>
        <span class="info-item">{{ data.commentCount }}&ensp;评论</span>
        <span class="info-item">{{ data.viewCount }}&ensp;阅读</span>
      </div>
    </div>
    <div class="hover-tag" />
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

const createTypeList = ['原创', '转载', '翻译'];
const thisRef = ref(null);

const thumbnails = computed(() => {
  return props.data.thumbnail.split(",").splice(0, 3);
})

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
    height: 170px;
    margin-bottom: 8px;
    background-color: var(--youyu-body-background2);
    border-radius: 8px;

    .image-wrapper {
      width: 240px;

      /* height: 100%; */
      padding: 16px;
      overflow: hidden;

      .post-link {
        position: relative;
        width: 210px;
        height: 140px;
        overflow: hidden;
        color: inherit;
        border-radius: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: .4s;
        }
      }
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 10px 16px 10px 0;
      overflow: hidden;

      .article-title {
        width: 100%;
        height: 30px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;

        a {
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
        height: 0;
        overflow: hidden;
        font-size: 14px;
        line-height: 1.7;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      .article-info {
        height: 20px;
        padding-top: 3px;
        font-size: 12px;

        /* border-top: var(--article-border); */
        color: var(--article-info-color);
      }
    }
  }

  .article-item-more-pic {
    display: block;
    height: 230px;

    .content-wrapper {
      width: 100%;
      height: auto;
      padding: 10px 16px 6px;
    }

    .image-wrapper {
      display: flex;
      width: 100%;
      padding: 0 16px;

      .post-link {
        display: flex;
        width: 100%;
        height: 150px;
        color: inherit;

        .img-container {
          flex: 1;
          height: 150px;
          overflow: hidden;

          &:nth-child(n+2) {
            margin-left: 10px;
          }
        }
      }
    }

    .article-info {
      padding-top: 6px;
      margin: 2px 16px 0;
      font-size: 12px;

      /* border-top: var(--article-border); */
      color: var(--article-info-color);
    }
  }

  .hover-tag {
    position: absolute;
    left: 0;

    /* top: 20%; */
    width: 4px;
    height: 0;
    background-color: #1980ff;
    border-radius: 4px;
    transition: .3s;
  }

  &:hover {
    .hover-tag {
      height: 60%;
    }

    .image-wrapper {
      img {
        transform: scale(1.05);
      }
    }
  }
}


.flex-revert {
  flex-direction: row-reverse;

  .content-wrapper {
    padding: 12px 0 12px 16px !important;
  }
}

.article-info {
  .info-nickname {
    color: #1890ff;
    cursor: pointer;
  }

  .create-type {
    /* background-color: #1890ff; */
    border-radius: 2px;
  }

  .category-name {
    color: #1890ff;
  }

  .create_type_0 {
    color: #67bb55;
  }

  .create_type_1 {
    color: #fc5531;
  }

  .create_type_2 {
    color: #6a87f1;
  }

  .info-item {
    &:nth-child(n+2) {
      &::before {
        padding: 0 5px;
        color: #bbb;
        content: '/';
      }
    }
  }
}

.post-link {
  display: block;
  color: inherit;
}
</style>

<style lang="scss" scoped>
.post-item {
  .article-item {
    .item-slants {
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 12px rgb(0, 0, 0, 0.2); /* 内阴影效果 */

      .item-slant {
        position: absolute;
        inset: 0;

        &.item-slant-top {
          transition: .4s;
          transform: rotate(109deg) translateY(220px);
        }

        &.item-slant-bottom {
          transition: .3s;
          transform: rotate(70deg) translateY(190px);
        }
      }
    }

    &:hover {
      .item-slant {
        &.item-slant-top {
          background-color: rgb(24, 144, 255, 0.8);
          transform: rotate(109deg) translateY(159px);
        }

        &.item-slant-bottom {
          background-color: rgb(255, 255, 255, 0.6);
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
        background-color: rgb(24, 144, 255, 0.8);
        transform: rotate(-109deg) translateY(159px) !important;
      }

      .item-slant-bottom {
        background-color: rgb(255, 255, 255, 0.6);
        transform: rotate(-70deg) translateY(155px) !important;
      }
    }
  }
}
</style>
