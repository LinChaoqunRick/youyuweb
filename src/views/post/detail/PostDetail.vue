<template>
  <div class="post-detail">
    <div class="post-aside">
      <div v-aside2 class="post-aside-body">
        <UserInfoPanel :id="post.userId"/>
      </div>
    </div>
    <div class="post-body">
      <div class="post-main">
        <div class="post-title" v-html="post.title"></div>
        <div class="post-info">
          <div class="post-info-detail">
            <div class="create-type">
              <p v-if="post.createType==='0'" style="color: #67bb55;">
                {{post.createTypeDesc}}</p>
              <p v-if="post.createType==='1'" style="color: #fc5531;">
                {{post.createTypeDesc}}</p>
              <p v-if="post.createType==='2'" style="color: #6a87f1;">
                {{post.createTypeDesc}}</p>
            </div>
            <div class="post-info-data-category">
              <div class="post-info-data">
                <div class="post-info-data-item">
                  <i-calendar theme="filled" size="13" fill="#797979"/>
                  <span>{{post.createTime}}</span>
                </div>
                <div class="post-info-data-item">
                  <i-preview-open theme="filled" size="14" fill="#797979"/>
                  <span>{{post.viewCount}}</span>Views
                </div>
              </div>
              <div class="post-info-category">
                <span class="category-label">分类专栏：</span>
                <div class="category-name" v-if="post.categoryName">
                  {{post.categoryName}}
                </div>
              </div>
            </div>
            <div class="post-operation">
              <span class="operation-item" v-if="userInfo.id && (userInfo.id === post.userId)">隐藏</span>
              <span class="operation-item" v-if="userInfo.id && (userInfo.id === post.userId)"
                    @click="handleEdit">编辑</span>
              <span class="operation-item" @click="handleFold">{{fold?'展开':'收起'}}</span>
            </div>
          </div>
          <div class="post-info-copyright" :class="{'unfold': !fold}">
            <div class="copyright-original" v-if="post.createType === '0'">
              <div class="creative-commons">
                版权声明：本文为博主原创文章，遵循
                <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC 4.0 BY-SA </a>
                版权协议，转载请附上原文出处链接和本声明。
              </div>
              <div class="creative-commons">
                本文链接：
                <a
                  :href="'https://www.youyul.com/post/details/'+route.params.postId">
                  https://www.youyul.com/post/details/{{route.params.postId}}
                </a>
              </div>
            </div>
            <div class="copyright-reprint" v-else>
              <div class="creative-commons">
                原文链接：
                <a :href=post.originalLink>{{post.originalLink}}</a>
              </div>
            </div>
          </div>
        </div>
        <Spin v-if="JSON.stringify(post) === '{}'" height="500px"/>
        <div class="post-summary">
          <div class="post-summary-title">摘要</div>
          <div class="post-summary-summary" v-html="post.summary"></div>
        </div>
        <div class="post-content">
          <MdPreview
            :text="post.content"
            :extend="{
              showCodeRowNumber: true
            }"/>
        </div>
      </div>
      <div class="post-aside">
        <div class="post-category">
          <MdCatalogPanel editorId="md-editor"/>
        </div>
        <div class="post-operation">
          <PostOperation v-if="post"/>
        </div>
      </div>
      <div class="post-comment">
        <div class="post-comment-list">
          <PostComment ref="postComment"/>
        </div>
      </div>
    </div>
    <Teleport to="#header">
      <PercentCounter/>
    </Teleport>
  </div>
</template>

<script setup>
  import {ref, reactive, computed, provide, readonly} from 'vue';
  import {useRoute, useRouter} from 'vue-router';
  import {useStore} from 'vuex';

  import PercentCounter from "@/components/common/utils/percentCounter/PercentCounter.vue";
  import MdPreview from "@/components/content/mdEditor/MdPreview.vue";
  import Spin from "@/components/common/utils/spin/Spin.vue";
  import UserInfoPanel from "./child/UserInfoPanel.vue";
  import MdCatalogPanel from "./child/MdCatalogPanel.vue";
  import PostOperation from "./child/PostOperation.vue";
  import PostComment from "./child/PostComment.vue";

  const route = useRoute();
  const router = useRouter();
  const {state, dispatch, getters} = useStore();
  const post = ref('');
  const fold = ref(true);
  const userInfo = computed(() => getters['userInfo']);
  const postComment = ref(null);

  function getPostDetail() {
    dispatch("getPostDetail", {postId: route.params.postId}).then(res => {
      post.value = res.data;
      document.title = res.data.title;
    })
  }

  getPostDetail();

  function handleEdit() {
    router.push({path: '/editPost', query: {postId: post.value.id}})
  }

  function handleFold() {
    fold.value = !fold.value;
  }

  function setPostLikeCount(count) {
    post.value.likeCount = count;
  }

  function setPostCommentCount(count) {
    post.value.commentCount = count;
  }

  provide('post', readonly(post));
  provide('setPostLikeCount', setPostLikeCount);
  provide('setPostCommentCount', setPostCommentCount);

</script>

<style lang="scss" scoped>
  .post-detail {
    max-width: 1300px;
    display: flex;
    margin: 8px auto;
    justify-content: center;

    .post-aside {
      position: relative;
      width: 300px;

      .post-aside-body {
        width: 300px;
      }
    }

    .post-body {
      width: 75%;
      margin-left: 8px;

      .post-main {
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
              width: 40px;
              font-size: 14px;
              float: left;
            }

            .post-info-data-category {
              margin-left: 50px;

              .post-info-data {
                height: 22px;
                display: flex;
                align-items: center;

                .post-info-data-item {
                  display: flex;
                  font-size: 12px;
                  align-items: center;
                  margin-right: 6px;
                  color: #797979;

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
              }
            }

            .post-operation {
              position: absolute;
              height: 22px;
              right: 10px;
              top: 0;
              color: #8fb0c9;
              display: flex;
              align-items: center;

              .operation-item {
                height: 10px;
                padding: 0 4px;
                font-size: 12px;
                cursor: pointer;
                user-select: none;
                display: flex;
                align-items: center;

                &:nth-child(n+2) {
                  border-left: 2px solid #8fb0c9;
                  /*&:before {*/
                  /*  content: "";*/
                  /*  height: 10px;*/
                  /*  width: 1px;*/
                  /*  color: #8fb0c9;*/
                  /*  border-left: 1px solid #8fb0c9;*/
                  /*}*/
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
            transition: .3s ease-out;
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

        .post-summary {
          margin: 12px 24px 0 24px;
          padding: 8px 12px;
          background-color: var(--post-summary-background);
          border-radius: 8px;

          .post-summary-title {
            font-size: 16px;
            color: #1890ff;
            /*text-align: center;*/
          }
        }

        .post-content {
          padding: 0 24px;
        }
      }

      .post-aside {
        .post-category {
          position: fixed;
          top: 100px;
          right: 20px;
        }

        .post-operation {
          position: fixed;
          top: 260px;
          right: 20px;
        }
      }

      .post-comment {
        margin-top: 8px;
      }
    }

    .post-left-aside {
      position: fixed;
      right: 20px;
      top: 24%;
    }
  }
</style>