<template>
  <div class="moment-item">
    <div class="moment-item-content">
      <div class="content-top">
        <div class="user-avatar">
          <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3" trigger="click">
            <template #content>
              <UserCardMoment :user="data.userInfo"/>
            </template>
            <img :src="data.userInfo.avatar"/>
          </a-popover>
        </div>
        <div class="user-nickname-time">
          <div class="user-nickname">{{data.userInfo.nickname}}</div>
          <div class="publish-time" :title="data.createTime">{{$dayjs().to(data.createTime)}}</div>
        </div>
      </div>
      <div class="content-body">
        <div class="content-text" :class="{'content-expand': expand}" v-html="data.content" v-row="{set: set}"></div>
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="content-images" :class="[imageClass]" v-if="images?.length && !preview">
          <img :src="item" v-for="(item, index) in images" @click="onPreview(index)"/>
        </div>
        <div class="content-image-preview" v-if="images?.length && preview">
          <ImagePreviewEmbed :list="images" :current="current" @onClose="onClose"/>
        </div>
      </div>
    </div>
    <div class="moment-item-actions">
      <div class="item-operation">
        <div class="item-icon">
          <i-share-one theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">分享</div>
      </div>
      <div class="item-operation" v-login="()=>replyShow = !replyShow" :class="{'action-active':replyShow}">
        <div class="item-icon">
          <i-comment :theme="replyShow?'filled':'outline'" size="14" fill="currentColor"/>
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
    <div class="moment-item-bottom" v-if="replyShow">
      <div class="moment-item-reply-box">
        <div class="user-avatar">
          <img :src="userInfo.avatar"/>
        </div>
        <div class="reply-box-wrapper">
          <ReplyEditor/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref, computed, reactive} from 'vue';
  import type {PropType} from "vue";
  import {useStore} from "vuex";
  import type {momentListType} from "@/views/moment/types";
  import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";
  import ReplyEditor from "@/views/moment/components/ReplyEditor.vue";
  import UserCardMoment from "../components/UserCardMoment.vue";

  const {getters} = useStore();

  const props = defineProps({
    data: {
      type: Object as PropType<momentListType>
    }
  });
  const preview = ref(false);
  const current = ref(0);
  const row = ref<number>(0);
  const expand = ref<boolean>(false);
  const replyShow = ref<boolean>(false);
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
  });
  const userInfo = computed(() => getters['userInfo']);
  const richEditor = ref(null);

  function set(value: number) {
    row.value = value;
  }

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

        ::v-deep(.content-text) {
          margin: 4px 0;
          white-space: pre-wrap;
          line-height: 2rem;
          max-height: 12rem;
          overflow: hidden;

          &.content-expand {
            max-height: none !important;
          }

          img {
            vertical-align: sub;
            width: auto;
            height: 20px;
            margin: 0 2px;
          }
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

        .limit-btn {
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
          margin-right: 20px;
        }
      }
    }

    .moment-item-actions {
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
        user-select: none;

        &.action-active {
          background-color: var(--youyu-background4);
          color: #1890ff;
        }

        &:hover {
          background-color: var(--youyu-background4);
        }

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

    .moment-item-bottom {
      .moment-item-reply-box {
        margin: 0 24px;
        padding: 16px 0;
        border-top: 1px solid var(--youyu-border-color3);
        display: flex;
        align-items: flex-start;

        .user-avatar {
          height: 36px;
          width: 36px;
          border-radius: 100%;
          overflow: hidden;
          margin: 0 12px 0 4px;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .reply-box-wrapper {
          flex: 1;
        }

        ::v-deep(.editable-div) {
          border-radius: 2px;
          border: 1px solid transparent;
          transition: .3s;

          &.editor-active {
            border: 1px solid #1890ff;
          }

          #box {
            padding: 6px 12px;
          }
        }
      }
    }
  }
</style>
