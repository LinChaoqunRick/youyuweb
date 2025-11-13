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
        <div class="moment-comment-editor-wrapper mt-8 mb-8">
          <div class="editor-title">
            评论
          </div>
          <vue-comment-editor
            :auto-focus="false"
            :save-url="CREATE_MOMENT_COMMENT"
            :save-params="{
              momentId: moment.id,
            }"
            :avatar="userInfo.avatar"
            :user-mode="isLogin"
            :on-success="onSaveCommentSuccess"
          />
        </div>
        <moment-comment ref="momentCommentRef" v-model:moment="moment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { CREATE_MOMENT_COMMENT } from '@youyu/shared/apis';
import { VueCommentEditor } from '@youyu/shared/components-vue';
import { transformTagToHTML } from '@youyu/shared/components-vue/emoji/youyu_emoji';
import { cloneDeep } from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MomentComment from '@/views/moment/components/MomentComment.vue';
import MomentEditor from '../components/MomentEditor.vue';
import MomentItem from '../list/MomentItem.vue';
import type { Comment } from '@youyu/shared/types/common';
import type { MomentVo } from '@youyu/shared/types/vo/moment';

const route = useRoute();
const router = useRouter();
const { getters, dispatch } = useStore();

const moment = ref<MomentVo | null>(null);
const MomentRef = ref<HTMLElement | null>(null);
const isEdit = ref<boolean>(route.query.type === 'edit');
const formData = ref<Partial<MomentVo>>({});
const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);
const momentCommentRef = ref<InstanceType<typeof MomentComment>>();

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

/**
 * 保存评论成功
 * @param data 评论信息
 */
const onSaveCommentSuccess = (data: Comment) => {
  momentCommentRef.value!.onSaveCommentSuccess(data);
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

const saveSuccess = (data: MomentVo) => {
  moment.value = data;
  isEdit.value = false;
};
</script>

<style lang="scss" scoped>
.moment-detail {
  .moment-detail-middle {
    width: 850px;
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

      ::v-deep(.vue-comment-editor) {
        padding: 0;
        background: none;
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
