<template>
  <div class="moment-detail mt-8">
    <div class="moment-detail-middle">
      <div v-if="moment">
        <div class="moment-detail-item">
          <MomentItem
            v-if="!isEdit"
            :data="moment"
            @deleteSuccess="onMomentDeleteSuccess"
            @onCommentDeleteSuccess="onCommentDeleteSuccess"
            @saveSuccess="onSaveCommentSuccess"
            @onEdit="onEdit"
            ref="MomentRef"
          />
          <MomentEditor
            v-else
            isEdit
            :form="formData"
            @saveSuccess="saveSuccess"
            ref="MomentEditor"
          >
            <template v-slot:bottom>
              <a-button type="link" class="cancel-btn" @click="onEditCancel"
                >取消
              </a-button>
            </template>
          </MomentEditor>
        </div>
        <div class="moment-comment-editor-wrapper mt-8">
          <div class="editor-title">评论</div>
          <MomentReplyEditor @onSubmit="MomentRef?.onCommentSubmit" />
        </div>
        <div class="moment-comment-list mt-8 mb-8">
          <div class="comment-list-top">
            <div class="comment-count">
              全部评论（{{ moment.commentCount || 0 }}）
            </div>
            <div class="sort-type">
              <div
                class="sort-item"
                :class="{ active: sort }"
                @click="handleSort(true)"
              >
                <i-time theme="filled" size="13" fill="currentColor" />
                最新
              </div>
              <div
                class="sort-item"
                :class="{ active: !sort }"
                @click="handleSort(false)"
              >
                <i-fire theme="filled" size="13" fill="currentColor" />
                最热
              </div>
            </div>
          </div>
          <div class="comment-list">
            <ContentList
              url="listMomentCommentPage"
              :params="listParams"
              auto-load
              load-trigger
              ref="ContentListRef"
            >
              <template v-slot="{ list }">
                <MomentCommentItem
                  v-for="item in list"
                  :key="item.id"
                  class="comment-item"
                  :data="item"
                  :moment="moment"
                  @deleteSuccess="MomentRef?.deleteSuccess"
                />
              </template>
              <template #loadMoreBox="{ loading, total }">
                <span class="mr-8"
                  >查看全部
                  <span class="comment-count">{{
                    moment.commentCount ?? total
                  }}</span>
                  条评论</span
                >
                <i-down
                  v-if="!loading"
                  theme="outline"
                  size="14"
                  fill="#1890ff"
                />
                <i-loading-four
                  v-else
                  theme="outline"
                  size="14"
                  fill="#1890ff"
                />
              </template>
            </ContentList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MomentDetail",
};
</script>

<script lang="ts" setup>
import { computed, ref, nextTick } from "vue";
import type { PropType } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { cloneDeep } from "lodash";
import type { momentListType } from "@/views/moment/types";
import MomentItem from "../list/MomentItem.vue";
import MomentReplyEditor from "@/views/moment/components/MomentReplyEditor.vue";
import MomentCommentItem from "../components/MomentCommentItem.vue";
import MomentEditor from "../components/MomentEditor.vue";
import ContentList from "@/components/common/system/ContentList.vue";

const route = useRoute();
const router = useRouter();
const { dispatch } = useStore();

const moment = ref<momentListType | null>(null);
const MomentRef = ref<HTMLElement | null>(null);
const sort = ref<boolean>(true); // true:最新 false:最热
const order = computed(() => (sort.value ? "create_time" : "support_count"));
const isEdit = ref<boolean>(route.query.type === "edit");
const formData = ref({});
const listParams = computed(() => ({
  momentId: moment.value.id,
  orderBy: order.value,
}));
const ContentListRef = ref<InstanceType<typeof ContentList> | null>(null);

const getMomentDetail = () => {
  dispatch("getMoment", { momentId: route.params.momentId }).then((res) => {
    moment.value = res.data;
    if (isEdit.value) {
      onEdit();
    }
  });
};

getMomentDetail();

const onMomentDeleteSuccess = () => {
  router.push("/moment/list");
};

const handleSort = (value: boolean) => {
  if (sort.value === value) return;
  sort.value = value;
  nextTick(() => {
    ContentListRef.value.initData();
  });
};

const onCommentDeleteSuccess = (comment) => {
  ContentListRef.value.list = ContentListRef.value.list.filter(
    (item) => item.id !== comment.id
  );
};

const onSaveCommentSuccess = (data: momentListType) => {
  ContentListRef.value.list.unshift(data);
};

const onEdit = () => {
  formData.value = cloneDeep(moment.value);
  formData.value.images = formData.value.images
    ? formData.value.images.split(",")
    : [];
  isEdit.value = true;
};

const onEditCancel = () => {
  isEdit.value = false;
};

const saveSuccess = (data: momentListType) => {
  moment.value = data;
  isEdit.value = false;
};
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

      .cancel-btn {
        position: absolute;
        right: 70px;
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
        span {
          color: #1890ff;
        }

        ::v-deep(.content-list) {
          .comment-item {
            padding: 8px 0;
            border-bottom: 1px solid var(--youyu-border-color);

            &:last-child {
              border-bottom: none !important;
              padding-bottom: 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
