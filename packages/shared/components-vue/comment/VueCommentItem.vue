<template>
  <div class="comment-item">
    <div class="comment-left">
      <a-popover
        overlay-class-name="user-info-popover"
        placement="top"
        :mouse-enter-delay="0.6"
        :mouse-leave-delay="0.3"
      >
        <template #content>
          <vue-popper-user-card :user="data.user" />
        </template>
        <router-link :to="{ name: 'userHome', params: { userId: data.user.id } }">
          <img :src="props.data.user.avatar" alt="avatar" :style="{ width: props.avatarSize + 'px' }" />
        </router-link>
      </a-popover>
    </div>
    <div class="comment-right">
      <div class="comment-right-top">
        <a-popover
          overlay-class-name="user-info-moment-popover"
          placement="top"
          :mouse-enter-delay="0.6"
          :mouse-leave-delay="0.3"
        >
          <template #content>
            <vue-popper-user-card :user="data.user" />
          </template>
          <router-link :to="{ name: 'userHome', params: { userId: data.user.id } }">
            <span class="user-nickname">{{ data.user.nickname }}</span>
          </router-link>
        </a-popover>
        <div v-if="isDataAuthor" class="author-text">博主</div>
      </div>
      <div class="publish-info">
        <div class="publish-time" :title="data.createTime">{{ formatSmartDate(data.createTime) }}</div>
        <div v-if="data.adname" class="adname">· {{ data.adname }}</div>
      </div>
      <div class="comment-content">
        <div v-if="props.data.replyId !== -1" class="comment-content-at">@{{ props.data.userTo?.nickname }}</div>
        <div v-html="transformTagToHTML(props.data.content)" class="comment-content-text"></div>
        <div v-if="images.length && !preview" class="content-images">
          <img v-for="(item, index) in images" :key="item" :src="item" alt="图片" @click="onPreview(index)" />
        </div>
        <div v-if="images.length && preview" class="content-image-preview">
          <ImagePreviewEmbed :list="images" :current="current" @on-close="onClose" />
        </div>
      </div>
      <div class="comment-right-bottom">
        <div class="action-item action-reply" :class="{ 'action-active': active }" @click="onReply">
          <i-comment :theme="active ? 'filled' : 'outline'" size="14" fill="currentColor" />
          {{ active ? '取消回复' : '回复' }}<span v-if="data.replyCount && !active">({{ data.replyCount }})</span>
        </div>
        <div class="action-item" :class="{ 'action-active': data.commentLike }">
          <i-good-two :theme="data.commentLike ? 'filled' : 'outline'" size="14" fill="currentColor" />
          点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
        </div>
        <a-popconfirm
          v-model:open="deleteVisible"
          title="确认删除此评论?"
          ok-text="是"
          cancel-text="否"
          @confirm="onConfirmDelete"
        >
          <div v-if="isAuthor" class="action-item action-delete" :class="{ visible: deleteVisible }" @click="onDelete">
            <i-delete theme="outline" size="14" fill="currentColor" title="删除" />
            删除
          </div>
        </a-popconfirm>
      </div>
      <vue-comment-editor :params="{}" :is-login="false" :auto-focus="false" />
      <div v-if="props.data.replyCount" class="comment-replies">
        <vue-content-page
          :preset-data="props.data.children"
          :url="LIST_MOMENT_COMMENT_PAGE"
          :params="replyParams"
          :total="props.data.replyCount"
          hide-action-finish
          mode="manual"
          action-align="left"
        >
          <template v-slot:ready="{ remainCount }">
            <span class="ready-text">
              剩下
              <span class="remain-count">{{ remainCount }}</span>
              条回复
            </span>
            <i-down theme="outline" size="16" fill="currentColor" />
          </template>
          <template v-slot:loading="{ remainCount }">
            <span class="ready-text">
              剩下
              <span class="remain-count">{{ remainCount }}</span>
              条回复
            </span>
            <i-loading-four theme="outline" size="14" fill="#1890ff" />
          </template>
          <template #default="{ list }">
            <vue-comment-item
              v-for="item in list"
              :data="item"
              :avatar-size="32"
              :data-author-id="props.dataAuthorId"
              :login-user-id="props.loginUserId"
            />
          </template>
        </vue-content-page>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import type { Comment } from '../../types/common';
