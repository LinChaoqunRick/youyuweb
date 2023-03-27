<template>
  <div class="reply-container">
    <div class="reply-info">
      <div class="user-info">
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <img :src="data.user.avatar"/>
        </a-popover>
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.user"/>
          </template>
          <div class="user-nickname">{{data.user.nickname}}</div>
        </a-popover>
        <div class="author-text" v-if="post.userId === data.userId">(作者)</div>
      </div>
      <p class="reply-text" v-if="data.userTo">回复</p>
      <div class="user-info" v-if="data.userTo">
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.userTo"/>
          </template>
          <img :src="data.userTo.avatar"/>
        </a-popover>
        <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
          <template #content>
            <UserCard :user="data.userTo"/>
          </template>
          <div class="user-nickname">{{data.userTo.nickname}}</div>
        </a-popover>
        <div class="author-text" v-if="post.userId === data.userIdTo">(作者)</div>
      </div>
      <div class="create-time" :title="data.createTime">{{$dayjs().to(data.createTime)}}</div>
    </div>
    <div class="reply-content" v-html="data.content"></div>
    <div class="reply-operation">
      <div class="ope-item" :class="{'ope-active': data.commentLike}" @click="handleLike">
        <i-good-two :theme="data.commentLike?'filled':'outline'" size="16" fill="currentColor"/>
        点赞<span v-if="data.supportCount">({{data.supportCount}})</span>
      </div>
      <div class="ope-item" :class="{'ope-active': active}" @click="handleReply">
        <i-comment :theme="active?'filled':'outline'" size="16" fill="currentColor"/>
        {{active?'取消回复':'回复'}}<span v-if="data.replyCount">({{data.replyCount}})</span>
      </div>
      <div class="ope-item delete-ope" v-if="userInfo.id === data.userId" @click="handleDelete">
        删除
      </div>
    </div>
    <div class="reply-editor" v-if="active">
      <ReplyEditor :placeholder="`回复${data.user.nickname}`" @handleSubmit="handleSubmit" ref="replyEditor"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, inject} from "vue";
  import {useStore} from "vuex";
  import {message, Modal} from "ant-design-vue";

  import ReplyEditor from "@/components/content/comment/ReplyEditor.vue";
  import UserCard from "@/components/content/comment/UserCard.vue";


  const {getters, commit, dispatch} = useStore();
  const isLogin = computed(() => getters['isLogin']);
  const userInfo = computed(() => getters['userInfo']);

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
      message.success('评论成功');
      // loadReply();
      updateActiveId(-1);
      emit("saveSuccess");
    }).catch(e => {
      message.error("评论失败")
    }).finally(() => submitCallback())
  }

  function handleLike() {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    if (props.data.commentLike) { // 已经点过赞了，取消点赞
      dispatch('cancelCommentLike', {
        commentId: props.data.id,
        userId: userInfo.value.id,
        userIdTo: props.data.userId
      }).then(res => {
        if (res) {
          props.data.commentLike = null;
          props.data.supportCount -= 1;
        }
      })
    } else { // 没点赞过，点赞
      dispatch('setCommentLike', {
        commentId: props.data.id,
        userId: userInfo.value.id,
        userIdTo: props.data.userId
      }).then(res => {
        if (res) {
          props.data.commentLike = {
            commentId: props.data.id,
            userId: userInfo.value.id,
            userIdTo: props.data.userId
          };
          props.data.supportCount += 1;
        }
      })
    }
  }

  function handleDelete() {
    Modal.confirm({
      title: '删除评论',
      icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
      content: '确定删除这条评论吗？',
      onOk() {
        return dispatch("deleteComment", {commentId: props.data.id}).then(res => {
          message.success('删除成功');
          emit("deleteSuccess");
        }).catch(console.log)
      },
    });
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

        .user-nickname {
          cursor: pointer;
          font-weight: bold;
        }

        .author-text {
          font-size: 13px;
          font-weight: normal;
          color: #8a919f;
          margin-left: 5px;
        }
      }

      .reply-text {
        margin: 0 8px;
        font-size: 14px;
      }

      .create-time {
        font-size: 14px;
        color: #8a919f;
        margin-left: auto;
      }
    }

    .reply-content {
      font-size: 16px;
      margin: 8px 0;
      margin-left: 30px;
    }

    .reply-operation {
      display: flex;
      align-items: center;
      margin-left: 30px;


      .ope-item {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8a919f;
        margin-right: 10px;
        padding-top: 6px;
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
