<template>
  <div class="post-item">
    <div class="article-item" :class="{'flex-revert': !!(index % 2)}" v-if="thumbnails.length < 3">
      <div class="image-wrapper">
        <div class="image-link" @click="$router.push({name:'postDetail',params:{blogId:data.id}})">
          <img :src="thumbnails[0]">
        </div>
      </div>
      <div class="content-wrapper">
        <div class="article-title">
          <p v-html="data.title" @click="$router.push({name:'postDetail',params:{blogId:data.id}})"/>
        </div>
        <div class="article-caption" v-html="data.summary"
             @click="$router.push({name:'articleDetail',params:{blogId:data.id}})"/>
        <div class="article-info">
          <span>{{(data.createTime).substr(0, 10)}}</span>
          <span class="separator">/</span>
          <span>{{data.commentCount}}&ensp;评论</span>
          <span class="separator">/</span>
          <span>{{data.viewCount}}&ensp;阅读</span>
        </div>
      </div>
    </div>
    <div class="article-item article-item-more-pic" v-else>
      <div class="content-wrapper">
        <div class="article-title">
          <p v-html="data.title" @click="$router.push({name:'postDetail',params:{blogId:data.id}})"/>
        </div>
      </div>
      <div class="image-wrapper">
        <div class="image-link" @click="$router.push({name:'postDetail',params:{blogId:data.id}})">
          <div class="img-container" v-for="img in thumbnails">
            <img :src="img">
          </div>
        </div>
      </div>
    </div>
    <div class="hover-tag"></div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

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
      height: 180px;
      width: 100%;
      margin-bottom: 8px;
      background-color: var(--article-background);
      display: flex;
      align-items: center;
      border-radius: 8px;
      position: relative;

      .image-wrapper {
        width: 240px;
        height: 100%;
        padding: 16px 0 16px 16px;
        overflow: hidden;

        .image-link {
          width: 224px;
          height: 148px;
          overflow: hidden;
          border-radius: 10px;

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
        padding: 10px 16px;
        height: 100%;
        width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;

        .article-title {
          height: 30px;
          border-bottom: var(--article-border);
          font-size: 18px;
          line-height: 22px;
          font-weight: 700;
          cursor: pointer;
          font-family: "Open Sans", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, Verdana, Tahoma, sans-serif;
          transition: .2s;

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
          padding: 5px 0;
          line-height: 1.8;
          cursor: pointer;
        }

        .article-info {
          height: 20px;
          border-top: var(--article-border);
          color: var(--article-info-color);
          font-size: 12px;
          padding-top: 6px;

          .separator {
            color: #e1e1e1;
            padding: 0 5px;
          }
        }
      }
    }

    .article-item-more-pic {
      display: block;

      .content-wrapper {
        width: 100%;
        height: auto;
        padding: 10px 16px 6px 16px;
      }

      .image-wrapper {
        padding: 0 16px;
        width: 100%;

        .image-link {
          width: 100%;
          height: 125px;
          display: flex;

          .img-container {
            width: 250px;
            height: 125px;
            overflow: hidden;

            &:nth-child(n+2) {
              margin-left: 10px;
            }
          }
        }
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

    .image-wrapper {
      padding: 16px 16px 16px 0 !important;
    }
  }
</style>
