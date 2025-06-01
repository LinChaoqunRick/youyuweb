<template>
  <div class="post-operation">
    <div class="ope-item" title="全屏">
      <i-full-screen theme="outline" size="21" fill="currentColor" />
    </div>
    <a-badge :count="post.likeCount" color="#1890ff" :overflow-count="99">
      <div
        class="ope-item"
        :class="{ active: post.postLike }"
        v-login="onLike"
        :title="`${post.postLike ? '取消点赞' : '点赞'}`"
      >
        <i-good-two :theme="post.postLike ? 'filled' : 'outline'" size="21" fill="currentColor" />
      </div>
    </a-badge>
    <a-badge :count="post.commentCount" color="#1890ff" :overflow-count="99">
      <div class="ope-item" @click="scrollToComment" title="评论">
        <i-comment theme="outline" size="19" fill="currentColor" />
      </div>
    </a-badge>
    <a-badge :count="post.collectCount" color="#1890ff" :overflow-count="99">
      <div
        class="ope-item"
        :class="{ active: post.postCollect }"
        v-login="onCollect"
        :title="post.postCollect ? '取消收藏' : '收藏'"
      >
        <i-star :theme="post.postCollect ? 'filled' : 'outline'" size="22" fill="currentColor" />
      </div>
    </a-badge>
    <div class="ope-item" title="分享">
      <i-share-one theme="outline" size="21" fill="currentColor" />
    </div>
    <!--    <div class="ope-item" title="举报">
          <i-caution theme="outline" size="19" fill="currentColor" />
        </div>-->
    <transition name="fade">
      <div class="ope-item" title="回到顶部" v-show="isShowBackTop" @click="onTop">
        <i-to-top theme="outline" size="21" fill="#545457" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useStore } from 'vuex';
import type { Post } from '@/views/post/detail/types';
import openModal from '@/libs/tools/openModal';
import PostCollectSelector from '@/views/post/detail/child/PostCollectSelector.vue';
import { useWindowScroll } from '@vueuse/core';

const { getters, dispatch } = useStore();

const emit = defineEmits(['scrollToComment']);
const post = inject<Post>('post')!;
const setPostAttribute = inject('setPostAttribute');
const likeLoading = ref<boolean>(false);
const { y } = useWindowScroll();

const isShowBackTop = computed(() => y.value >= 200);

const userInfo = computed(() => getters['userInfo']);

function scrollToComment() {
  emit('scrollToComment');
}

function onLike() {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = post.value.postLike;
  dispatch(isLike ? 'cancelPostLike' : 'setPostLike', {
    postId: post.value.id,
    userId: userInfo.value.id,
    userIdTo: post.value.userId,
  })
    .then(res => {
      if (isLike) {
        setPostAttribute('postLike', false);
        setPostAttribute('likeCount', post.value.likeCount - 1);
      } else {
        setPostAttribute('postLike', true);
        setPostAttribute('likeCount', post.value.likeCount + 1);
      }
    })
    .finally(() => {
      likeLoading.value = false;
    });
}

async function onCollect() {
  const res = await openModal({
    component: PostCollectSelector,
    componentProps: {
      post: post.value,
      setPostAttribute: setPostAttribute,
    },
    title: '添加到收藏夹',
    maskClosable: false,
  });
}

function onTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滚动
  });
}
</script>

<style lang="scss" scoped>
.post-operation {
  .ope-item {
    height: 48px;
    width: 48px;
    background-color: var(--youyu-body-background3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7px;
    cursor: pointer;
    color: #8a919f;

    .i-icon {
      transition: 0.3s;
    }

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

  .ant-back-top {
    display: none;
    position: relative;
    top: 0;
    left: 0;
    height: 48px;
    width: 48px;
    background-color: var(--youyu-body-background3) !important;
    border-radius: 50%;

    ::v-deep(.ant-float-btn-body) {
      background: transparent !important;
    }
  }

  ::v-deep(.ant-badge) {
    display: block;

    .ant-badge-count {
      top: 5px;
      right: 2px;
      color: #ffffff !important;
    }
  }
}
</style>
