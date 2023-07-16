<template>
  <div class="post-item" ref="thisRef">
    <div class="article-item" :class="{'flex-revert': !!(index % 2)}" v-if="thumbnails.length < 3">
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
          <img :src="thumbnails[0]">
          <div class="item-slants">
            <div class="item-slant item-slant-top"></div>
            <div class="item-slant item-slant-bottom"></div>
          </div>
        </RouterLink>
      </div>
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
            <p v-html="data.title"/>
          </RouterLink>
        </div>
        <RouterLink class="post-link article-caption" v-html="data.summary"
                    :to="{name:'PostDetail',params:{postId:data.id}}"/>
        <div class="article-info">
          <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">{{data.user.nickname}}</RouterLink>
          <span class="info-item create-type"
                :class="[`create_type_${data.createType}`]">{{createTypeList[data.createType]}}</span>
          <span class="info-item category-name">{{data.categoryName}}</span>
          <span class="info-item">{{(data.createTime).substr(0, 10)}}</span>
          <span class="info-item">{{data.commentCount}}&ensp;评论</span>
          <span class="info-item">{{data.viewCount}}&ensp;阅读</span>
        </div>
      </div>
    </div>
    <div class="article-item article-item-more-pic" v-else>
      <div class="content-wrapper">
        <div class="article-title">
          <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
            <p v-html="data.title"/>
          </RouterLink>
        </div>
      </div>
      <div class="image-wrapper">
        <RouterLink class="post-link" :to="{name:'PostDetail',params:{postId:data.id}}">
          <div class="img-container" v-for="img in thumbnails">
            <img :src="img">
          </div>
        </RouterLink>
      </div>
      <div class="article-info">
        <RouterLink class="info-item info-nickname" :to="`/user/${data.user.id}`">{{data.user.nickname}}</RouterLink>
        <span class="info-item create-type" :class="[`create_type_${data.createType}`]">{{createTypeList[data.createType]}}</span>
        <span class="info-item category-name">{{data.categoryName}}</span>
        <span class="info-item">{{(data.createTime).substr(0, 10)}}</span>
        <span class="info-item">{{data.commentCount}}&ensp;评论</span>
        <span class="info-item">{{data.viewCount}}&ensp;阅读</span>
      </div>
    </div>
    <div class="hover-tag"></div>
  </div>
</template>

<script setup>
  import {ref, computed, onMounted} from 'vue';
  import {RouterLink} from 'vue-router';

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      default: []
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
    display: flex;
    align-items: center;
    position: relative;

    .article-item {
      height: 170px;
      width: 100%;
      margin-bottom: 8px;
      background-color: var(--article-background);
      display: flex;
      align-items: center;
      border-radius: 8px;
      position: relative;

      .image-wrapper {
        width: 240px;
        /*height: 100%;*/
        padding: 16px;
        overflow: hidden;

        .post-link {
          position: relative;
          width: 210px;
          height: 140px;
          overflow: hidden;
          border-radius: 10px;
          color: inherit;

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: .4s;
          }
        }
      }

      .content-wrapper {
        padding: 10px 16px 10px 0;
        height: 100%;
        width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;

        .article-title {
          height: 30px;
          /*border-bottom: var(--article-border);*/
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          font-family: "Open Sans", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, Verdana, Tahoma, sans-serif;

          p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          &:hover {
            color: #1890ff;
          }
        }

        .article-caption {
          flex: 1;
          height: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          line-height: 1.7;
          cursor: pointer;
        }

        .article-info {
          height: 20px;
          /*border-top: var(--article-border);*/
          color: var(--article-info-color);
          font-size: 12px;
          padding-top: 3px;
        }
      }
    }

    .article-item-more-pic {
      display: block;
      height: 230px;

      .content-wrapper {
        width: 100%;
        height: auto;
        padding: 10px 16px 6px 16px;
      }

      .image-wrapper {
        padding: 0 16px;
        width: 100%;
        display: flex;

        .post-link {
          width: 100%;
          height: 150px;
          display: flex;
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
        /*border-top: var(--article-border);*/
        color: var(--article-info-color);
        font-size: 12px;
        padding-top: 6px;
        margin: 2px 16px 0 16px;
      }
    }

    .hover-tag {
      position: absolute;
      left: 0;
      /*top: 20%;*/
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
      /*background-color: #1890ff;*/
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
        &:before {
          content: '/';
          color: #bbbbbb;
          padding: 0 5px;
        }
      }
    }
  }

  .post-link {
    color: inherit;
    display: block;
  }
</style>

<style lang="scss" scoped>
  .post-item {
    .article-item {
      .item-slants {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        .item-slant {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          &.item-slant-top {
            transform: rotate(109deg) translateY(220px);
            transition: .4s;
          }

          &.item-slant-bottom {
            transform: rotate(70deg) translateY(190px);
            transition: .3s;
          }
        }
      }

      &:hover {
        .item-slant {
          &.item-slant-top {
            background-color: rgba(24, 144, 255, 0.8);
            transform: rotate(109deg) translateY(159px);
          }

          &.item-slant-bottom {
            background-color: rgba(255, 255, 255, 0.6);
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
          background-color: rgba(24, 144, 255, 0.8);
          transform: rotate(-109deg) translateY(159px) !important;
        }

        .item-slant-bottom {
          background-color: rgba(255, 255, 255, 0.6);
          transform: rotate(-70deg) translateY(155px) !important;
        }
      }
    }
  }
</style>
