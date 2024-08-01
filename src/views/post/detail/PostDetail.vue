<template>
  <div class="post-detail">
    <div class="post-aside">
      <div v-aside3 class="post-aside-body">
        <UserInfoPanel :id="post.userId" />
      </div>
    </div>
    <div class="post-body" id="aside-right">
      <div class="post-main">
        <div class="post-title" v-html="post.title"></div>
        <div class="post-info">
          <div class="post-info-detail">
            <div class="post-category">
              <div class="category-name cp" v-if="post.categoryName">
                {{ post.categoryName }}
              </div>
            </div>
            <div class="author-info">
              <RouterLink :to="`/user/${post.user.id}`">
                <i-user theme="outline" size="15" fill="currentColor" />
                <span>{{ post.user.nickname }}</span>
              </RouterLink>
            </div>
            <div class="view-count">
              <i-preview-open theme="outline" size="18" fill="currentColor" />
              <span>{{ post.viewCount }} 次查看</span>
            </div>
            <div class="create-time">
              <a-tooltip placement="top">
                <template #title>
                  <div>首次发布：{{ post.createTime }}</div>
                  <div>最近更新：{{ post.updateTime }}</div>
                </template>
                <i-time theme="outline" size="15" fill="currentColor" />
                <span>发布于 {{ post.createTime?.substring(0, 16) }}</span>
              </a-tooltip>
            </div>
            <div class="text-amount">
              <i-add-text-two theme="outline" size="16" fill="currentColor" />
              <span>{{ post.content.length }} 字</span>
            </div>
            <div class="operation-btns">
              <span class="operation-item edit cp" v-if="userInfo.id === post.userId" @click="handleEdit">编辑</span>
              <span class="operation-item hide cp" v-if="userInfo.id === post.userId" :class="{'danger': !post.status}"
                    @click="handleHide">
                {{ post.status ? '设为公开' : '设为私密' }}
              </span>
            </div>
          </div>
          <div class="post-info-copyright" :class="{ unfold: !fold }">
            <div class="copyright-original" v-if="post.createType === '0'">
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
            <div class="copyright-reprint" v-else>
              <div class="creative-commons">
                原文链接：
                <a :href="post.originalLink">{{ post.originalLink }}</a>
              </div>
            </div>
          </div>
          <div class="expand-btn" :class="{'btn-expand': !fold}" @click="handleFold">
            <i-down theme="outline" size="14" fill="currentColor" />
          </div>
        </div>
        <div class="post-main-content">
          <Spin v-if="!post.id" height="500px" />
          <div class="post-summary" v-if="false">
            <div class="post-summary-title">摘要</div>
            <div class="post-summary-summary" v-html="post.summary"></div>
          </div>
          <div class="post-content">
            <MdPreview editorId="post-content" :text="post.content" @onHtmlChanged="onHtmlChanged" />
          </div>
<!--          <a-divider>感谢观看</a-divider>-->
          <div class="post-tags" v-if="tags?.length">
            <div class="tag-name cp" v-for="item in tags">
              <i-tag-one theme="outline" size="16" fill="currentColor" />
              {{ item }}
            </div>
          </div>
          <div class="post-column-list" v-if="post.columns?.length">
            <div class="include-text">本文已收录至：</div>
            <PostColumn v-for="item in post.columns" :data="item" />
          </div>
        </div>
      </div>
      <div class="post-right">
        <div class="post-category">
          <MdCatalogPanel editorId="post-content" />
        </div>
        <div class="post-operation">
          <PostOperation v-if="post" @scrollToComment="scrollToComment" />
        </div>
      </div>
      <div class="post-comment">
        <div class="post-comment-list" ref="commentRef">
          <PostComment ref="postComment" />
        </div>
      </div>
    </div>
    <Teleport to="#header">
      <PercentCounter />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, readonly, watch, inject, nextTick } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import { scrollToTop, scrollToAnchor } from '@/assets/utils/utils';
