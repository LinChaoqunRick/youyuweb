<template>
  <div class="post-item">
    <div class="post-left">
      <img :src="thumbnails[0]" @click="navigate">
    </div>
    <div class="post-right">
      <div class="post-title">
        <div class="title-text" v-html="data.title" @click="navigate"/>
      </div>
      <div class="post-summary">
        <div class="summary-text" v-html="data.summary"
             @click="navigate"/>
      </div>
      <div class="post-info">
        <span>{{(data.createTime).substr(0, 10)}}</span>
        <span class="separator">/</span>
        <span>{{data.commentCount}}&ensp;评论</span>
        <span class="separator">/</span>
        <span>{{data.viewCount}}&ensp;阅读</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {useRouter} from 'vue-router';

  const router = useRouter();

  const props = defineProps({
    data: {
      type: Object
    },
    index: {}
  })

  const thumbnails = computed(() => {
    return props.data?.thumbnail.split(",").splice(0, 3);
  })

  const navigate = function () {
    router.push({name: 'postDetail', params: {postId: props.data?.id}})
  }
</script>

<style lang="scss" scoped>
  .post-item {
    display: flex;
    height: 140px;

    .post-left {
      height: 100%;
      width: 180px;
      padding: 12px 0;

      img {
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }

    .post-right {
      flex: 1;
      width: 0;
      padding: 10px;
      overflow: hidden;

      .post-title {
        height: 28px;
        line-height: 28px;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;

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

        .summary-text {
          height: 100%;
        }
      }

      .post-info {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: var(--youyu-body-text1);

        .separator {
          color: #e1e1e1;
          padding: 0 5px;
        }
      }
    }
  }
</style>
