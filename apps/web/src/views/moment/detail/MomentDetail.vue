<template>
  <div class="moment-detail mt-8">
    <div class="moment-detail-middle">
      <div v-if="moment">
        <div class="moment-detail-item">
          <MomentItem
            v-if="!isEdit"
            ref="MomentRef"
            :data="moment"
            :show-detail="false"
            @delete-success="onMomentDeleteSuccess"
            @on-comment-delete-success="onCommentDeleteSuccess"
            @on-edit="onEdit"
          />
          <MomentEditor
            v-else
            is-edit
            :form="formData"
            @save-success="saveSuccess"
          >
            <template #bottom>
              <a-button type="link" class="cancel-btn" @click="onEditCancel">
                取消
              </a-button>
            </template>
          </MomentEditor>
        </div>
        <div class="moment-comment-editor-wrapper mt-8">
          <div class="editor-title">
            评论
          </div>
          <MomentReplyEditor
            :params="replyParams"
            :placeholder="replyEditorPlaceholder"
            :auto-focus="false"
            @save-success="onSaveCommentSuccess"
          />
        </div>
        <div id="comment" class="moment-comment-list mt-8 mb-8">
          <div class="comment-list-top">
            <div class="comment-count">
              全部评论（{{ moment.commentCount || 0 }}）
            </div>
            <div class="sort-type">
              <div class="sort-item" :class="{ active: sort }" @click="handleSort(true)">
                <i-time theme="filled" size="13" fill="currentColor" />
                最新
              </div>
              <div class="sort-item" :class="{ active: !sort }" @click="handleSort(false)">
                <i-fire theme="filled" size="13" fill="currentColor" />
                最热
              </div>
            </div>
          </div>
          <div class="comment-list">
            <!-- @vue-generic {import('@youyu/shared/types/components-vue').Comment} -->
            <vue-content-page
              ref="ContentListRef"
              :url="LIST_MOMENT_COMMENT_PAGE"
              :params="listParams"
              unit-text="条"
              data-text="评论"
            >
              <template #default="{ list }">
                <VueCommentItem
                  v-for="item in list"
                  :key="item.id"
                  :data="item"
                  :data-author-id="moment.userId"
                  :login-user-id="userInfo.id"
                />
              </template>
            </vue-content-page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
import { LIST_MOMENT_COMMENT_PAGE } from '@youyu/shared/apis';
import { VueContentPage } from '@youyu/shared/components-vue';
import { VueCommentItem } from '@youyu/shared/components-vue';
import { cloneDeep } from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MomentReplyEditor from '@/views/moment/components/MomentReplyEditor.vue';
import { transformTagToHTML } from '../../../../../../packages/shared/components-vue/emoji/youyu_emoji';
import MomentEditor from '../components/MomentEditor.vue';
import MomentItem from '../list/MomentItem.vue';

const route = useRoute();
const router = useRouter();
const { getters, dispatch } = useStore();

const moment = ref<momentListType | null>(null);
const MomentRef = ref<HTMLElement | null>(null);
const sort = ref<boolean>(true); // true:最新 false:最热
const order = computed(() => (sort.value ? 'create_time' : 'support_count'));
const isEdit = ref<boolean>(route.query.type === 'edit');
const formData = ref({});
const userInfo = computed(() => getters['userInfo']);
const listParams = computed(() => ({
  momentId: moment.value.id,
  orderBy: order.value,
}));
const replyEditorPlaceholder = computed(() => (moment.value ? '回复@' + moment.value.user.nickname : null));
const replyParams = computed(() => {
  return {
    momentId: moment.value.id,
  };
});
const ContentListRef = ref<InstanceType<typeof ContentList> | null>(null);

const getMomentDetail = () => {
  dispatch('getMoment', { momentId: route.params.momentId }).then(res => {
    moment.value = res.data;
    if (isEdit.value) {
      onEdit();
    }
  });
};

getMomentDetail();

const onMomentDeleteSuccess = () => {
  router.push('/moment/list');
};

const handleSort = (value: boolean) => {
  if (sort.value === value) return;
  sort.value = value;
  nextTick(() => {
    ContentListRef.value.initData();
  });
};

const onCommentDeleteSuccess = comment => {
  ContentListRef.value.list = ContentListRef.value.list.filter(item => item.id !== comment.id);
};

const onSaveCommentSuccess = (data: momentListType) => {
  moment.value.commentCount++;
  ContentListRef.value.list.unshift(data);
};

const onEdit = () => {
  formData.value = cloneDeep(moment.value);
  formData.value.content = transformTagToHTML(formData.value.content);
  formData.value.images = formData.value.images ? formData.value.images.split(',') : [];
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
  .moment-detail-middle {
    width: 1000px;
    margin: 0 auto;

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
      padding: 16px 20px;
      background-color: var(--youyu-background1);
      border-radius: 4px;

      .editor-title {
        padding-bottom: 12px;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .moment-comment-list {
      padding: 8px 20px;
      background-color: var(--youyu-background1);
      border-top: 1px solid var(--youyu-border-color);
      border-radius: 4px;

      .comment-list-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 12px 0;

        .comment-count {
          font-size: 18px;
          font-weight: bold;
        }

        .sort-type {
          display: inline-flex;
          align-items: center;
          padding: 3px;
          font-size: 14px;
          font-weight: 400;
          color: #4e5969;
          background: var(--youyu-body-background-ligth);
          border-radius: 2px;
          cursor: pointer;

          .sort-item {
            display: flex;
            align-items: center;
            padding: 2px 12px;
            font-size: 14px;
            line-height: 22px;
            color: #8a919f;

            ::v-deep(svg) {
              margin-right: 4px;
            }
          }

          .active {
            color: #1890ff;
            background: var(--youyu-body-background2);
            border-radius: 2px;

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
      }
    }
  }
}
</style>
