<template>
  <div class="post-comment-container">
    <a-card title="评论" style="width: 100%" class="ant-card-self">
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
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
      <CommentItem v-for="item in commentList" :data="item" v-bind="$attrs"/>
      <div class="more-btn" v-if="total - commentList.length> 0" @click="handleLoadALl">继续加载 {{total -
        commentList.length}} 条评论
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import {useStore} from 'vuex';
  import {ref, watch} from "vue";
  import CommentItem from "@/components/content/comment/CommentItem.vue"

  const {dispatch} = useStore();

  const props = defineProps({
    postId: {
      type: [String, Number],
      required: true
    }
  })

  const total = ref(0);
  const sort = ref(true); // true:最热 false:最新
  const commentList = ref([]);

  watch(() => props.postId, (val) => {
    dispatch("getCommentsPage", {postId: val}).then(res => {
      total.value = res.data.total;
      commentList.value = res.data.list;
    });
  })

  function handleLoadALl() {
    dispatch("getCommentsAll", {postId: props.postId}).then(res => {
      total.value = res.data.length;
      commentList.value = res.data;
    })
  }

  function handleSort() {
    sort.value = !sort.value;
  }
</script>

<style lang="scss" scoped>
  .post-comment-container {

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
        background: #f2f3f5;
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
          background: #fff;

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
