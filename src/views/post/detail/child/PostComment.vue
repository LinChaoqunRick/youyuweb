<template>
  <div class="post-comment-container">
    <a-card title="评论" style="width: 100%">
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
      <div>12341412341</div>
    </a-card>
    <a-card :title="`全部评论(${commentList.length})`" style="width: 100%">
      <CommentItem v-for="item in commentList" :data="item" v-bind="$attrs"/>
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

  const commentList = ref([]);

  watch(() => props.postId, (val) => {
    dispatch("getCommentsByPostId", {postId: val}).then(res => {
      commentList.value = res.data;
    });
  })
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
      }
    }
  }
</style>
