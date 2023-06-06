<template>
  <div class="moment-item">
    <div class="moment-item-content">
      <div class="content-top">
        <div class="user-avatar">
          <img :src="data.userInfo.avatar"/>
        </div>
        <div class="user-nickname-time">
          <div class="user-nickname">{{data.userInfo.nickname}}</div>
          <div class="publish-time">{{$dayjs().to(data.createTime)}}</div>
        </div>
      </div>
      <div class="content-body">
        <div class="content-text" v-html="data.content"></div>
        <div class="content-images" :class="[imageClass]" v-if="images?.length && !preview">
          <img :src="item" v-for="(item, index) in images" @click="onPreview(index)"/>
        </div>
        <div content="content-image-preview" v-if="images?.length && preview">
          <ImagePreviewEmbed :list="images" :current="current" @onClose="onClose"/>
        </div>
      </div>
    </div>
    <div class="moment-item-bottom">
      <div class="item-operation">
        <div class="item-icon">
          <i-share-one theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">分享</div>
      </div>
      <div class="item-operation">
        <div class="item-icon">
          <i-comment theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">评论</div>
      </div>
      <div class="item-operation">
        <div class="item-icon">
          <i-thumbs-up theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">点赞</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue';
  import type {PropType} from "vue";
  import type {momentListType} from "@/views/moment/types";
  import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";

  const props = defineProps({
    data: {
      type: Object as PropType<momentListType>
    }
  });
  const preview = ref(false);
  const current = ref(0);

  const images = computed(() => props.data.images ? props.data.images?.split(",") : null);
  const imageClass = computed(() => {
    const imageLength = images.value?.length ?? 0;
    if (imageLength >= 5 || imageLength === 3) {
      return 'col-3';
    } else if (imageLength >= 2) {
      return 'col-2';
    } else {
      return 'col-1';
    }
  })
  const onPreview = (index: number) => {
    preview.value = true;
    current.value = index;
  };
  const onClose = () => {
    preview.value = false;
  }
</script>

<style lang="scss" scoped>
  .moment-item {
    width: 750px;
    background-color: var(--youyu-background1);

    .moment-item-content {
      padding: 20px 20px 12px 20px;

      .content-top {
        display: flex;
        align-items: center;

        .user-avatar {
          height: 48px;
          width: 48px;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .user-nickname-time {
          margin-left: 8px;

          .user-nickname {
            font-weight: bold;
          }

          .publish-time {
            font-size: 13px;
            color: #909090;
            margin-top: 1px;
          }
        }
      }

      .content-body {
        margin-left: 56px;

        .content-text {
          margin: 4px 0;
          white-space: pre-wrap;
        }

        .content-images {
          display: grid;

          &.col-3 {
            grid-template-columns: repeat(3, 114px);
          }

          &.col-2 {
            grid-template-columns: repeat(2, 114px);
          }

          &.col-1 {
            img {
              height: 200px;
              width: 200px;
            }
          }

          img {
            height: 110px;
            width: 110px;
            margin: 0 4px 4px 0;
            object-fit: cover;
            cursor: zoom-in;
            filter: brightness(.94);
          }
        }
      }
    }

    .moment-item-bottom {
      display: flex;
      border-top: 1px solid var(--youyu-border-color3);

      .item-operation {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        font-size: 13px;
        color: var(--youyu-text1);
        cursor: pointer;

        &:nth-child(n+2) {
          border-left: 1px solid var(--youyu-border-color3);
        }

        .item-text {
          margin-left: 6px;
        }

        .i-icon {
          position: relative;
          top: 1px;
        }
      }
    }
  }
</style>
