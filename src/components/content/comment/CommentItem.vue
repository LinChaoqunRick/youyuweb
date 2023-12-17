<template>
  <div class="comment-item">
    <div class="user-avatar">
      <a-popover
        placement="top"
        :mouseEnterDelay="0.6"
        :mouseLeaveDelay="0.3"
        @visibleChange="onVisibleChange"
      >
        <template #content>
          <UserCard :user="data.user" />
        </template>
        <RouterLink :to="`/user/${data.user.id}`">
          <img :src="data.user.avatar" />
        </RouterLink>
      </a-popover>
    </div>
    <div class="content-box">
      <div class="user-box">
        <div class="user-nickname">
          <a-popover
            placement="top"
            :mouseEnterDelay="0.2"
            :mouseLeaveDelay="0.3"
            @visibleChange="onVisibleChange"
          >
            <template #content>
              <UserCard :user="data.user" />
            </template>
            <RouterLink :to="`/user/${data.user.id}`">
              <div class="nickname-text">{{ data.user.nickname }}</div>
            </RouterLink>
          </a-popover>
          <div class="author-text" v-if="post.userId === data.userId">作者</div>
        </div>
        <div class="create-time" :title="data.createTime">
          {{ $dayjs().to(data.createTime) }}
        </div>
      </div>
      <div
        class="comment-content"
        :class="{ 'content-expand': expand }"
        v-row="{ set: set }"
      >
        <MdPreview :text="data.content" editorId="md-editor" />
      </div>
      <div class="comment-operation">
        <div
          class="ope-item"
          :class="{ 'ope-active': data.commentLike }"
          v-login="onLike"
        >
          <i-good-two
            :theme="data.commentLike ? 'filled' : 'outline'"
            size="16"
            fill="currentColor"
          />
          点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
        </div>
        <div
          class="ope-item"
          :class="{ 'ope-active': active }"
          @click="handleReply"
        >
          <i-comment
            :theme="active ? 'filled' : 'outline'"
            size="16"
            fill="currentColor"
          />
          {{ active ? "取消回复" : "回复"
          }}<span v-if="data.replyCount">({{ data.replyCount }})</span>
        </div>
        <div class="ope-item delete-ope" v-if="showDelete" @click="onDelete">
          删除
        </div>
      </div>
      <div class="reply-editor" v-if="active">
        <ReplyEditor
          :placeholder="`回复@${data.user.nickname}`"
          @handleSubmit="handleSubmit"
          ref="replyEditor"
        />
      </div>
      <div class="comment-operation">
        <div
          class="limit-btn"
          @click="expand = true"
          v-show="row > 7 && !expand"
        >
          展开
        </div>
        <div
          class="limit-btn"
          @click="expand = false"
          v-show="row > 7 && expand"
        >
          收起
        </div>
      </div>
      <div class="sub-comment-wrapper" v-if="!!data.replyCount">
        <ContentList
          url="getSubCommentsPage"
          :params="params"
          :immediate="false"
          foldable
          :auto-load="false"
          :show-loaded-all="false"
          :total="data.replyCount"
          data-text="回复"
          ref="ContentListRef"
        >
          <template v-slot="{ list }">
            <ReplyItem
              class="reply-item"
              :activeId="activeId"
              v-for="item in list"
              :data="item"
              @saveSuccess="saveSuccess"
              @deleteSuccess="deleteSuccess"
            />
          </template>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, nextTick } from "vue";
import type { PropType } from "vue";
import { useStore } from "vuex";
import { useRouter, RouterLink } from "vue-router";
import { message, Modal } from "ant-design-vue";
import type { userType } from "@/types/user";
import ReplyItem from "@/components/content/comment/ReplyItem.vue";
import UserCard from "@/components/content/comment/UserCard.vue";
import ReplyEditor from "@/components/content/comment/ReplyEditor.vue";
import MdPreview from "@/components/content/mdEditor/MdPreview.vue";
import ContentList from "@/components/common/system/ContentList.vue";