import { RouterLink } from 'vue-router';
import VuePopperUserCard from '../content/VuePopperUserCard.vue';
import { transformTagToHTML } from '../emoji/youyu_emoji.ts';
import { VueContentPage } from '../index.ts';
import { VueCommentItem } from '../index.ts';
import { formatSmartDate } from '../../utils';
import { LIST_MOMENT_COMMENT_PAGE } from '../../apis';
import { ImagePreviewEmbed } from '../index.ts';
import VueCommentEditor from './VueCommentEditor.vue';

const props = defineProps({
  data: { type: Object as PropType<Comment>, required: true },
  dataAuthorId: { type: Number }, // 数据的作者，注意不是评论的作者
  loginUserId: { type: Number }, // 当前登录用户
  avatarSize: { type: Number, default: 40 },
});

const active = ref<boolean>(false);
const deleteVisible = ref<boolean>(false);
const preview = ref<boolean>(false);
const current = ref<number>(0);

const isDataAuthor = computed(() => props.dataAuthorId === props.data.userId); // 是否是发布此时刻、帖子的用户
const isAuthor = computed(() => props.loginUserId === props.data.userId); // 是否是发布此评论的用户
const replyParams = computed(() => ({
  rootId: props.data.id,
  pageSize: 5,
}));
const images = computed(() => (props.data.images ? props.data.images?.split(',') : []));

function onReply() {
  active.value = !active.value;
}

function onDelete() {}

const onPreview = (index: number) => {
  preview.value = true;
  current.value = index;
};

const onClose = () => {
  preview.value = false;
};

function onConfirmDelete() {}
</script>

<style lang="scss">
.comment-item {
  display: flex;
  margin-bottom: 12px;

  .comment-left {
    padding-right: 10px;

    img {
      height: auto;
      overflow: hidden;
      border: var(--youyu-avatar-border);
      border-radius: 100%;
    }
  }

  .comment-right {
    flex: 1;

    .comment-right-top {
      display: flex;
      align-items: center;

      .user-nickname {
        font-weight: bold;
        color: var(--youyu-text2);
      }

      .author-text {
        padding: 0 4px;
        margin-left: 6px;
        font-size: 12px;
        line-height: 17px;
        color: white;
        background-color: #1890ff;
        border-radius: 4px;
      }
    }

    .publish-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(--youyu-text1);
    }

    .comment-content {
      font-size: 15px;
      line-height: 1.5rem;
      white-space: pre-wrap;

      .comment-content-at {
        position: relative;
        float: left;
        margin-right: 4px;
        color: #1890ff;
      }

      .comment-content-text {
        margin-bottom: 4px;

        img {
          width: auto;
          height: 20px;
          margin: 0 2px;
          vertical-align: sub;
        }
      }

      .content-images {
        line-height: 0;

        img {
          width: 90px;
          height: 90px;
          margin: 0 4px 4px 0;
          object-fit: cover;
          filter: brightness(0.94);
          cursor: zoom-in;
        }
      }
    }

    .comment-right-bottom {
      display: flex;
      align-items: center;
      padding-top: 2px;
      font-size: 14px;
      color: var(--youyu-text1);

      .action-item {
        display: flex;
        align-items: center;
        margin-right: 16px;
        cursor: pointer;
        user-select: none;
        transition: 0.2s;

        .i-icon {
          margin-right: 4px;
        }

        &:hover {
          color: #1890ff;
        }

        &.action-delete {
          &:hover {
            color: red;
          }
        }

        &.action-active {
          color: #1890ff;
        }
      }
    }

    .comment-replies {
      margin-top: 12px;

      .ready-text {
        margin-right: 4px;
      }

      .comment-item {
        .comment-right-top {
          padding-top: 0;
        }
      }
    }
  }
}
</style>
