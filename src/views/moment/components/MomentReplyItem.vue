<template>
  <div class="moment-reply-item" v-on-click-outside="onClickOutside">
    <div class="moment-reply-detail">
      <div class="reply-right">
        <div class="reply-right-top">
          <div class="user-info">
            <div class="user-avatar">
              <a-popover placement="top"
                         :mouseEnterDelay="0.6"
                         :mouseLeaveDelay="0.3"
                         @visibleChange="onUserVisibleChange">
                <template #content>
                  <UserCardMoment :user="data.user"/>
                </template>
                <RouterLink :to="{name:'userHome', params: {userId: data.user.id}}">
                  <img :src="data.user.avatar"/>
                </RouterLink>
              </a-popover>
            </div>
            <div class="user-nickname">
              <a-popover placement="top"
                         :mouseEnterDelay="0.6"
                         :mouseLeaveDelay="0.3"
                         @visibleChange="onUserVisibleChange">
                <template #content>
                  <UserCardMoment :user="data.user"/>
                </template>
                <RouterLink :to="{name:'userHome', params: {userId: data.user.id}}">
                  <span>{{ data.user.nickname }}</span>
                </RouterLink>
              </a-popover>
              <div class="author-text" v-if="data.user.id === moment.userId">作者</div>
            </div>
          </div>
          <div class="user-to-info" v-if="data.userTo">
            <div class="reply-text">回复</div>
            <div class="user-avatar">
              <a-popover placement="top"
                         :mouseEnterDelay="0.6"
                         :mouseLeaveDelay="0.3"
                         @visibleChange="onUserToVisibleChange">
                <template #content>
                  <UserCardMoment :user="data.userTo"/>
                </template>
                <RouterLink :to="{name:'userHome', params: {userId: data.userTo.id}}">
                  <img :src="data.userTo.avatar"/>>
                </RouterLink>
              </a-popover>
            </div>
            <div class="user-nickname">
              <a-popover placement="top"
                         :mouseEnterDelay="0.6"
                         :mouseLeaveDelay="0.3"
                         @visibleChange="onUserToVisibleChange">
                <template #content>
                  <UserCardMoment :user="data.userTo"/>
                </template>
                <RouterLink :to="{name:'userHome', params: {userId: data.userTo.id}}">
                  <span>{{ data.userTo.nickname }}</span>
                </RouterLink>
              </a-popover>
              <div class="author-text" v-if="data.userTo.id === moment.userId">作者</div>
            </div>
          </div>
          <div class="info-data">
            <div class="publish-time" :title="data.createTime">
              {{ $dayjs().to(data.createTime) }}
            </div>
            <div class="adname" v-if="data.adname">・{{ data.adname }}</div>
          </div>        </div>
        <div class="reply-content" :class="{'content-expand': expand}"
             v-row="{set: set}"
             v-html="transformTagToHTML(data.content)"></div>
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="content-images" v-if="images?.length && !preview">
          <img :src="item" v-for="(item, index) in images" @click="onPreview(index)"/>
        </div>
        <div class="content-image-preview" v-if="images?.length && preview">
          <ImagePreviewEmbed :list="images" :current="current" @onClose="onClose"/>
        </div>
        <div class="reply-operation">
          <div class="ope-item" :class="{'ope-active': data.commentLike}" @click="onLike">
            <i-good-two :theme="data.commentLike?'filled':'outline'" size="14" fill="currentColor"/>
            点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
          </div>
          <div class="ope-item" :class="{'ope-active': active}" @click="onReply">
            <i-comment :theme="active?'filled':'outline'" size="14" fill="currentColor"/>
            <span>{{ active ? '取消回复' : '回复' }}</span>
          </div>
          <a-popconfirm
            v-model:visible="deleteVisible"
            title="确认删除此条评论?"
            ok-text="是"
            cancel-text="否"
            @confirm="onConfirmDelete">
            <div class="ope-item delete-ope" :class="{'visible': deleteVisible}" v-if="showDelete"
                 @click="onDelete">
              删除
            </div>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div v-if="active" class="moment-reply">
      <div class="user-avatar">
        <img v-if="isLogin" :src="userInfo.avatar"/>
        <img v-else src="https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default_avatar.png"/>
      </div>
      <div class="reply-box-wrapper">
        <MomentReplyEditor :params="replyParams" :placeholder="replyEditorPlaceholder" @saveSuccess="onReplySuccess" ref="MomentReplyEditorRef"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MomentReplyItem"
}
</script>

<script setup lang="ts">
import {ref, computed, inject} from "vue";
import {useStore} from "vuex";
import {RouterLink} from "vue-router";
import {message} from "ant-design-vue";
import {vOnClickOutside} from '@vueuse/components'
import {transformHTMLToTag, transformTagToHTML} from "@/components/common/utils/emoji/youyu_emoji";
import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";
import MomentReplyEditor from "@/views/moment/components/MomentReplyEditor.vue";
import UserCardMoment from "../components/UserCardMoment.vue";


