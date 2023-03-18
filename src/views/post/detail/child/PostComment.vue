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
                     class="write-comment-editor" ref="commentEditor"/>
        <div class="action-box">
          <a-button type="primary" :disabled="submittable" @click="handleSubmit">发表评论</a-button>
        </div>
      </div>
      <div class="comment-hint-wrapper" v-else>
        <CommentHint/>
      </div>
    </a-card>
    <a-card style="width: 100%">
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
      <CommentItem v-for="item in commentList"
                   :data="item"
                   :key="item.id"
                   @deleteSuccess="handleSort(true)"/>
      <div class="more-btn" v-if="total - commentList.length> 0" @click="handleLoadALl">
        加载剩余 {{total - commentList.length}} 条评论
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

  const content = ref('');
  const total = ref(0);
  const activeId = ref(-1);
  const sort = ref(true); // true:最新 false:最热
  const commentList = ref([]);
  const text = ref('');
  const submittable = computed(() => !content.value);
  const order = computed(() => sort.value ? 'create_time' : 'support_count');
  const userInfo = computed(() => getters['userInfo']);
  const toolbars = [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'unorderedList',
    'orderedList',
    '-',
    'codeRow',
    'code',
    'link',
    0,
    1,
    2,
    '-',
    'revoke',
    'next',
    '=',
    'prettier',
    'preview',
  ];
  const footers = ['markdownTotal', '=', 'scrollSwitch'];
  const post = inject('post');
  const setPostAttribute = inject('setPostAttribute');

  function updateActiveId(value) {
    activeId.value = value;
  }

  provide('active', {activeId, updateActiveId});

  watch(() => post.value, ({id}) => {
    handlePage(id);
  })

  function handlePage(postId: string | number) {
    dispatch("getCommentsPage", {postId, orderBy: order.value}).then(res => {
      total.value = res.data.total;
      commentList.value = res.data.list;
    });
  }

  function handleLoadALl() {
    dispatch("getCommentsAll", {postId: post.value.id, orderBy: order.value}).then(res => {
      total.value = res.data.length;
      commentList.value = res.data;
      keepScrollTop();
    })
  }

  function handleSort(value: boolean) {
    sort.value = value;
    // 如果已经加载完全部的，就不再进行分页查询
    if (commentList.value.length >= total.value) {
      handleLoadALl();
    } else {
      handlePage(post.value.id);
    }
  }

  function handleSubmit() {
    dispatch("createComment", {
      postId: post.value.id,
      userId: userInfo.value.id,
      content: content.value
    }).then(res => {
      message.success('评论成功');
      content.value = '';
      handleSort(true);
      setPostAttribute('commentCount', post.value.commentCount + 1);
    }).catch(e => {
      message.error("评论失败")
    })
  }
</script>

<style lang="scss" scoped>
  .post-comment-container {

    .write-comment-card {
      ::v-deep(.ant-card-body) {
        padding: 0 24px 10px 24px;
      }
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

    .more-btn {
      margin-top: 8px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      color: #1e80ff;
      text-align: center;
    }
  }
</style>
