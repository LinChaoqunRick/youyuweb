<template>
  <div class="post-comment-container">
    <a-card title="评论" style="width: 100%">
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
    </a-card>
    <a-card :title="`全部评论(${total})`" style="width: 100%">
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
</script>

<style lang="scss" scoped>
  .post-comment-container {

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
