<template>
  <div class="post-operation">
    <a-badge :count="post.likeCount" color="#1890ff" :overflow-count="99">
      <div
        class="ope-item"
        :class="{ active: post.postLike }"
        v-login="onLike"
        :title="`${post.postLike ? '取消点赞' : '点赞'}`"
      >
        <i-good-two theme="filled" size="21" fill="currentColor" />
      </div>
    </a-badge>
    <a-badge :count="post.commentCount" color="#1890ff" :overflow-count="99">
      <div class="ope-item" @click="scrollToComment" title="评论">
        <i-comment theme="filled" size="19" fill="currentColor" />
      </div>
    </a-badge>
    <a-badge :count="post.collectCount" color="#1890ff" :overflow-count="99">
      <div
        class="ope-item"
        :class="{ active: post.postCollect }"
        v-login="onCollect"
        :title="post.postCollect ? '取消收藏' : '收藏'"
      >
        <i-star theme="filled" size="22" fill="currentColor" />
      </div>
    </a-badge>
    <div class="ope-item" title="分享">
      <i-share-one theme="filled" size="21" fill="currentColor" />
    </div>
    <div class="ope-item" title="举报">
      <i-caution theme="filled" size="19" fill="currentColor" />
    </div>
    <a-back-top class="ant-back-top">
      <div class="ope-item" ref="item" title="返回顶部">
        <i-to-top-one theme="filled" size="21" fill="currentColor" />
      </div>
    </a-back-top>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import openModal from '@/libs/tools/openModal';
import PostCollectSelector from '@/views/post/detail/child/PostCollectSelector.vue';

const { getters, commit, dispatch } = useStore();

const emit = defineEmits(['scrollToComment']);
const post = inject('post');
const setPostAttribute = inject('setPostAttribute');
const item = ref(null);
const likeLoading = ref<boolean>(false);
const collectLoading = ref<boolean>(false);

const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);

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
      setPostAttribute: setPostAttribute
    },
    title: '添加到收藏夹',
    maskClosable: false
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