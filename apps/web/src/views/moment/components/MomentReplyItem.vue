<template>
  <div v-on-click-outside="onClickOutside" class="moment-reply-item">
    <div class="moment-reply-detail">
      <div class="reply-right">
        <div class="reply-right-top">
          <div class="user-info">
            <div class="user-avatar">
              <a-popover
                overlay-class-name="user-info-moment-popover"
                placement="top"
                :mouse-enter-delay="0.6"
                :mouse-leave-delay="0.3"
                @visible-change="onUserVisibleChange"
              >
                <template #content>
                  <UserCardMoment :user="data.user" />
                </template>
                <RouterLink :to="{ name: 'userHome', params: { userId: data.user.id } }">
                  <img :src="data.user.avatar" alt="">
                </RouterLink>
              </a-popover>
            </div>
            <div class="user-nickname">
              <a-popover
                overlay-class-name="user-info-moment-popover"
                placement="top"
                :mouse-enter-delay="0.6"
                :mouse-leave-delay="0.3"
                @visible-change="onUserVisibleChange"
              >
                <template #content>
                  <UserCardMoment :user="data.user" />
                </template>
                <RouterLink :to="{ name: 'userHome', params: { userId: data.user.id } }">
                  <span>{{ data.user.nickname }}</span>
                </RouterLink>
              </a-popover>
              <div v-if="data.user.id === moment.userId" class="author-text">
                作者
              </div>
            </div>
          </div>
          <div class="info-data">
            <div class="publish-time" :title="data.createTime">
              {{ $dayjs().to(data.createTime) }}
            </div>
            <div v-if="data.adname" class="adname">
              ・{{ data.adname }}
            </div>
          </div>
        </div>
        <div
          v-row="{ set: set }"
          class="item-content"
          :class="{ 'content-expand': expand }"
          :style="{ 'max-height': maxRow * 1 + 0.4 + 'rem' }"
        >
          <div v-if="data.userTo" class="user-to-info">
            @{{ data.userTo.nickname }}
          </div>
          <p class="reply-content" v-html="transformTagToHTML(data.content)" />
        </div>
        <div v-show="row > maxRow && !expand" class="limit-btn" @click="expand = true">
          展开
        </div>
        <div v-show="row > maxRow && expand" class="limit-btn" @click="expand = false">
          收起
        </div>
        <div v-if="images?.length && !preview" class="content-images">
          <img v-for="(item, index) in images" :src="item" @click="onPreview(index)">
        </div>
        <div v-if="images?.length && preview" class="content-image-preview">
          <ImagePreviewEmbed :list="images" :current="current" @on-close="onClose" />
        </div>
        <div class="reply-operation">
          <div class="ope-item" :class="{ 'ope-active': data.commentLike }" @click="onLike">
            <i-good-two :theme="data.commentLike ? 'filled' : 'outline'" size="14" fill="currentColor" />
            点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
          </div>
          <div class="ope-item" :class="{ 'ope-active': active }" @click="onReply">
            <i-comment :theme="active ? 'filled' : 'outline'" size="14" fill="currentColor" />
            <span>{{ active ? '取消回复' : '回复' }}</span>
          </div>
          <a-popconfirm
            v-model:open="deleteVisible"
            title="确认删除此条评论?"
            ok-text="是"
            cancel-text="否"
            @confirm="onConfirmDelete"
          >
            <div
              v-if="showDelete"
              class="ope-item delete-ope"
              :class="{ visible: deleteVisible }"
              @click="onDelete"
            >
              删除
            </div>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div v-if="active" class="moment-reply">
      <div class="user-avatar">
        <img v-if="isLogin" :src="userInfo.avatar" alt="用户头像">
        <img
          v-else
          src="https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default_avatar.png"
          alt="默认头像"
        >
      </div>
      <div class="reply-box-wrapper">
        <MomentReplyEditor
          ref="MomentReplyEditorRef"
          :params="replyParams"
          :placeholder="replyEditorPlaceholder"
          @save-success="onReplySuccess"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MomentReplyItem',
};
</script>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { message } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import MomentReplyEditor from '@/views/moment/components/MomentReplyEditor.vue';
import {
  transformHTMLToTag,
  transformTagToHTML,
} from '../../../../../../packages/shared/components-vue/emoji/youyu_emoji';
import ImagePreviewEmbed from '../../../../../../packages/shared/components-vue/image/ImagePreviceEmbed.vue';
import UserCardMoment from '../components/UserCardMoment.vue';

const { getters, dispatch } = useStore();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  root: {
    type: Object,
    required: true,
  },
  moment: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['saveSuccess', 'deleteSuccess']);

const row = ref<number>(0);
const maxRow = 3;
const expand = ref<boolean>(false);
const active = ref<boolean>(false);
const deleteVisible = ref<boolean>(false);
const preview = ref<boolean>(false);
const likeLoading = ref<boolean>(false);
const current = ref(0);
const MomentReplyEditorRef = ref(null);

const userInfo = computed(() => getters['userInfo']);
const images = computed(() => (props.data.images ? props.data.images.split(',') : null));
const isLogin = computed(() => getters['isLogin']);
const showDelete = computed(() => userInfo.value.id === props.data.userId || props.moment.userId === userInfo.value.id);
const replyEditorPlaceholder = computed(() => (props.data ? '回复@' + props.data?.user?.nickname : null));
const replyParams = computed(() => {
  return {
    momentId: props.moment.id,
    userIdTo: props.data.userId,
    rootId: props.root.id,
  };
});

