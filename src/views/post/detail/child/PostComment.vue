<template>
  <div class="post-comment-container" id="post-comment-id">
    <a-card title="评论" style="width: 100%" class="ant-card-self write-comment-card">
      <div class="write-comment" v-if="isLogin">
        <MdEditorCom
          v-model="content"
          :toolbars="toolbars"
          :footers="footers"
          :extend="{
            maxLength: 500,
          }"
          class="write-comment-editor"
          ref="commentEditor"
        />
        <div class="action-box">
          <a-button type="primary" :disabled="submittable" :loading="submitLoading" @click="handleSubmit"
            >发表评论
          </a-button>
        </div>
      </div>
      <div class="comment-hint-wrapper" v-else>
        <CommentHint />
      </div>
    </a-card>
    <a-card style="width: 100%" class="comment-list-card">
      <template #title>
        <div class="title-container">
          <div class="title-text large-font">全部评论({{ post.commentCount }})</div>
          <SortSwitch v-model="sort" @onChange="onChange" />
        </div>
      </template>
      <div class="comment-list">
        <ContentList
          url="getCommentsPage"
          auto-load
          data-text="评论"
          :params="params"
          :total="post.commentCount"
          load-trigger
          v-if="post.id"
          ref="ContentListRef">
          <template v-slot="{ list }">
            <CommentItem v-for="item in list" :data="item" :key="item.id" @deleteSuccess="deleteSuccess" />
          </template>
          <template v-slot:loadMoreBox="{ loading }">
            查看全部 {{ post.commentCount }} 条评论
            <i-down v-show="!loading" theme="outline" size="14" fill="#1890ff" />
            <i-loading-four v-show="loading" theme="outline" size="14" fill="#1890ff" />
          </template>
          <template v-slot:loadedAllBox>
            <div>已加载全部评论 ~</div>
          </template>
        </ContentList>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, provide, ref, watch, inject, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import CommentItem from '@/components/content/comment/CommentItem.vue';
import MdEditorCom from '@/components/content/mdEditor/MdEditorCom.vue';
import CommentHint from './CommentHint.vue';
import SortSwitch from '@/components/common/utils/sortSwitch/SortSwitch.vue';
import ContentList from '@/components/common/system/ContentList.vue';
import type { postData } from '@/views/post/detail/types';

const isLogin = computed(() => getters['isLogin']);

const { getters, dispatch } = useStore();

const toolbars = ['bold', 'underline', 'italic', '-', 'codeRow', 'code', 'link', 1, '-', '=', 'preview'];
const footers = ['markdownTotal', '=', 'scrollSwitch'];

const post = inject<postData>('post');
const setPostAttribute = inject('setPostAttribute');

const content = ref<string>('');
const activeId = ref<number>(-1);
const sort = ref<string>('new'); // true:最新 false:最热
const text = ref<string>('');
const submitLoading = ref<boolean>(false);
const commentEditor = ref(null);

const submittable = computed(() => !content.value);
const order = computed(() => (sort.value === 'new' ? 'create_time' : 'support_count'));
const userInfo = computed(() => getters['userInfo']);
const params = computed(() => ({
  postId: post.value.id,
  orderBy: order.value,
}));

const ContentListRef = ref<InstanceType<typeof ContentList>>();

const updateActiveId = (value: number) => {
  activeId.value = value;
};

provide('active', { activeId, updateActiveId });

function onChange() {
  nextTick(() => {
    ContentListRef.value.initData();
  });
}

function handleSubmit() {
  submitLoading.value = true;
  dispatch('createComment', {
    postId: post.value.id,
    userId: userInfo.value.id,
    userIdTo: post.value.userId,
    content: content.value,
  })
    .then(res => {
      message.success('评论成功');
      content.value = '';
      ContentListRef.value.list.unshift(res.data);
      setPostAttribute('commentCount', post.value.commentCount + 1);
    })
    .catch(e => {
      message.error('评论失败');
    })
    .finally(() => {
      submitLoading.value = false;
    });
}

function handleFocus() {
  commentEditor.value?.handleFocus();
}

const deleteSuccess = (data: postData) => {
  ContentListRef.value.list = ContentListRef.value.list.filter(item => item.id !== data.id);
  setPostAttribute('commentCount', post.value.commentCount - (1 + data.replyCount));
};

defineExpose({
  handleFocus,
});
</script>

<style lang="scss" scoped>
.post-comment-container {
  .write-comment-card {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;

    ::v-deep(.ant-card-body) {
      padding: 0 24px 10px 24px;
    }

    .write-comment {
      .write-comment-editor {
        height: 240px !important;
      }

      .action-box {
        padding-top: 6px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .comment-list-card {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;

    .title-container {
      display: flex;
      justify-content: space-between;

      .sort-type {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;
        font-weight: 400;
        cursor: pointer;
        background: var(--youyu-body-background-ligth);
        border-radius: 2px;
        padding: 3px;

        .sort-item {
          display: flex;
          align-items: center;
          padding: 2px 12px;
          line-height: 22px;
          font-size: 14px;
          color: #8a919f;

          ::v-deep(svg) {
            margin-right: 4px;
          }
        }

        .active {
          color: #1890ff;
          border-radius: 2px;
          background: var(--youyu-body-background2);

          ::v-deep(svg) {
            margin-right: 4px;
          }
        }
      }
    }

    .comment-list {
      ::v-deep(.comment-item) {
        padding: 8px 0;
      }
    }
  }

  ::v-deep(.ant-card) {
    .ant-card-head {
      border-bottom: none;
    }

    &:first-child {
      border-bottom: none;
      border-radius: 2px 2px 0 0;
    }

    &:nth-child(n + 2) {
      border-top: none;
      border-radius: 0;

      .ant-card-body {
        padding: 0 24px;
      }
    }

    &:last-child {
      border-radius: 0 0 2px 2px;
      padding-bottom: 10px;
    }
  }

  .operation-tip-box {
    .failed-box {
      cursor: pointer;
      text-align: center;
      margin: 6px 0;
    }

    .more-btn {
      margin-top: 8px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      color: #1e80ff;
      text-align: center;
    }

    .no-more {
      margin-top: 6px;
      text-align: center;
    }
  }
}
</style>
