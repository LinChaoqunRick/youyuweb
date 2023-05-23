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
        <div class="content-text">{{data.content}}</div>
        <div class="content-images" :class="[imageClass]" v-if="images?.length">
          <img :src="item" v-for="item in images"/>
        </div>
        <div content="content-image-preview" v-if="images?.length">
          <ImagePreviewEmbed :list="images"/>
        </div>
      </div>
    </div>
    <div class="moment-item-bottom">
      <div class="item-operation"></div>
      <div class="item-operation"></div>
      <div class="item-operation"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {computed} from 'vue';
  import type {PropType} from "vue";
  import type {momentListType} from "@/views/moment/types";
  import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";

  const props = defineProps({
    data: {
      type: Object as PropType<momentListType>
    }
  })

  const images = computed(() => props.data.images?.split(","));
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
        height: 36px;

        &:nth-child(n+2) {
          border-left: 1px solid var(--youyu-border-color3);
        }
      }
    }
  }
</style>
