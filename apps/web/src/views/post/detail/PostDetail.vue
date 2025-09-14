<template>
  <div class="post-detail">
    <div class="post-aside">
      <div v-side-fixed class="post-aside-body">
        <UserInfoPanel :id="post.userId" />
      </div>
    </div>
    <div id="aside-right" class="post-body">
      <div class="post-main">
        <div v-if="userInfo.id === post.userId" :class="['post-status', post.status ? 'post-private' : 'post-public']">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ post.status ? '仅自己可见' : '所有人可见' }}</span>
            </template>
            <svg aria-hidden="true" @click="handleHide">
              <use v-if="post.status" xlink:href="#icon-yincang" />
              <use v-else xlink:href="#icon-liulan" />
            </svg>
          </a-tooltip>
        </div>
        <div class="post-title" v-text="post.title" />
        <div class="post-info">
          <div class="post-info-detail">
            <div class="post-category">
              <div v-if="post.categoryName" class="category-name cp">
                {{ post.categoryName }}
              </div>
            </div>
            <div class="author-info">
              <RouterLink :to="`/user/${post.user?.id}`">
                <i-user fill="currentColor" size="15" theme="outline" />
                <span>{{ post.user?.nickname }}</span>
              </RouterLink>
            </div>
            <div class="view-count">
              <i-preview-open fill="currentColor" size="18" theme="outline" />
              <span>{{ post.viewCount }} 次查看</span>
            </div>
            <div class="create-time">
              <a-tooltip placement="top">
                <template #title>
                  <div>首次发布：{{ post.createTime }}</div>
                  <div>最近更新：{{ post.updateTime }}</div>
                </template>
                <i-time fill="currentColor" size="15" theme="outline" />
                <span>发布于 {{ post.createTime?.substring(0, 16) }}</span>
              </a-tooltip>
            </div>
            <div class="text-amount">
              <i-add-text-two fill="currentColor" size="16" theme="outline" />
              <span>{{ post.content?.length }} 字</span>
            </div>
            <div class="operation-btns">
              <span
                v-if="userInfo.id === post.userId"
                class="operation-item edit cp"
                @click="handleEdit"
              >编辑</span>
            </div>
          </div>
          <div :class="{ unfold: !fold }" class="post-info-copyright">
            <div v-if="post.createType === '0'" class="copyright-original">
              <div class="creative-commons">
                版权声明：本文为博主原创文章，遵循
                <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC 4.0 BY-SA </a>
                版权协议，转载请附上原文出处链接和本声明。
              </div>
              <div class="creative-commons">
                本文链接：
                <a :href="'https://www.youyul.com/post/details/' + route.params.postId">
                  https://www.youyul.com/post/details/{{ route.params.postId }}
                </a>
              </div>
            </div>
            <div v-else class="copyright-reprint">
              <div class="creative-commons">
                原文链接：
                <a :href="post.originalLink">{{ post.originalLink }}</a>
              </div>
            </div>
          </div>
          <div :class="{ 'btn-expand': !fold }" class="expand-btn" @click="handleFold">
            <i-down fill="currentColor" size="14" theme="outline" />
          </div>
        </div>
        <div class="post-main-content">
          <Spin v-if="!post.id" height="500px" />
          <div v-if="false" class="post-summary">
            <div class="post-summary-title">
              摘要
            </div>
            <div class="post-summary-summary" v-text="post.summary" />
          </div>
          <div class="post-content">
            <MdPreview
              :text="post.content"
              editor-id="post-content"
              @on-html-changed="onHtmlChanged"
            />
          </div>
          <!--          <a-divider>感谢观看</a-divider>-->
          <div v-if="tags?.length" class="post-tags">
            <div v-for="item in tags" :key="item" class="tag-name cp">
              <i-tag-one fill="currentColor" size="16" theme="outline" />
              {{ item }}
            </div>
          </div>
          <div v-if="post.columns?.length" class="post-column-list">
            <div class="include-text">
              本文已收录至：
            </div>
            <PostColumn v-for="(item, index) in post.columns" :key="index" :data="item" />
          </div>
        </div>
      </div>
      <div class="post-right">
        <div class="post-category">
          <MdCatalogPanel editor-id="post-content" />
        </div>
        <div class="post-operation">
          <PostOperation v-if="post" @scroll-to-comment="scrollToComment" />
        </div>
      </div>
      <div class="post-comment">
        <div ref="commentRef" class="post-comment-list">
          <PostComment v-if="post" ref="postComment" />
        </div>
      </div>
    </div>
    <Teleport to="#header">
      <PercentCounter />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide, readonly, watch, inject } from 'vue';

