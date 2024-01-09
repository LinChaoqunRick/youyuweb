<template>
  <div class="reply-container">
    <div class="reply-info">
      <div class="user-info">
        <a-popover placement="top"
                   :mouseEnterDelay="0.6"
                   :mouseLeaveDelay="0.3"
                   @visibleChange="onUserVisibleChange">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <RouterLink :to="`/user/${data.user.id}`">
            <img :src="data.user.avatar"/>
          </RouterLink>
        </a-popover>
        <a-popover placement="top"
                   :mouseEnterDelay="0.6"
                   :mouseLeaveDelay="0.3"
                   @visibleChange="onUserVisibleChange">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <RouterLink :to="`/user/${data.user.id}`">
            <div class="user-nickname">{{ data.user.nickname }}</div>
          </RouterLink>
        </a-popover>
        <div class="author-text" v-if="post.userId === data.userId">作者</div>
      </div>
      <div class="user-info" v-if="data.userTo && data.replyId !== -1">
        <p class="reply-text">回复</p>
        <a-popover placement="top"
                   :mouseEnterDelay="0.6"
                   :mouseLeaveDelay="0.3"
                   @visibleChange="onUserToVisibleChange">
          <template #content>
            <UserCard :user="data.userTo"/>
          </template>
          <RouterLink :to="`/user/${data.userTo.id}`">
            <img :src="data.userTo.avatar"/>
          </RouterLink>
        </a-popover>
        <a-popover placement="top"
                   :mouseEnterDelay="0.6"
                   :mouseLeaveDelay="0.3"
                   @visibleChange="onUserToVisibleChange">
          <template #content>
            <UserCard :user="data.userTo"/>
          </template>
          <RouterLink :to="`/user/${data.userTo.id}`">
            <div class="user-nickname">{{ data.userTo.nickname }}</div>
          </RouterLink>
        </a-popover>
        <div class="author-text" v-if="post.userId === data.userIdTo">作者</div>
      </div>
      <div class="create-time" :title="data.createTime">{{ $dayjs().to(data.createTime) }}</div>
    </div>
    <div class="reply-content" v-html="data.content"></div>
    <div class="reply-operation">
      <div class="ope-item" :class="{'ope-active': data.commentLike}" v-login="onLike">
        <i-good-two :theme="data.commentLike?'filled':'outline'" size="16" fill="currentColor"/>
        点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
      </div>
      <div class="ope-item" :class="{'ope-active': active}" @click="handleReply">
        <i-comment :theme="active?'filled':'outline'" size="16" fill="currentColor"/>
        {{ active ? '取消回复' : '回复' }}<span v-if="data.replyCount">({{ data.replyCount }})</span>
      </div>
      <div class="ope-item delete-ope" v-if="showDelete" @click="handleDelete">
        删除
      </div>
    </div>
    <div class="reply-editor" v-if="active">
      <ReplyEditor :placeholder="`回复${data.user.nickname}`" @handleSubmit="handleSubmit" ref="replyEditor"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, inject} from "vue";
import {useStore} from "vuex";
import {useRouter, RouterLink} from "vue-router";
import {message, Modal} from "ant-design-vue";

import ReplyEditor from "@/components/content/comment/ReplyEditor.vue";
import UserCard from "@/components/content/comment/UserCard.vue";
import type {userType} from "@/types/user";

const {getters, commit, dispatch} = useStore();
const router = useRouter();
const isLogin = computed(() => getters['isLogin']);
const userInfo = computed(() => getters['userInfo']);
const likeLoading = ref<boolean>(false);

const emit = defineEmits(['saveSuccess', 'deleteSuccess'])

const props = defineProps({
  data: { // 回复的子评论
    type: Object,
    required: true
  },
  root: { // 回复的子评论的父评论
    type: Object
  },
})

const {activeId, updateActiveId} = inject('active');
const active = computed(() => activeId.value === props.data.id);
const post = inject('post');
const setPostAttribute = inject('setPostAttribute');
const showDelete = computed(() => userInfo.value.id === props.data.userId || post.value.userId === userInfo.value.id)


function handleReply() {
  if (!isLogin.value) {
    commit("changeLogin", true);
    return;
  }
  if (!active.value) {
    updateActiveId(props.data.id);
  } else {
    updateActiveId(-1);
  }
}

function handleSubmit(content: string, submitCallback: Function) {
  dispatch("createComment", {
    postId: props.data.postId,
    userId: userInfo.value.id,
    rootId: props.data.rootId,
    replyId: props.data.id,
    userIdTo: props.data.userId,
    content: content
  }).then(res => {
    updateActiveId(-1);
    emit("saveSuccess", res.data);
    message.success('评论成功');
  }).catch(e => {
    message.error("评论失败")
  }).finally(() => submitCallback())
}

function onLike() {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = props.data.commentLike;
  dispatch(isLike ? 'cancelCommentLike' : 'setCommentLike', {
    commentId: props.data.id,
    userId: userInfo.value.id,
    userIdTo: props.data.userId
  }).then(res => {
    if (isLike) {
      props.data.commentLike = null;
      props.data.supportCount -= 1;
    } else {
      props.data.commentLike = res.data;
      props.data.supportCount += 1;
    }
  }).finally(() => {
    likeLoading.value = false;
  })
}

function handleDelete() {
  Modal.confirm({
    title: '删除评论',
    icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
    content: '确定删除这条评论吗？',
    onOk() {
      return dispatch("deleteComment", {commentId: props.data.id}).then(res => {
        if (res.data) {
          emit("deleteSuccess", props.data);
          message.success('删除成功');
        } else {
          message.error("删除失败");
        }
      }).catch(console.log)
    },
  });
}

const onUserVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getPostUserById', {userId: props.data.user.id}).then(res => {
      props.data.user = res.data;
    })
  }
}

const onUserToVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getPostUserById', {userId: props.data.userTo.id}).then(res => {
      props.data.userTo = res.data;
    })
  }
}
</script>

<style lang="scss" scoped>
.reply-container {

  .reply-info {
    display: flex;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 6px;
      }

      a {
        color: inherit;
      }

      .user-nickname {
        cursor: pointer;
        font-weight: bold;
      }

      .author-text {
        font-size: 12px;
        color: #fff;
        margin-left: 5px;
        background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
        border-radius: 12px;
        padding: 0 6px;
      }
    }

    .reply-text {
      margin: 0 8px;
      font-size: 13px;
    }

    .create-time {
      font-size: 14px;
      color: #8a919f;
      margin-left: auto;
    }
  }

  .reply-content {
    margin: 8px 0 8px 36px;
    white-space: pre-wrap;
  }

  .reply-operation {
    display: flex;
    align-items: center;
    margin-left: 36px;


    .ope-item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #8a919f;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }

      &.ope-active {
        color: #1890ff;
      }

      &.delete-ope {
        color: #ff4d4f;
        margin-left: auto;
        margin-right: 0;
        display: none;
      }

      ::v-deep(.i-icon) {
        margin-right: 3px;

        &.i-icon-comment {
          position: relative;
          top: 1.5px;
        }
      }
    }
  }

  .reply-editor {
    margin: 8px 0 0 15px;
  }

  &:hover {
    .ope-item {
      &.delete-ope {
        display: inherit;
      }
    }
  }
}
</style>
