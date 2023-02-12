<template>
  <div class="post-comment-container">
    <a-card title="评论列表" style="width: 100%">
      <CommentItem v-for="item in commentList" :data="item"/>
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

  }
</style>