import { Modal, message } from 'ant-design-vue';
import { debounce } from 'lodash';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { scrollToTop, scrollToAnchor } from '@/assets/utils/utils';
import PercentCounter from '@/components/common/utils/percentCounter/PercentCounter.vue';
import Spin from '@/components/common/utils/spin/Spin.vue';
import MdPreview from '@/components/content/mdEditor/MdPreview.vue';
import type { Post } from '@/views/post/detail/types';

import MdCatalogPanel from './child/MdCatalogPanel.vue';
import PostColumn from './child/PostColumn.vue';
import PostComment from './child/PostComment.vue';
import PostOperation from './child/PostOperation.vue';
import UserInfoPanel from './child/UserInfoPanel.vue';

defineOptions({
  name: 'PostDetail',
});

const reload = inject<Function>('reload');

const route = useRoute();
const router = useRouter();
const { dispatch, getters } = useStore();
const post = ref<Post>({});
const fold = ref(true);
const userInfo = computed(() => getters['userInfo']);
const tags = computed(() =>
  post.value?.tags?.length ? (post.value.tags as string).split(',') : [],
);
const commentRef = ref<HTMLDivElement | null>(null);
const postComment = ref<typeof PostComment | null>(null);
const isLogin = computed(() => getters['isLogin']);

function getPostDetail() {
  dispatch('getPostDetail', { postId: route.params.postId }).then(res => {
    post.value = res.data;
    document.title = res.data.title;
  });
}

getPostDetail();

const onHtmlChanged = debounce(scrollToAnchor, 500);

watch(
  () => route.params.postId,
  newVal => {
    if (newVal) {
      reload && reload();
    }
  },
);

function handleEdit() {
  router.push({ path: '/editPost', query: { postId: post.value!.id } });
}

const handleHide = () => {
  const {status} = (post.value!);
  Modal.confirm({
    title: status ? '公开文章' : '隐藏文章',
    content: status ? `确定将本文设置为公开?` : '确定将本文设置为私密？',
    onOk() {
      dispatch('hidePost', { postId: post.value!.id, status: status ? 0 : 1 }).then(res => {
        message.success('设置成功');
        post.value!.status = status ? 0 : 1;
      });
    },
  });
};

function handleFold() {
  fold.value = !fold.value;
}

function scrollToComment() {
  commentRef.value && scrollToTop(commentRef.value.offsetTop - 100);
  if (isLogin.value) {
    postComment.value?.handleFocus();
  }
}

function setPostAttribute(name: keyof Post, value: any) {
  post.value[name] = value;
}

provide('post', readonly(post));
provide('setPostAttribute', setPostAttribute);
</script>

