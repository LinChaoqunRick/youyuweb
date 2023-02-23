<template>
  <div class="post-operation">
    <a-badge :count="post.likeCount" color="#1890ff" :overflow-count="99">
      <div class="ope-item" :class="{'active':state.isLike}" @click="handleSetLike">
        <i-good-two theme="filled" size="21" fill="currentColor"/>
      </div>
    </a-badge>
    <a-badge :count="post.commentCount" color="#1890ff" :overflow-count="99">
      <div class="ope-item" @click="scrollToComment">
        <i-comment theme="filled" size="19" fill="currentColor"/>
      </div>
    </a-badge>
    <div class="ope-item">
      <i-star theme="filled" size="21" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-share-one theme="filled" size="21" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-caution theme="filled" size="19" fill="currentColor"/>
    </div>
    <a-back-top>
      <div class="ope-item" ref="item">
        <i-to-top-one theme="filled" size="21" fill="currentColor"/>
      </div>
    </a-back-top>
  </div>
</template>

<script lang="ts" setup>
  import {scrollToEle} from "@/assets/utils/utils";
  import {computed, inject, reactive, ref} from "vue";
  import {useStore} from "vuex";

  const {getters, commit, dispatch} = useStore();

  const post = inject('post');
  const setPostLikeCount = inject('setPostLikeCount');
  const item = ref(null);

  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);
  const state = reactive({
    isLike: false,
    isCollect: false
  })

  function scrollToComment() {
    const commentEl: HTMLElement | null = document.querySelector("#post-comment-id");
    commentEl && scrollToEle(commentEl.offsetTop - 100);
  }

  if (isLogin.value) {
    dispatch("isPostLike", {
      postId: post.value.id,
      userId: userInfo.value.id,
      userIdTo: post.value.userId
    }).then(res => {
      state.isLike = !!res.data;
    })
  }

  function handleSetLike() {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    if (state.isLike) {
      handleCancel();
    } else {
      handleLike();
    }
  }

  function handleLike() {
    dispatch("setPostLike", {
      postId: post.value.id,
      userId: userInfo.value.id,
      userIdTo: post.value.userId
    }).then(res => {
      state.isLike = true;
      setPostLikeCount(post.value.likeCount + 1);
    })
  }

  function handleCancel() {
    dispatch("cancelPostLike", {
      postId: post.value.id,
      userId: userInfo.value.id,
      userIdTo: post.value.userId
    }).then(res => {
      state.isLike = false;
      setPostLikeCount(post.value.likeCount - 1);
    })
  }
</script>

<style lang="scss" scoped>
  .post-operation {
    .ope-item {
      height: 3.8rem;
      width: 3.8rem;
      background-color: var(--youyu-body-background3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 7px;
      cursor: pointer;
      color: #8a919f;

      &.active {
        .i-icon {
          color: #1890ff !important;
        }
      }

      &:hover {
        .i-icon {
          color: #545457;
        }
      }
    }

    ::v-deep(.ant-back-top) {
      position: relative;
      top: 0;
      left: 0;
    }

    ::v-deep(.ant-badge) {
      display: block;

      .ant-badge-count {
        top: 5px;
        right: 2px;
      }
    }
  }
</style>
