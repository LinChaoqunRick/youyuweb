<template>
  <div class="moment-detail mt-8">
    <div class="moment-detail-middle">
      <div v-if="moment">
        <div class="moment-detail-item">
          <MomentItem v-if="!isEdit" :data="moment" @deleteSuccess="onMomentDeleteSuccess" @onEdit="onEdit"
                      ref="MomentRef"/>
          <MomentEditor v-else/>
        </div>
        <div class="moment-comment-editor-wrapper mt-8">
          <div class="editor-title">评论</div>
          <MomentReplyEditor @onSubmit="MomentRef?.onCommentSubmit"/>
        </div>
        <div class="moment-comment-list mt-8 mb-8">
          <div class="comment-list-top">
            <div class="comment-count">
              全部评论（{{moment.commentCount || 0}}）
            </div>
            <div class="sort-type">
              <div class="sort-item" :class="{'active': sort}" @click="handleSort(true)">
                <i-time theme="filled" size="13" fill="currentColor"/>
                最新
              </div>
              <div class="sort-item" :class="{'active': !sort}" @click="handleSort(false)">
                <i-fire theme="filled" size="13" fill="currentColor"/>
                最热
              </div>
            </div>
          </div>
          <div class="comment-list">
            <MomentCommentItem v-for="item in commentList"
                               :key="item.id"
                               class="comment-item"
                               :data="item"
                               @deleteSuccess="onCommentDeleteSuccess"/>
          </div>

          <div class="failed-box" v-if="failed" @click="onRetry">
            <i-refresh theme="outline" size="15" fill="#1890ff"/>
            重新加载
          </div>
          <div class="no-data" v-else-if="moment.commentCount===0">暂无数据</div>
          <div class="comment-load-all"
               v-else-if="moment.commentCount && pageNum <= totalPageNum"
               @click="onUnlock" ref="loadMoreRef">
            <div class="more-btn">
              查看全部 <span class="comment-count">{{moment.commentCount}}</span> 条评论
              <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
              <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
            </div>
          </div>
          <div class="loaded-all" v-else-if="pageNum>totalPageNum">已加载全部评论~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {computed, ref, provide} from "vue";
  import type {PropType} from "vue";
  import {useStore} from "vuex";
  import {useRoute, useRouter} from "vue-router";
  import type {momentListType} from "@/views/moment/types";
  import MomentItem from "../list/MomentItem.vue";
  import MomentReplyEditor from "@/views/moment/components/MomentReplyEditor.vue";
  import MomentCommentItem from "../components/MomentCommentItem.vue";
  import MomentEditor from "../components/MomentEditor.vue";

  const route = useRoute();
  const router = useRouter();
  const {dispatch} = useStore();

  const moment = ref<momentListType>(null);
  const MomentRef = ref<HTMLElement | null>(null);
  const loadMoreRef = ref<HTMLElement | null>(null);
  const commentList = ref([]);
  const sort = ref<boolean>(true); // true:最新 false:最热
  const order = computed(() => sort.value ? 'create_time' : 'support_count');
  const pageNum = ref<number>(1);
  const totalPageNum = ref<number>(1);
  const restLoading = ref<boolean>(false);
  const failed = ref<boolean>(false);
  const isEdit = ref<boolean>(false);

  provide('moment', {moment: moment, updateMomentAttribute});

  function updateMomentAttribute(name: string, value: any) {
    if (Reflect.has(moment, name)) {
      moment[name] = value;
    }
  }

  const getMomentDetail = () => {
    dispatch("getMoment", {momentId: route.params.momentId}).then(res => {
      moment.value = res.data;
      getCommentsPage();
    })
  }

  getMomentDetail();

  const getCommentsPage = () => {
    if (totalPageNum.value !== -1 && pageNum > totalPageNum || failed.value) return;
    restLoading.value = true;
    dispatch('listMomentCommentPage', {
      momentId: moment.value.id,
      pageSize: 10,
      pageNum: pageNum.value,
      orderBy: order.value
    }).then(res => {
      commentList.value.push(...res.data.list);
      totalPageNum.value = res.data.pages;
      pageNum.value++;
    }).catch(() => {
      failed.value = true;
    }).finally(() => {
      restLoading.value = false;
    })
  }

  const onMomentDeleteSuccess = () => {
    router.push("/moment/list");
  }

  const handleSort = (value: boolean) => {
    if (sort.value === value) return;
    sort.value = value;
    pageNum.value = 1;
    totalPageNum.value = 1;
    getCommentsPage();
  }

  const onRetry = () => {
    failed.value = false;
    getCommentsPage();
  }

  const onCommentDeleteSuccess = () => {

  }

  const onEdit = () => {
    isEdit.value = true;
  }

  const onUnlock = () => {
    const ob = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      getCommentsPage();
    });

    ob.observe(loadMoreRef.value);
  }

</script>

<style lang="scss" scoped>
  .moment-detail {
    display: flex;
    justify-content: center;


    .moment-detail-middle {
      width: 750px;

      .moment-detail-item {
        ::v-deep(.moment-item) {
          border-radius: 4px;

          .comment-operation {
            display: none;
          }
        }
      }

      .moment-comment-editor-wrapper {
        border-radius: 4px;
        padding: 16px 20px;
        background-color: var(--youyu-background1);

        .editor-title {
          font-size: 16px;
          font-weight: bold;
          padding-bottom: 12px;
        }
      }

      .moment-comment-list {
        background-color: var(--youyu-background1);
        border-top: 1px solid var(--youyu-border-color);
        padding: 8px 20px;
        border-radius: 4px;

        .comment-list-top {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .comment-count {
            font-size: 16px;
            font-weight: bold;
          }

          .sort-type {
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            color: #4e5969;
            font-weight: 400;
            cursor: pointer;
            background: var(--youyu-body-background-ligth);
            border-radius: 2px;
            padding: 3px;

            .sort-item {
              display: flex;
              align-items: center;
              padding: 2px 12px;
              line-height: 22px;
              font-size: 1.167rem;
              color: #8a919f;

              ::v-deep(svg) {
                margin-right: 4px;
              }
            }

            .active {
              color: #1890ff;
              border-radius: 2px;
              background: var(--youyu-body-background2);

              ::v-deep(svg) {
                margin-right: 4px;
              }
            }
          }
        }

        .comment-list {
          ::v-deep(.comment-item) {
            border-bottom: 1px solid var(--youyu-border-color);

            &:last-child {
              border-bottom: none;
            }
          }
        }

        .failed-box {
          padding: 6px 0;
          text-align: center;
          cursor: pointer;
        }

        .no-data {
          padding: 6px 0;
          text-align: center;
          cursor: pointer;
        }

        .comment-load-all {

          .more-btn {
            padding: 6px 0;
            cursor: pointer;
            text-align: center;
            color: #1890ff;

            &:hover {

            }
          }
        }

        .loaded-all {
          padding: 6px 0;
          text-align: center;
          color: var(--youyu-text2);
        }
      }
    }
  }
</style>