const { getters, commit, dispatch } = useStore();
const router = useRouter();
const isLogin = computed(() => getters["isLogin"]);
const userInfo = computed(() => getters["userInfo"]);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showDelete = computed(
  () =>
    userInfo.value.id === props.data.userId ||
    post.value.userId === userInfo.value.id
);
const post = inject("post");
const setPostAttribute = inject("setPostAttribute");
const expand = ref<boolean>(false);
const row = ref<number>(0);
const replyEditor = ref(null);
const { activeId, updateActiveId } = inject("active");
const active = computed(() => activeId.value === props.data.id);
const likeLoading = ref<boolean>(false);
const ContentListRef = ref(null);

const params = computed(() => ({
  commentId: props.data.id,
}));

const emit = defineEmits(["deleteSuccess"]);

function set(value: number) {
  row.value = value;
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

function onLike() {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = props.data.commentLike;
  dispatch(isLike ? "cancelCommentLike" : "setCommentLike", {
    commentId: props.data.id,
    userId: userInfo.value.id,
    userIdTo: props.data.userId,
  })
    .then((res) => {
      if (isLike) {
        props.data.commentLike = null;
        props.data.supportCount -= 1;
      } else {
        props.data.commentLike = res.data;
        props.data.supportCount += 1;
      }
    })
    .finally(() => {
      likeLoading.value = false;
    });
}

const handleSubmit = (content: string, submitCallback: Function) => {
  dispatch("createComment", {
    postId: props.data.postId,
    userId: userInfo.value.id,
    userIdTo: props.data.userId,
    rootId: props.data.id,
    content: content,
  })
    .then((res) => {
      props.data.replyCount = props.data.replyCount + 1;
      nextTick(() => {
        ContentListRef.value?.list.unshift(res.data);
        message.success("评论成功");
        updateActiveId(-1);
        setPostAttribute("commentCount", post.value.commentCount + 1);
      });
    })
    .catch((e) => {
      message.error("评论失败");
    })
    .finally(() => submitCallback());
};

function onDelete() {
  Modal.confirm({
    title: "删除评论",
    icon: "", // <help theme="outline" size="24" fill="#1890ff"/>
    content: "确定删除这条评论吗？",
    onOk() {
      return dispatch("deleteComment", { commentId: props.data.id })
        .then((res) => {
          if (res.data) {
            message.success("删除成功");
            emit("deleteSuccess", props.data);
          } else {
            message.error("删除失败");
          }
        })
        .catch(console.log);
    },
  });
}

const onVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch("getPostUserById", { userId: props.data.user.id }).then((res) => {
      props.data.user = res.data;
    });
  }
};

const saveSuccess = (data) => {
  ContentListRef.value.list.unshift(data);
  setPostAttribute("commentCount", post.value.commentCount + 1);
  props.data.replyCount = props.data.replyCount + 1;
};

const deleteSuccess = (data) => {
  ContentListRef.value.list = ContentListRef.value.list.filter(
    (item) => item.id !== data.id
  );
  setPostAttribute("commentCount", post.value.commentCount - 1);
  props.data.replyCount = props.data.replyCount - 1;
};
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;

  .user-avatar {
    img {
      height: 32px;
      width: 32px;
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

        a {
          color: inherit;
        }

        .author-text {
          font-size: 13px;
          font-weight: normal;
          color: #fff;
          margin-left: 5px;
          background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
          border-radius: 12px;
          padding: 0 8px;
        }
      }

      .create-time {
        font-size: 14px;
        color: #8a919f;
        margin-left: auto;
      }
    }

    .comment-content {
      line-height: 2rem;
      color: #515767;
      margin-top: 8px;
      max-height: 12rem;
      overflow: hidden;

      &.content-expand {
        max-height: none !important;
      }

      ::v-deep(.md-editor) {
        background-color: transparent !important;

        .md-editor-preview-wrapper {
          padding: 0 !important;

          p {
            margin: 0;
          }
        }
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
      ::v-deep(.content-list) {
        .data-list-wrapper {
        }

        .data-list {
          border-radius: 4px;
          padding: 12px;
          background-color: var(--subcomment-background);
        }

        .bottom-operation {
          justify-content: flex-start;

          > div {
            margin-right: 12px;
          }
        }
      }

      .reply-item {
        &:nth-child(n + 2) {
          margin-top: 1rem;
        }
      }
    }

    .more-btn {
      display: inline-block;
      margin-top: 8px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      color: #1890ff;
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