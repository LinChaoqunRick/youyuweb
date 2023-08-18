<template>
  <div class="post-item">
    <div class="post-left">
      <RouterLink :to="{name: 'PostDetail', params: {postId: data?.id}}">
        <img :src="thumbnails[0]">
      </RouterLink>
    </div>
    <div class="post-right">
      <div class="post-title">
        <RouterLink :to="{name: 'PostDetail', params: {postId: data?.id}}">
          <div class="title-text" v-html="data.title"/>
        </RouterLink>
      </div>
      <div class="post-summary">
        <RouterLink :to="{name: 'PostDetail', params: {postId: data?.id}}">
          <div class="summary-text" v-html="data.summary"/>
        </RouterLink>
      </div>
      <div class="post-info">
        <span class="create-type info-item" :class="[`create_type_${data.createType}`]">{{createTypeList[data.createType]}}</span>
        <span class="category-name info-item">{{data.categoryName}}</span>
        <span class="info-item">{{(data.createTime).substr(0, 10)}}</span>
        <span class="info-item">{{data.commentCount}}&ensp;评论</span>
        <span class="info-item" style="cursor: pointer" @click="navigate">{{data.viewCount}}&ensp;阅读</span>
        <div class="footer-extra">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {useRouter, RouterLink} from 'vue-router';

  const router = useRouter();

  const createTypeList = ['原创', '转载', '翻译'];

  const props = defineProps({
    data: {
      type: Object
    },
    index: {}
  })

  const thumbnails = computed(() => {
    return props.data?.thumbnail.split(",").splice(0, 3);
  })
</script>

<style lang="scss" scoped>
  .post-item {
    display: flex;
    height: 140px;
    background-color: var(--youyu-background1);

    .post-left {
      height: 100%;
      width: 200px;
      padding: 12px;

      img {
        height: 100%;
        width: 100%;
        cursor: pointer;
        object-fit: cover;
      }
    }

    .post-right {
      flex: 1;
      width: 0;
      padding: 10px 10px 10px 0;
      overflow: hidden;

      .post-title {
        height: 28px;
        line-height: 28px;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;

        a {
          color: inherit;
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .post-summary {
        height: 66px;
        line-height: 33px;
        cursor: pointer;
        overflow: hidden;

        a {
          color: inherit;
        }

        .summary-text {
          height: 100%;
        }
      }

      .post-info {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: var(--youyu-body-text1);

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
              color: #e1e1e1;
              padding: 0 5px;
            }
          }
        }

        .footer-extra {
          float: right;
          display: inline-block;
        }
      }
    }
  }
</style>