const {getters, dispatch} = useStore();
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  root: {
    type: Object,
    required: true
  },
  moment: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['saveSuccess', 'deleteSuccess']);

const row = ref<number>(0);
const expand = ref<boolean>(false);
const active = ref<boolean>(false);
const deleteVisible = ref<boolean>(false);
const preview = ref<boolean>(false);
const likeLoading = ref<boolean>(false);
const current = ref(0);
const MomentReplyEditorRef = ref(null);

const userInfo = computed(() => getters['userInfo']);
const images = computed(() => props.data.images ? props.data.images.split(",") : null);
const isLogin = computed(() => getters['isLogin']);
const showDelete = computed(() => userInfo.value.id === props.data.userId || props.moment.userId === userInfo.value.id);
const replyEditorPlaceholder = computed(()=>props.data?"回复@"+props.data?.user?.nickname:null);
const replyParams = computed(() => {
  return {
    momentId: props.moment.id,
    userIdTo: props.data.userId,
    rootId: props.root.id,
  }
})

function set(value: number) {
  row.value = value;
}

const onDelete = () => {
  deleteVisible.value = true;
}

const onConfirmDelete = () => {
  dispatch('deleteMomentComment', {commentId: props.data.id}).then(res => {
    if (res) {
      message.success('删除成功');
      emit('deleteSuccess', props.data);
    }
  })
}

const onLike = () => {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = !!props.data.commentLike;
  dispatch(isLike ? "cancelMomentCommentLike" : "setMomentCommentLike", {
    commentId: props.data.id
  }).then(res => {
    if (isLike) {
      props.data.supportCount -= 1;
      props.data.commentLike = null;
    } else {
      props.data.supportCount += 1;
      props.data.commentLike = res.data;
    }
  }).finally(() => {
    likeLoading.value = false;
  })
}

const onReply = () => {
  active.value = !active.value;
}

const onPreview = (index: number) => {
  preview.value = true;
  current.value = index;
};

const onClose = () => {
  preview.value = false;
};

const onClickOutside = () => {
  if (!active.value) return;
  const reply = MomentReplyEditorRef.value.reply;
  if (!reply.content && !reply.images?.length) {
    active.value = false;
  }
}

const onReplySuccess = (reply) => {
  props.moment.commentCount += 1;
  props.root.replyCount += 1;
  emit("saveSuccess", reply);
  active.value = false;
}

const onUserVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', {userId: props.data.user.id}).then(res => {
      props.data.user = res.data;
    })
  }
}

const onUserToVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', {userId: props.data.userTo.id}).then(res => {
      props.data.userTo = res.data;
    })
  }
}
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

        .user-to-info {
          display: flex;
          align-items: center;

          .reply-text {
            margin: 0 6px;
            font-size: 13px;
          }
        }

        .user-avatar {
          height: 24px;
          width: 24px;
          border-radius: 100%;
          overflow: hidden;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .user-nickname {
          font-size: 14px;
          font-weight: bold;
          margin-left: 6px;

          a {
            color: inherit;
          }

          .author-text {
            display: inline-block;
            font-size: 12px;
            font-weight: normal;
            color: #fff;
            margin-left: 5px;
            background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
            border-radius: 12px;
            padding: 0 6px;
          }
        }

        .info-data {
          position: relative;
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #909090;
          padding-left: 6px;
          margin-left: 6px;

          &:before {
            position: absolute;
            top: 4.5px;
            left: 0;
            content: "";
            height: 14px;
            width: 2px;
            background-color: var(--youyu-border-color);
          }
        }
      }

      ::v-deep(.reply-content) {
        margin: 8px 0;
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

      .limit-btn {
        cursor: pointer;
        font-size: 14px;
        line-height: 22px;
        color: #1e80ff;
        margin-right: 20px;
      }

      .content-images {
        margin-bottom: 8px;

        img {
          height: 90px;
          width: 90px;
          margin: 0 4px 4px 0;
          object-fit: cover;
          cursor: zoom-in;
          filter: brightness(.94);
        }
      }

      .reply-operation {
        display: flex;
        align-items: center;

        .ope-item {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #8a919f;
          margin-right: 10px;
          cursor: pointer;
          font-size: 13px;

          &:hover {
            color: #1890ff;
          }

          &.ope-active {
            color: #1890ff;
          }

          &.delete-ope {
            color: #ff4d4f;
            margin-left: auto;
            display: none;
            margin-right: 0;

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
    margin-top: 12px;
    display: flex;
    align-items: flex-start;

    .user-avatar {
      height: 36px;
      width: 36px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 8px;

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

  .more-btn {
    margin-top: 6px;
    margin-left: 44px;
    cursor: pointer;
    font-size: 14px;
    line-height: 22px;
    color: #1890ff;
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
