<template>
  <div class="post-comment-container" id="post-comment-id">
    <a-card title="评论" style="width: 100%" class="ant-card-self write-comment-card">
      <div class="write-comment" v-if="isLogin">
        <MdEditorCom v-model="content"
                     :toolbars="toolbars"
                     :footers="footers"
                     :extend="{
                       maxLength: 500
                     }"
                     class="write-comment-editor"
                     ref="commentEditor"/>
        <div class="action-box">
          <a-button type="primary" :disabled="submittable" :loading="submitLoading" @click="handleSubmit">发表评论
          </a-button>
        </div>
      </div>
      <div class="comment-hint-wrapper" v-else>
        <CommentHint/>
      </div>
    </a-card>
    <a-card style="width: 100%" class="comment-list-card">
      <template #title>
        <div class="title-container">
          <div class="title-text large-font">
            全部评论({{post.commentCount}})
          </div>
          <div class="sort-type">
            <div class="sort-item" :class="{'active': sort}" @click="handleSort(true)">
              <i-time theme="filled" size="13" fill="currentColor"/>
              最新
            </div>
            <div class="sort-item" :class="{'active': !sort}" @click="handleSort(false)">
              <i-fire theme="filled" size="13" fill="currentColor"/>
              最热
            </div>
          </div>
        </div>
      </template>
      <div class="comment-list">
        <CommentItem v-for="item in commentList"
                     :data="item"
                     :key="item.id"
                     @deleteSuccess="handleSort(true)"/>
        <div class="operation-tip-box">
          <div class="failed-box" v-if="failed" @click="onRetry">
            <i-refresh theme="outline" size="15" fill="#1890ff"/>
            重新加载
          </div>
          <div class="no-data" v-else-if="totalPageNum <= 0">暂无数据</div>
          <div class="more-btn" v-else-if="pageNum <= totalPageNum" @click="onUnlock" ref="loadMoreRef">
            加载全部 {{post.commentCount}} 条评论
            <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
            <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
          </div>
          <div class="no-more" v-else-if="pageNum >= totalPageNum">已加载全部评论</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from 'vuex';
  import {computed, provide, ref, watch, inject} from "vue";
  import {message} from 'ant-design-vue';
  import {notification} from 'ant-design-vue';
  import {keepScrollTop} from '@/assets/utils/utils';
  import CommentItem from "@/components/content/comment/CommentItem.vue";
  import MdEditorCom from "@/components/content/mdEditor/MdEditorCom.vue";
  import CommentHint from "./CommentHint.vue";

  const isLogin = computed(() => getters['isLogin']);

  const {getters, dispatch} = useStore();

  const content = ref<string>('');
  const total = ref<number>(0);
  const activeId = ref<number>(-1);
  const sort = ref(true); // true:最新 false:最热
  const commentList = ref([]);
  const text = ref<string>('');
  const submittable = computed(() => !content.value);
  const order = computed(() => sort.value ? 'create_time' : 'support_count');
  const userInfo = computed(() => getters['userInfo']);
  const toolbars = [
    'bold',
    'underline',
    'italic',
    '-',
    'codeRow',
    'code',
    'link',
    1,
    '-',
    '=',
    'preview',
  ];
  const footers = ['markdownTotal', '=', 'scrollSwitch'];
  const post = inject('post');
  const setPostAttribute = inject('setPostAttribute');
  const submitLoading = ref<boolean>(false);
  const restLoading = ref<boolean>(false);
  const failed = ref<boolean>(false);
  const commentEditor = ref(null);
  const loadMoreRef = ref(null);
  const pageNum = ref<number>(1);
  const totalPageNum = ref<number>(-1);
  const pageSize = ref<number>(10);

  const updateActiveId = (value: number) => {
    activeId.value = value;
  }

  provide('active', {activeId, updateActiveId});

  watch(() => post.value, () => {
    loadComment();
  })

  function loadComment() {
    if (totalPageNum.value !== -1 && pageNum > totalPageNum || failed.value) return;
    restLoading.value = true;
    dispatch("getCommentsPage", {
      postId: post.value.id,
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      orderBy: order.value
    }).then(res => {
      totalPageNum.value === -1 && (commentList.value = []);
      total.value = res.data.total;
      commentList.value.push(...res.data.list);
      totalPageNum.value === -1 && (totalPageNum.value = res.data.pages);
      pageNum.value++;
      keepScrollTop();
    }).catch(() => {
      failed.value = true;
    }).finally(() => {
      restLoading.value = false;
    });
  }


  function handleSort(value: boolean) {
    if (sort.value === value) return;
    sort.value = value;
    total.value = 0;
    pageNum.value = 1;
    totalPageNum.value = -1;
    pageSize.value = 10;
    loadComment();
  }

  function handleSubmit() {
    submitLoading.value = true;
    dispatch("createComment", {
      postId: post.value.id,
      userId: userInfo.value.id,
      userIdTo: post.value.userId,
      content: content.value
    }).then(res => {
      message.success('评论成功');
      content.value = '';
      handleSort(true);
      setPostAttribute('commentCount', post.value.commentCount + 1);
    }).catch(e => {
      message.error("评论失败")
    }).finally(() => {
      submitLoading.value = false;
    })
  }

  function handleFocus() {
    commentEditor.value?.handleFocus();
  }

  const onUnlock = () => {
    const ob = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      loadComment();
    });

    ob.observe(loadMoreRef.value);
  }

  const onRetry = () => {
    failed.value = false;
    loadComment();
  }

  defineExpose({
    handleFocus
  })
</script>

<style lang="scss" scoped>
  .post-comment-container {

    .write-comment-card {
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
            font-size: 1.167rem;
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
    }

    ::v-deep(.ant-card) {

      .ant-card-head {
        border-bottom: none;
      }

      &:first-child {
        border-bottom: none;
        border-radius: 2px 2px 0 0;
      }

      &:nth-child(n+2) {
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
