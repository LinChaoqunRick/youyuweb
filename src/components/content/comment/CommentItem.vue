<template>
  <div class="comment-item">
    <div class="user-avatar">
      <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
        <template #content>
          <UserCard :user="data.user"/>
        </template>
        <img :src="data.user.avatar" @click="handleProfile(data.user)"/>
      </a-popover>
    </div>
    <div class="content-box">
      <div class="user-box">
        <div class="user-nickname">
          <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
            <template #content>
              <UserCard :user="data.user"/>
            </template>
            <div class="nickname-text" @click="handleProfile(data.user)">{{data.user.nickname}}</div>
          </a-popover>
          <div class="author-text" v-if="post.userId === data.userId">(作者)</div>
        </div>
        <div class="create-time" :title="data.createTime">{{$dayjs().to(data.createTime)}}</div>
      </div>
      <div class="comment-content" :class="{'content-expand': expand}" v-row="{set: set}">
        <MdPreview
          :text="data.content"
          editorId="md-editor"/>
      </div>
      <div class="comment-operation">
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
      <div class="comment-operation">
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="more-btn" @click="loadReply" v-if="data.replyCount>0 && !replies.length">
          共{{data.replyCount}}条回复
          <i-down v-if="!replyLoading" theme="outline" size="14" fill="#1890ff"/>
          <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
        </div>
      </div>
      <div class="sub-comment-wrapper" v-if="replies.length">
        <ReplyItem class="reply-item"
                   :activeId="activeId"
                   v-for="item in replies"
                   :data="item"
                   @saveSuccess="loadReply"
                   @deleteSuccess="loadReply"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, inject} from 'vue';
  import {useStore} from "vuex";
  import {useRouter} from "vue-router";
  import {message, Modal} from "ant-design-vue";
  import type {userType} from "@/types/user";
  import ReplyItem from "@/components/content/comment/ReplyItem.vue";
  import UserCard from "@/components/content/comment/UserCard.vue";
  import ReplyEditor from "@/components/content/comment/ReplyEditor.vue";
  import MdPreview from "@/components/content/mdEditor/MdPreview.vue";

  const {getters, commit, dispatch} = useStore();
  const router = useRouter();
  const isLogin = computed(() => getters['isLogin']);
  const userInfo = computed(() => getters['userInfo']);

  const props = defineProps({
    data: {
      type: Object,
      required: true
    },
  })

  const expand = ref<boolean>(false);
  const row = ref<number>(0);
  const replies = ref([]);
  const replyEditor = ref(null);
  const {activeId, updateActiveId} = inject('active');
  const active = computed(() => activeId.value === props.data.id);
  const post = inject('post');
  const replyLoading = ref(false);

  const emit = defineEmits(['deleteSuccess'])

  function set(value: number) {
    row.value = value;
  }

  function loadReply() {
    replyLoading.value = true;
    const commentId = props.data.id;
    dispatch("getSubCommentsAll", {commentId}).then(res => {
      replies.value = res.data;
      props.data.replyCount = res.data.length;
    }).finally(() => {
      replyLoading.value = false;
    })
  }

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

  function handleSubmit(content: string, submitCallback: Function) {
    dispatch("createComment", {
      postId: props.data.postId,
      userId: userInfo.value.id,
      userIdTo: props.data.userId,
      rootId: props.data.id,
      content: content
    }).then(res => {
      message.success('评论成功');
      loadReply();
      updateActiveId(-1);
    }).catch(e => {
      message.error("评论失败")
    }).finally(() => submitCallback())
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

  function handleProfile(user: userType) {
    router.push({path: `/user/${user.id}`})
  }
</script>

<style lang="scss" scoped>
  .comment-item {
    /*border-bottom: 1px solid #f0f0f0;*/
    display: flex;
    padding: 16px 0;

    &:first-child {
      padding-top: 0;
    }

    .user-avatar {
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .content-box {
      flex: 1 1 auto;
      margin-left: 12px;

      .user-box {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 4px;

        .user-nickname {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;

          .author-text {
            font-size: 13px;
            font-weight: normal;
            color: #8a919f;
            margin-left: 5px;
          }
        }

        .create-time {
          font-size: 14px;
          color: #8a919f;
          margin-left: auto;
        }
      }

      .comment-content {
        font-weight: 400;
        font-size: 14px;
        line-height: 2rem;
        color: #515767;
        margin-top: 8px;
        max-height: 12rem;
        overflow: hidden;
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 6;*/

        &.content-expand {
          max-height: none !important;
        }

        ::v-deep(p) {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
      }

      .comment-operation {
        display: flex;
        align-items: center;

        .limit-btn {
          margin-top: 8px;
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
          margin-right: 20px;
        }

        .more-btn {
          margin-top: 8px;
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1890ff;
        }

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
              top: 1px;
            }
          }
        }

        &:hover {

        }
      }

      .reply-editor {
        margin-top: 10px;
      }

      .sub-comment-wrapper {
        padding: 16px;
        background-color: var(--subcomment-background);
        border-radius: 4px;
        margin-top: 10px;

        .reply-item {
          &:nth-child(n + 2) {
            margin-top: 1rem;
          }
        }
      }
    }

    &:hover {
      .comment-operation {
        .ope-item {

          &.delete-ope {
            display: inherit;
          }
        }
      }
    }

    ::v-deep(#md-editor) {
      pre {
        margin: 10px 0 !important;
      }
    }
  }
</style>