<style lang="scss" scoped>
.post-detail {
  display: flex;
  justify-content: center;
  padding: 8px 0;

  /* align-items: flex-start; */

  .post-aside {
    position: relative;
    width: 300px;

    .post-aside-body {
      width: 300px;
    }
  }

  .post-body {
    width: 64%;
    max-width: 1050px;
    margin-left: 8px;

    .post-main {
      position: relative;
      overflow: hidden;
      background-color: var(--post-detail-background);
      border-radius: 4px;

      .post-status {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 50px solid rgb(24, 144, 255, 0.8); /* 三角形颜色 */
        border-left: 50px solid transparent;

        &.post-private {
          border-top: 50px solid rgb(136, 24, 255, 0.8); /* 三角形颜色 */
        }

        svg {
          position: absolute;
          top: -46px;
          left: -27px;
          width: 22px;
          height: 22px;
          cursor: pointer;
        }
      }

      .post-title {
        min-height: 35px;
        padding: 12px 24px 6px;
        overflow: hidden;
        font-size: 24px;
        font-weight: 500;
        text-align: left;
      }

      .post-info {
        position: relative;
        padding: 8px 0 0;
        margin: 0 24px;
        border-bottom: 1px solid var(--youyu-border-color);

        .post-info-detail {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .post-category {
            .category-name {
              padding: 0 12px;
              margin-right: 12px;
              color: #61abed;
              background-color: #e1eeff;
              border-radius: 2px;
            }
          }

          .author-info,
          .view-count,
          .create-time,
          .text-amount {
            margin-right: 12px;
            color: var(--youyu-body-text1) !important;
            cursor: pointer;
            transition: 0.3s;

            a {
              color: var(--youyu-body-text1) !important;
            }

            .i-icon {
              margin-right: 6px;

              &.i-icon-preview-open {
                position: relative;
                top: 2px;
              }
            }
          }

          .author-info {
            &:hover {
              a {
                color: #1890ff !important;
              }
            }
          }

          .operation-btns {
            color: #1890ff;
            user-select: none;

            .operation-item {
              margin-right: 8px;

              &.danger {
                color: #ff4d4f;
              }
            }
          }
        }

        .post-info-copyright {
          width: 100%;
          max-height: 0;
          padding-left: 10px;
          overflow: hidden;
          font-size: 13px;
          color: #6f6f82;
          transition: 0.3s;

          .copyright-original {
            padding-bottom: 6px;
          }

          .copyright-reprint {
            padding: 6px 0;
          }
        }

        .expand-btn {
          position: absolute;
          right: 0;
          bottom: -18px;
          height: 18px;
          padding: 0 12px;
          color: var(--youyu-body-text1);
          border: 1px solid var(--youyu-border-color);
          border-radius: 0 0 4px 4px;
          cursor: pointer;

          .i-icon {
            display: block;
            height: 100%;
            transition: 0.3s;
          }

          &.btn-expand {
            .i-icon {
              transform: rotate(-180deg);
            }
          }
        }

        .post-info-copyright.unfold {
          max-height: 48px;
        }
      }

      .post-main-content {
        padding: 20px 36px 36px;

        .post-summary {
          padding: 12px;
          background-color: var(--post-summary-background);
          border-radius: 4px;

          .post-summary-title {
            font-size: 16px;
            color: #1890ff;
          }
        }

        .post-content {
          ::v-deep(.md-editor) {
            background-color: transparent !important;

            .md-editor-preview-wrapper {
              padding: 0;
            }
          }
        }

        .post-tags {
          display: flex;
          align-items: center;
          margin-top: 12px;

          .tag-name {
            padding: 0 8px;
            margin-right: 6px;
            color: #61abed;
            background-color: #e1eeff;
            border-radius: 2px;
          }
        }

        .post-column-list {
          .include-text {
            margin-top: 12px;
            margin-left: 8px;
            color: var(--youyu-text1);
          }

          ::v-deep(.post-column) {
            margin-top: 12px;
          }
        }
      }
    }

    .post-right {
      position: relative;
      z-index: 2;

      .post-category {
        position: fixed;
        top: 100px;
        left: calc(100vw - 90px);
      }

      .post-operation {
        position: fixed;
        top: 260px;
        left: calc(100vw - 90px);
      }
    }

    .post-comment {
      margin-top: 8px;
      overflow: hidden;
      border-radius: 8px;
    }
  }

  .post-left-aside {
    position: fixed;
    top: 24%;
    right: 20px;
  }
}
</style>
