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
          <vue-popper-user-card :user="data.actor" />
        </template>
        <div
          v-if="isActorUser"
          class="comment-actor-avatar"
          :style="{ width: props.avatarSize + 'px', height: props.avatarSize + 'px' }"
        >
          <router-link :to="{ name: 'userHome', params: { userId: data.actor.id } }">
            <img :src="props.data.actor.avatar" alt="avatar" />
          </router-link>
        </div>
        <a-avatar v-else :size="props.avatarSize" :style="{ backgroundColor: '#1890ff', verticalAlign: 'middle' }">
          {{ props.data.actor.nickname.substring(0, 3) }}
        </a-avatar>
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
            <vue-popper-user-card :user="data.actor" />
          </template>
          <router-link :to="{ name: 'userHome', params: { userId: data.actor.id } }">
            <span class="user-nickname">{{ data.actor.nickname }}</span>
          </router-link>
        </a-popover>
        <div v-if="isDataAuthor" class="author-text">博主</div>
      </div>
      <div class="publish-info">
        <div class="publish-time" :title="data.createTime">{{ formatSmartDate(data.createTime) }}</div>
        <div v-if="data.adname" class="adname">· {{ data.adname }}</div>
      </div>
      <div class="comment-content">
        <div v-if="props.data.replyId !== -1" class="comment-content-at">@{{ props.data?.actorTo?.nickname }}</div>
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
          <div v-if="isAuthor || isDataAuthor" class="action-item action-delete" :class="{ visible: deleteVisible }">
            <i-delete theme="outline" size="14" fill="currentColor" title="删除" />
            删除
          </div>
        </a-popconfirm>
      </div>
      <vue-comment-editor
        v-if="active"
        :auto-focus="false"
        :save-url="props.saveUrl"
        :save-params="props.saveParams"
        :avatar="props.avatar"
        :user-mode="props.userMode"
        :avatar-size="props.avatarSize"
        :on-success="onSaveSuccess"
        @on-click-outside="inactiveEditor"
      />
      <slot class="comment-replies" name="bottomReply" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import type { Comment } from '../../types/common';
import { RouterLink } from 'vue-router';
import VuePopperUserCard from '../content/VuePopperUserCard.vue';
import { transformTagToHTML } from '../emoji/youyu_emoji.ts';
import { formatSmartDate } from '../../utils';
import { ImagePreviewEmbed } from '../index.ts';
import VueCommentEditor from './VueCommentEditor.vue';
import { getCommentActorType } from '../../utils/common-utils.ts';
import { ActorType } from '../../consts';
import http from '../../network';

const props = defineProps({
  userMode: { type: Boolean, default: false },
  data: { type: Object as PropType<Comment>, required: true },
  dataAuthorId: { type: Number }, // 数据的作者，注意不是评论的作者
  loginUserId: { type: Number }, // 当前登录用户
  avatar: { type: String },
  avatarSize: { type: Number, default: 36 },
  saveUrl: { type: String, required: true },
  removeUrl: { type: String, required: true },
  saveParams: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
});

const emit = defineEmits(['onSaveSuccess', 'onRemoveSuccess']);

const active = ref<boolean>(false); // 回复框激活
const deleteVisible = ref<boolean>(false);
const preview = ref<boolean>(false);
const current = ref<number>(0);

const isDataAuthor = computed(() => props.dataAuthorId === props.data.userId); // 是否是发布此时刻、帖子的用户
const isAuthor = computed(() => props.loginUserId === props.data.userId); // 是否是发布此评论的用户
const images = computed(() => (props.data.images ? props.data.images?.split(',') : [])); // 评论附图
const isActorUser = computed(() => getCommentActorType(props.data) === ActorType.USER); // 是否由用户发送

function onReply() {
  active.value = !active.value;
}

const onPreview = (index: number) => {
  preview.value = true;
  current.value = index;
};

const onClose = () => {
  preview.value = false;
};

function onConfirmDelete() {
  http
    .post(
      props.removeUrl,
      {
        commentId: props.data.id,
      },
      { successTip: '删除成功' },
    )
    .then(res => {
      emit('onRemoveSuccess');
    });
}

function onSaveSuccess(data: Comment) {
  active.value = false;
  emit('onSaveSuccess', data);
}

function inactiveEditor(isEditorActive: boolean) {
  setTimeout(() => {
    if (!isEditorActive) {
      active.value = false;
    }
  });
}
</script>

<style lang="scss">
.comment-item {
  display: flex;
  margin-bottom: 12px;

  .comment-left {
    padding-right: 10px;

    .comment-actor-avatar {
      overflow: hidden;
      border: var(--youyu-avatar-border);
      border-radius: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
        margin: 2px 0;

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

    .vue-comment-editor {
      margin-top: 8px;
    }
  }
}
</style>