function set(value: number) {
  row.value = value;
}

const onDelete = () => {
  deleteVisible.value = true;
};

const onConfirmDelete = () => {
  dispatch('deleteMomentComment', { commentId: props.data.id }).then(res => {
    if (res) {
      message.success('删除成功');
      emit('deleteSuccess', props.data);
    }
  });
};

const onLike = () => {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = !!props.data.commentLike;
  dispatch(isLike ? 'cancelMomentCommentLike' : 'setMomentCommentLike', {
    commentId: props.data.id,
  })
    .then(res => {
      if (isLike) {
        props.data.supportCount -= 1;
        props.data.commentLike = null;
      } else {
        props.data.supportCount += 1;
        props.data.commentLike = res.data;
      }
    })
    .finally(() => {
      likeLoading.value = false;
    });
};

const onReply = () => {
  active.value = !active.value;
};

const onPreview = (index: number) => {
  preview.value = true;
  current.value = index;
};

const onClose = () => {
  preview.value = false;
};

const onClickOutside = () => {
  if (!active.value) return;
  const { reply } = MomentReplyEditorRef.value;
  if (!reply.content && !reply.images?.length) {
    active.value = false;
  }
};

const onReplySuccess = reply => {
  props.moment.commentCount += 1;
  props.root.replyCount += 1;
  emit('saveSuccess', reply);
  active.value = false;
};

const onUserVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', { userId: props.data.user.id }).then(res => {
      props.data.user = res.data;
    });
  }
};

const onUserToVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', { userId: props.data.userTo.id }).then(res => {
      props.data.userTo = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.moment-reply-item {
  .moment-reply-detail {
    display: flex;

    .reply-right {
      flex: 1;
      margin-top: 2px;

      .reply-right-top {
        display: flex;
        align-items: center;

        .user-info {
          display: flex;
          align-items: center;
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          overflow: hidden;
          border: var(--youyu-avatar-border);
          border-radius: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .user-nickname {
          margin-left: 6px;
          font-size: 14px;
          font-weight: bold;

          a {
            color: inherit;
          }

          .author-text {
            display: inline-block;
            padding: 0 6px;
            margin-left: 5px;
            font-size: 12px;
            font-weight: normal;
            color: #fff;
            background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
            border-radius: 12px;
          }
        }

        .info-data {
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 6px;
          margin-left: 6px;
          font-size: 13px;
          color: #909090;

          &::before {
            position: absolute;
            top: 4.5px;
            left: 0;
            width: 2px;
            height: 14px;
            background-color: var(--youyu-border-color);
            content: '';
          }
        }
      }

      .item-content {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        font-size: 14px;

        &.content-expand {
          max-height: none !important;
        }

        .user-to-info {
          position: relative;
          top: 7.8px;
          float: left;
          margin-right: 5px;
          color: #1890ff;
        }

        ::v-deep(.reply-content) {
          margin: 8px 0 0;
          white-space: pre-wrap;

          img {
            width: auto;
            height: 20px;
            margin: 0 2px;
            vertical-align: sub;
          }
        }
      }

      .limit-btn {
        margin-right: 20px;
        font-size: 14px;
        line-height: 22px;
        color: #1e80ff;
        cursor: pointer;
      }

      .content-images {
        margin-bottom: 8px;

        img {
          width: 90px;
          height: 90px;
          margin: 0 4px 4px 0;
          object-fit: cover;
          filter: brightness(0.94);
          cursor: zoom-in;
        }
      }

      .reply-operation {
        display: flex;
        align-items: center;

        .ope-item {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          font-size: 13px;
          color: #8a919f;
          cursor: pointer;

          &:hover {
            color: #1890ff;
          }

          &.ope-active {
            color: #1890ff;
          }

          &.delete-ope {
            display: none;
            margin-right: 0;
            margin-left: auto;
            color: #ff4d4f;

            &.visible {
              display: inherit !important;
            }
          }

          ::v-deep(.i-icon) {
            margin-right: 3px;

            &.i-icon-comment {
              position: relative;
              top: 1px;
            }
          }
        }
      }
    }
  }

  .moment-reply {
    display: flex;
    align-items: flex-start;
    margin-top: 12px;

    .user-avatar {
      width: 36px;
      height: 36px;
      margin-right: 8px;
      overflow: hidden;
      border: var(--youyu-avatar-border);
      border-radius: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .reply-box-wrapper {
      flex: 1;
      overflow: hidden;
    }

    ::v-deep(.editable-div) {
      border: 1px solid transparent;
      border-radius: 2px;
      transition: 0.3s;

      &.editor-active {
        border: 1px solid #1890ff;
      }

      #box {
        padding: 6px 12px;
      }
    }
  }

  .more-btn {
    margin-top: 6px;
    margin-left: 44px;
    font-size: 14px;
    line-height: 22px;
    color: #1890ff;
    cursor: pointer;
  }

  .reply-list {
    margin-top: 6px;
    margin-left: 44px;
  }

  &:hover {
    .delete-ope {
      display: inline-block !important;
    }
  }
}
</style>