import type { postData } from '@/types/post';

import PercentCounter from '@/components/common/utils/percentCounter/PercentCounter.vue';
import MdPreview from '@/components/content/mdEditor/MdPreview.vue';
import Spin from '@/components/common/utils/spin/Spin.vue';
import UserInfoPanel from './child/UserInfoPanel.vue';
import MdCatalogPanel from './child/MdCatalogPanel.vue';
import PostOperation from './child/PostOperation.vue';
import PostComment from './child/PostComment.vue';
import PostColumn from './child/PostColumn.vue';

const reload = inject('reload');

const route = useRoute();
const router = useRouter();
const { state, dispatch, getters } = useStore();
const post = ref<postData>({
  id: null,
  title: '',
  content: '',
  categoryId: null,
  tags: '',
  thumbnail: [],
  summary: '',
  createType: '',
  originalLink: '',
  userId: null,
  columnIds: [],
  user: {}
});
const fold = ref(true);
const userInfo = computed(() => getters['userInfo']);
const tags = computed(() => (post.value.tags?.length ? post.value.tags.split(',') : []));
const commentRef = ref(null);
const postComment = ref(null);
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
      reload();
    }
  }
);

function handleEdit() {
  router.push({ path: '/editPost', query: { postId: post.value.id } });
}

const handleHide = () => {
  const status = post.value.status;
  Modal.confirm({
    title: status ? '公开文章' : '隐藏文章',
    content: status ? `确定将本文设置为公开?` : '确定将本文设置为私密？',
    onOk() {
      dispatch('hidePost', { postId: post.value.id, status: status ? 0 : 1 }).then(res => {
        message.success('设置成功');
        post.value.status = status ? 0 : 1;
      });
    }
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

function setPostAttribute(name, value) {
  post.value[name] = value;
}

provide('post', readonly(post));
provide('setPostAttribute', setPostAttribute);
</script>

<style lang="scss" scoped>
.post-detail {
  display: flex;
  padding: 8px 0;
  justify-content: center;
  /*align-items: flex-start;*/

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
      border-radius: 4px;
      overflow: hidden;
      background-color: var(--post-detail-background);

      .post-title {
        min-height: 35px;
        text-align: left;
        font-size: 24px;
        font-weight: 500;
        overflow: hidden;
        padding: 12px 24px 6px 24px;
      }

      .post-info {
        position: relative;
        padding: 8px 0 0 0;
        margin: 0 24px;
        border-bottom: 1px solid var(--youyu-border-color);

        .post-info-detail {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .post-category {
            .category-name {
              background-color: #e1eeff;
              color: #61abed;
              border-radius: 2px;
              padding: 0 12px;
              margin-right: 12px;
            }
          }

          .author-info, .view-count, .create-time, .text-amount {
            color: var(--youyu-body-text1) !important;
            margin-right: 12px;
            transition: .3s;
            cursor: pointer;

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
          font-size: 13px;
          color: #6f6f82;
          width: 100%;
          padding-left: 10px;
          overflow: hidden;
          max-height: 0;
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
          color: var(--youyu-body-text1);
          border: 1px solid var(--youyu-border-color);
          padding: 0 12px;
          border-radius: 0 0 4px 4px;
          height: 18px;
          cursor: pointer;

          .i-icon {
            display: block;
            height: 100%;
            transition: .3s;
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
        padding: 30px 36px 36px 36px;

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
            background-color: #e1eeff;
            color: #61abed;
            padding: 0 8px;
            border-radius: 2px;
            margin-right: 6px;
          }
        }

        .post-column-list {

          .include-text {
            color: var(--youyu-text1);
            margin-top: 12px;
            margin-left: 8px;
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
      border-radius: 8px;
      overflow: hidden;
    }
  }

  .post-left-aside {
    position: fixed;
    right: 20px;
    top: 24%;
  }
}
</style>
