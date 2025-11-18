<template>
  <div class="moment-comment mb-8">
    <div class="comment-list-top">
      <div class="comment-count">
        全部评论（{{ moment.commentCount || 0 }}）
      </div>
      <SortSwitch v-model="sort" @on-change="onSortChange" />
    </div>
    <div class="comment-list">
      <!-- @vue-generic {import('@youyu/shared/types/common').Comment} -->
      <vue-content-page
        ref="pageRootRef"
        :url="LIST_MOMENT_COMMENT_PAGE"
        :params="{
          momentId: moment.id,
          orderBy: order,
          pageSize: pageSize,
        }"
        unit-text="条"
        data-text="评论"
        mode="lazy"
      >
        <template v-if="noAction" #ready>
          <div class="ready-detail-content" @click.stop="onDetail">
            <span class="ready-text">
              查看全部
              <span class="remain-count">{{ moment.commentCount }}</span>
              条回复
            </span>
            <i-right theme="outline" size="16" fill="currentColor" />
          </div>
        </template>
        <template #default="{ list, removeById }">
          <vue-comment-item
            v-for="item in list"
            :key="item.id"
            :data="item"
            :data-author-id="moment.userId"
            :login-user-id="userInfo.id"
            :save-url="CREATE_MOMENT_COMMENT"
            :save-params="{
              momentId: moment.id,
              rootId: item.id,
            }"
            :remove-url="DELETE_MOMENT_COMMENT"
            :avatar="userInfo.avatar"
            :user-mode="isLogin"
            @on-save-success="data => onSaveCommentSuccess(data, item)"
            @on-remove-success="() => removeById(item.id)"
          >
            <template v-if="item.replyCount" #bottomReply>
              <div class="comment-replies">
                <vue-content-page
                  :ref="(el: any) => setItemRef(el, item.id)"
                  :preset-data="item.children ?? []"
                  :url="LIST_MOMENT_COMMENT_PAGE"
                  :params="{ rootId: item.id, pageSize: 5 }"
                  :total="item.replyCount"
                  hide-action-finish
                  mode="manual"
                  action-align="left"
                >
                  <template #ready="{ remainCount }">
                    <span class="ready-text">
                      剩下
                      <span class="remain-count">{{ remainCount }}</span>
                      条回复
                    </span>
                    <i-down theme="outline" size="16" fill="currentColor" />
                  </template>
                  <template #loading="{ remainCount }">
                    <span class="ready-text">
                      剩下
                      <span class="remain-count">{{ remainCount }}</span>
                      条回复
                    </span>
                    <i-loading-four theme="outline" size="14" fill="#1890ff" />
                  </template>
                  <template #default="{ list: replies, removeById: subRemoveById }">
                    <vue-comment-item
                      v-for="reply in replies"
                      :key="reply.id"
                      :data="reply"
                      :avatar="userInfo.avatar"
                      :avatar-size="32"
                      :data-author-id="moment.userId"
                      :login-user-id="userInfo.id"
                      :save-url="CREATE_MOMENT_COMMENT"
                      :save-params="{
                        momentId: moment.id,
                        replyId: reply.id,
                        rootId: item.id,
                      }"
                      :remove-url="DELETE_MOMENT_COMMENT"
                      :user-mode="isLogin"
                      @on-save-success="data => onSaveCommentSuccess(data, item)"
                      @on-remove-success="() => subRemoveById(reply.id)"
                    />
                  </template>
                </vue-content-page>
              </div>
            </template>
          </vue-comment-item>
        </template>
      </vue-content-page>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { CREATE_MOMENT_COMMENT, DELETE_MOMENT_COMMENT, LIST_MOMENT_COMMENT_PAGE } from '@youyu/shared/apis';
import { VueCommentItem, VueContentPage } from '@youyu/shared/components-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SortSwitch from '@/components/common/utils/sortSwitch/SortSwitch.vue';
import type { Comment } from '@youyu/shared/types/common';
import type { MomentVo } from '@youyu/shared/types/vo/moment';
import type { ComponentExposed } from 'vue-component-type-helpers';

const { getters } = useStore();
const router = useRouter();

defineProps({
  pageSize: {
    type: Number,
    default: 10,
  },
  noAction: {
    type: Boolean,
    default: false,
  },
});
const moment = defineModel<MomentVo>('moment', { required: true });
const pageRootRef = ref<ComponentExposed<typeof VueContentPage> | null>(null);
const pageLeafRefs = ref<Record<number, ComponentExposed<typeof VueContentPage>>>({});
const sort = ref<string>('new'); // true:最新 false:最热
const order = computed(() => (sort.value === 'new' ? 'create_time' : 'support_count'));
const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);

function setItemRef(el: ComponentExposed<typeof VueContentPage> | null, id: number) {
  if (el) {
    pageLeafRefs.value[id] = el;
  } else {
    delete pageLeafRefs.value[id]; // 组件销毁时清除
  }
}

/**
 * 保存评论成功
 * @param data 评论信息
 * @param rootComment 所属根评论
 */
const onSaveCommentSuccess = (data: Comment, rootComment?: Comment) => {
  moment.value.commentCount++;
  if (rootComment) {
    rootComment.replyCount += 1;
    nextTick(() => {
      pageLeafRefs.value[rootComment.id].unshiftData(data);
    });
  } else {
    pageRootRef.value!.unshiftData(data);
  }
};

/**
 * 排序查询
 */
function onSortChange() {
  pageRootRef.value!.refresh();
}

/**
 * 跳转到时刻详情页面
 */
function onDetail() {
  router.push(`/moment/details/${moment.value.id}`);
}

defineExpose({
  onSaveCommentSuccess,
});
</script>

<style scoped lang="scss">
.moment-comment {
  padding: 16px 30px 0;
  background-color: var(--youyu-background1);
  border-radius: 4px;

  .comment-list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .comment-count {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .comment-list {
    margin-top: 12px;

    .ready-detail-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
