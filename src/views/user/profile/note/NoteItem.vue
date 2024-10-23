<template>
  <div class="note-item">
    <div class="note-left">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data?.id}}">
        <img :src="data.cover">
      </RouterLink>
    </div>
    <div class="note-right">
      <div class="note-title">
        <RouterLink :to="{name: 'NoteDetail', params: {noteId: data?.id}}">
          <div class="title-text" v-html="data.name"/>
        </RouterLink>
      </div>
      <div class="note-summary">
        <RouterLink :to="{name: 'NoteDetail', params: {noteId: data?.id}}">
          <div class="summary-text" v-html="data.introduce"/>
        </RouterLink>
      </div>
      <div class="note-info">
        <span class="info-item">{{(data.createTime).substr(0, 10)}}</span>
        <span class="info-item">{{data.chapterCount}}&ensp;章节</span>
        <span class="info-item">{{data.subscribeCount}}&ensp;订阅</span>
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
  .note-item {
    display: flex;
    height: 140px;
    background-color: var(--youyu-body-background2);
    padding: 0 12px;

    .note-left {
      height: 100%;
      width: 200px;
      padding: 12px 12px 12px 2px;

      img {
        height: 100%;
        width: 100%;
        cursor: pointer;
        object-fit: cover;
      }
    }

    .note-right {
      flex: 1;
      width: 0;
      padding: 10px 10px 10px 0;
      overflow: hidden;

      .note-title {
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

      .note-summary {
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

      .note-info {
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
