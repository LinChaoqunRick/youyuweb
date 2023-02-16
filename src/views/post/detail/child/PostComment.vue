<template>
  <div class="post-comment-container" id="post-comment-id">
    <a-card title="评论" style="width: 100%" class="ant-card-self write-comment-card">
      <div class="write-comment">
        <MdEditorCom :toolbars="toolbars" v-model:text="text"/>
      </div>
    </a-card>
    <a-card style="width: 100%">
      <template #title>
        <div class="title-container">
          <div class="title-text large-font">
            全部评论({{total}})
          </div>
          <div class="sort-type">
            <div class="sort-item" :class="{'active': sort}" @click="handleSort">
              <i-time theme="filled" size="13" fill="currentColor"/>
              最新
            </div>
            <div class="sort-item" :class="{'active': !sort}" @click="handleSort">
              <i-fire theme="filled" size="13" fill="currentColor"/>
              最热
            </div>
          </div>
        </div>
      </template>
      <CommentItem v-for="item in commentList" :data="item" :key="item.id" v-bind="$attrs"/>
      <div class="more-btn" v-if="total - commentList.length> 0" @click="handleLoadALl">
        加载剩余 {{total - commentList.length}} 条评论
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from 'vuex';
  import {computed, ref, watch} from "vue";
  import CommentItem from "@/components/content/comment/CommentItem.vue";
  import MdEditorCom from "@/components/content/mdEditor/MdEditorCom.vue";

  const {dispatch} = useStore();

  const props = defineProps({
    postId: {
      type: [String, Number],
      required: true
    }
  })

  const total = ref(0);
  const sort = ref(true); // true:最新 false:最热
  const commentList = ref([]);
  const text = ref('');

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
    'htmlPreview',
  ]

  const footers = ['markdownTotal', 0, 'scrollSwitch']

  const order = computed(() => sort.value ? 'create_time' : 'support_count');

  watch(() => props.postId, (val) => {
    handlePage(val);
  })

  function handlePage(postId: string | number) {
    dispatch("getCommentsPage", {postId, orderBy: order.value}).then(res => {
      total.value = res.data.total;
      commentList.value = res.data.list;
    });
  }

  function handleLoadALl() {
    dispatch("getCommentsAll", {postId: props.postId, orderBy: order.value}).then(res => {
      total.value = res.data.length;
      commentList.value = res.data;
    })
  }

  function handleSort() {
    sort.value = !sort.value;
    // 如果已经加载完全部的，就不再进行分页查询
    console.log(commentList.value.length);
    console.log(total.value);
    if (commentList.value.length >= total.value) {
      handleLoadALl();
    } else {
      handlePage(props.postId);
    }

  }
</script>

<style lang="scss" scoped>
  .post-comment-container {

    .write-comment-card {
      ::v-deep(.ant-card-body) {
        padding: 10px 24px;
      }
    }

    .write-comment {
      height: 240px;
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
