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
            <div class="create-type">
              <div v-if="post.createType === '0'" style="color: #67bb55">
                {{ post.createTypeDesc }}
              </div>
              <div v-if="post.createType === '1'" style="color: #fc5531">
                {{ post.createTypeDesc }}
              </div>
              <div v-if="post.createType === '2'" style="color: #6a87f1">
                {{ post.createTypeDesc }}
              </div>
            </div>
            <div class="post-info-data-category">
              <div class="post-info-data">
                <div class="post-info-data-item">
                  <i-calendar theme="outline" size="13" fill="currentColor" />
                  <a-tooltip placement="top">
                    <template #title>
                      <div>首次发布：{{ post.createTime }}</div>
                      <div>最近更新：{{ post.updateTime }}</div>
                    </template>
                    <span>{{ post.createTime }}</span>
                  </a-tooltip>
                </div>
                <div class="post-info-data-item">
                  <i-preview-open theme="outline" size="14" fill="currentColor" />
                  <span>{{ post.viewCount }}</span
                  >Views
                </div>
              </div>
              <div class="post-info-category">
                <span class="category-label">分类专栏：</span>
                <div class="category-name" v-if="post.categoryName">
                  {{ post.categoryName }}
                </div>
                <span class="tag-label" v-if="tags.length">标签：</span>
                <div class="tag-name" v-for="item in tags">{{ item }}</div>
              </div>
            </div>
            <div class="post-operation">
              <span class="operation-item hide" v-if="userInfo.id && userInfo.id === post.userId">隐藏</span>
              <span class="operation-item edit" v-if="userInfo.id && userInfo.id === post.userId" @click="handleEdit"
                >编辑</span
              >
              <span class="operation-item fold" @click="handleFold">{{ fold ? '展开' : '收起' }}</span>
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
        </div>
        <div class="post-main-content">
          <Spin v-if="!post.id" height="500px" />
          <div class="post-summary" v-if="false">
            <div class="post-summary-title">摘要</div>
            <div class="post-summary-summary" v-html="post.summary"></div>
          </div>
          <div class="post-content">
            <MdPreview editorId="post-content" :text="post.content" @onHtmlChanged="onHtmlChanged"/>
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
import { useRoute, useRouter } from 'vue-router';
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
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--post-detail-background);

      .post-title {
        min-height: 35px;
        text-align: left;
        font-size: 24px;
        font-weight: 700;
        overflow: hidden;
        padding: 6px 16px;
      }

      .post-info {
        .post-info-detail {
          position: relative;
          width: 100%;
          min-height: 44px;
          background-color: var(--post-info-background);

          .create-type {
            line-height: 22px;
            text-align: center;
            height: 20px;
            width: 50px;
            font-size: 14px;
            float: left;
            padding: 0 8px;
          }

          .post-info-data-category {
            margin-left: 50px;

            .post-info-data {
              height: 22px;
              display: flex;
              align-items: center;

              .post-info-data-item {
                display: flex;
                font-size: 13px;
                align-items: center;
                margin-right: 10px;
                color: var(--youyu-text1);
                cursor: pointer;

                .i-icon {
                  position: relative;
                  left: -2px;
                }

                span {
                  margin-left: 2px;
                }
              }
            }

            .post-info-category {
              height: 24px;
              display: flex;
              align-items: center;

              .category-label {
                position: relative;
                width: 65px;
                height: 20px;
                line-height: 20px;
                font-size: 13px;
              }

              .category-name {
                position: relative;
                height: 20px;
                line-height: 18px;
                font-size: 13px;
                margin-right: 5px;
                padding: 0 5px;
                background-color: var(--youyu-body-background3);
                color: #4a88c4;
                border: 1px solid var(--youyu-border-color);
                border-radius: 4px;
                cursor: pointer;
              }

              .tag-label {
                position: relative;
                height: 20px;
                line-height: 20px;
                font-size: 13px;
                margin-left: 8px;
              }

              .tag-name {
                position: relative;
                height: 20px;
                line-height: 18px;
                font-size: 13px;
                margin-right: 5px;
                padding: 0 5px;
                background-color: var(--youyu-body-background3);
                color: #4a88c4;
                border: 1px solid var(--youyu-border-color);
                border-radius: 4px;
                cursor: pointer;
              }
            }
          }

          .post-operation {
            position: absolute;
            height: 22px;
            right: 10px;
            top: 0;
            color: #1890ff;
            display: flex;
            align-items: center;

            .operation-item {
              position: relative;
              height: 10px;
              font-size: 12px;
              font-weight: 500;
              cursor: pointer;
              user-select: none;
              display: flex;
              align-items: center;
              margin-left: 6px;

              &.hide {
                color: #f56c6c;
              }

              &.fold {
                color: #409eff;
              }

              &.edit {
                color: #e6a23c;
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
          transition: 0.3s ease-out;
          border-bottom: 2px solid var(--youyu-border-color);

          .copyright-original {
            padding: 6px 0;
          }

          .copyright-reprint {
            padding: 6px 0;
          }
        }

        .post-info-copyright.unfold {
          max-height: 60px;
        }
      }

      .post-main-content {
        padding: 16px 36px 36px 36px;

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

        .post-column-list {
          border-top: 1px solid var(--youyu-border-color);

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
