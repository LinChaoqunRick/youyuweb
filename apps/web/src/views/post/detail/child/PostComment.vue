<template>
  <div class="post-comment">
    <div class="comment-list-top">
      <div class="comment-count">
        全部评论（{{ post.commentCount || 0 }}）
      </div>
      <SortSwitch v-model="sort" @on-change="onSortChange" />
    </div>
    <div class="comment-list">
      <!-- @vue-generic {import('@youyu/shared/types/common').Comment} -->
      <vue-content-page
        ref="pageRootRef"
        :url="GET_POST_COMMENTS_PAGE"
        :params="{
          postId: post.id,
          orderBy: order,
          pageSize: pageSize,
        }"
        unit-text="条"
        data-text="评论"
        mode="lazy"
      >
        <template #default="{ list, removeById }">
          <vue-comment-item
            v-for="item in list"
            :key="item.id"
            :data="item"
            :data-author-id="post.userId"
            :login-user-id="userInfo.id"
            :save-url="CREATE_POST_COMMENT"
            :save-params="{
              postId: post.id,
              rootId: item.id,
            }"
            :remove-url="DELETE_POST_COMMENT"
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
                  :url="GET_POST_COMMENTS_PAGE"
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
                      :data-author-id="post.userId"
                      :login-user-id="userInfo.id"
                      :save-url="CREATE_POST_COMMENT"
                      :save-params="{
                        postId: post.id,
                        replyId: reply.id,
                        rootId: item.id,
                      }"
                      :remove-url="DELETE_POST_COMMENT"
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
import { CREATE_POST_COMMENT, DELETE_POST_COMMENT, GET_POST_COMMENTS_PAGE } from '@youyu/shared/apis';
import { VueCommentItem, VueContentPage } from '@youyu/shared/components-vue';
import { useStore } from 'vuex';
import SortSwitch from '@/components/common/utils/sortSwitch/SortSwitch.vue';
import type { Comment } from '@youyu/shared/types/common';
import type { PostVo } from '@youyu/shared/types/vo';
import type { ComponentExposed } from 'vue-component-type-helpers';

const { getters } = useStore();

defineProps({
  pageSize: {
    type: Number,
    default: 10,
  },
});
const post = defineModel<PostVo>('post', { required: true });
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
  post.value.commentCount++;
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

defineExpose({
  onSaveCommentSuccess,
});
</script>

<style scoped lang="scss">
.post-comment {
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
