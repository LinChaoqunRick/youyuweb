<template>
  <div class="moment-item">
    <div class="moment-item-content">
      <div class="content-top">
        <a-popover
          overlay-class-name="user-info-moment-popover"
          placement="top"
          :mouse-enter-delay="0.6"
          :mouse-leave-delay="0.3"
          @visible-change="onUserVisibleChange"
        >
          <template #content>
            <UserCardMoment overlay-class-name="user-info-moment-popover" :user="data.user" />
          </template>
          <div class="user-avatar cp">
            <RouterLink :to="`/user/${data.user.id}/moment`">
              <img :src="data.user.avatar" alt="">
            </RouterLink>
          </div>
        </a-popover>
        <div class="user-nickname-time">
          <a-popover
            overlay-class-name="user-info-moment-popover"
            placement="top"
            :mouse-enter-delay="0.6"
            :mouse-leave-delay="0.3"
            @visible-change="onUserVisibleChange"
          >
            <template #content>
              <UserCardMoment overlay-class-name="user-info-moment-popover" :user="data.user" />
            </template>
            <RouterLink :to="`/user/${data.user.id}/moment`">
              <div class="user-nickname">
                {{ data.user.nickname }}
              </div>
            </RouterLink>
          </a-popover>
          <div class="info-data">
            <div class="publish-time" :title="data.createTime">
              {{ $dayjs().to(data.createTime) }}
            </div>
            <div v-if="data.adname" class="adname">
              ・{{ data.adname }}
            </div>
          </div>
        </div>
        <a-popover
          v-model:open="visible"
          placement="bottomRight"
          overlay-class-name="moment-item-top-popover"
          :get-popup-container="triggerNode => triggerNode.parentNode"
        >
          <template #content>
            <div class="operation-items">
              <div v-if="isOwn" class="operation-item delete-moment" @click="onDelete">
                <i-delete theme="outline" size="14" fill="currentColor" />
                删除
              </div>
              <div v-if="isOwn" class="operation-item edit-moment" @click="onEdit">
                <i-editor theme="outline" size="14" fill="currentColor" />
                编辑
              </div>
              <div v-if="showDetail" class="operation-item" @click="onDetail">
                <i-doc-detail theme="outline" size="14" fill="currentColor" />
                详情
              </div>
            </div>
          </template>
          <div v-if="isOwn || showDetail" class="content-top-operation">
            <i-more-one theme="outline" size="22" fill="currentColor" />
          </div>
        </a-popover>
      </div>
      <div class="content-body">
        <div
          v-row="{ set: set }"
          class="content-text"
          :class="{ 'content-expand': expand }"
          v-html="transformTagToHTML(data.content)"
        />
        <div v-show="row > 10 && !expand" class="limit-btn" @click="expand = true">
          展开
        </div>
        <div v-show="row > 10 && expand" class="limit-btn" @click="expand = false">
          收起
        </div>
        <div v-if="images?.length && !preview" class="content-images" :class="[imageClass]">
          <img
            v-for="(item, index) in images"
            :key="index"
            :src="item"
            alt=""
            @click="onPreview(index)"
          >
        </div>
        <div v-if="images?.length && preview" class="content-image-preview">
          <ImagePreviewEmbed :list="images" :current="current" @on-close="onClose" />
        </div>
      </div>
      <div class="content-bottom">
        <div v-if="data?.location" class="location-data" @click="onLocationPreview">
          <div class="icon-wrapper">
            <i-local-two theme="multi-color" size="12" :fill="['#ffffff', '#ffffff', '#3b8fff', '#3b8fff']" />
          </div>
          <span class="position-text">{{ data?.location }}</span>
        </div>
        <div v-if="data.likeUsers?.length" class="like-users">
          <div class="user-avatars">
            <img
              v-for="(item, index) in data.likeUsers"
              :key="item.id"
              :src="item.avatar"
              :style="{ 'z-index': index }"
            >
          </div>
          <div class="like-text">
            <span v-if="data.supportCount > 3">等人</span>赞过
          </div>
        </div>
      </div>
    </div>
    <div class="moment-item-actions">
      <a-popover trigger="click" overlay-class-name="share-actions-popover">
        <template #content>
          <div class="share-action-item copy-link" @click="onCopyLink">
            <div class="share-action-item-text">
              复制链接
            </div>
          </div>
        </template>
        <div class="item-operation">
          <div class="item-icon">
            <i-share-one theme="outline" size="14" fill="currentColor" />
          </div>
          <div class="item-text">
            分享
          </div>
        </div>
      </a-popover>
      <div class="item-operation comment-operation" :class="{ 'action-active': replyShow }" @click="onComment">
        <div v-if="replyShow" class="pointer-arrow" />
        <div class="item-icon">
          <i-comment :theme="replyShow ? 'filled' : 'outline'" size="14" fill="currentColor" />
        </div>
        <div class="item-text">
          {{ data.commentCount || '评论' }}
        </div>
      </div>
      <div v-login="onLike" class="item-operation" :class="{ 'like-active': likeActive }">
        <div class="item-icon">
          <i-good-two :theme="likeActive ? 'filled' : 'outline'" size="14" fill="currentColor" />
        </div>
        <div class="item-text">
          {{ data.supportCount || '点赞' }}
        </div>
      </div>
    </div>
    <div v-if="commentListShowVisibleIf" v-show="commentListShowVisibleShow" class="moment-item-bottom">
      <div class="moment-comment-editor">
        <div class="reply-box-wrapper">
          <vue-comment-editor
            :auto-focus="false"
            :save-url="CREATE_MOMENT_COMMENT"
            :save-params="{
              momentId: data.id,
            }"
            :avatar="userInfo.avatar"
            :user-mode="isLogin"
            :on-success="onCommentSuccess"
          />
        </div>
      </div>
      <moment-comment
        ref="momentCommentRef"
        v-model:moment="data"
        :page-size="5"
        no-action
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CREATE_MOMENT_COMMENT } from '@youyu/shared/apis';
import { ImagePreviewEmbed } from '@youyu/shared/components-vue';
import { VueCommentEditor } from '@youyu/shared/components-vue';
import { transformTagToHTML } from '@youyu/shared/components-vue/emoji/youyu_emoji';
import { message, Modal } from 'ant-design-vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { copyToClipboard } from '@/assets/utils/utils';
import LocationPreview from '@/components/common/utils/aMap/LocationPreview.vue';
import { DOMAIN } from '@/libs/consts';
import openModal from '@/libs/tools/openModal';
import MomentComment from '@/views/moment/components/MomentComment.vue';
import UserCardMoment from '../components/UserCardMoment.vue';
import type { Comment } from '@youyu/shared/types/common';
import type { MomentVo } from '@youyu/shared/types/vo/moment';

const { getters, dispatch } = useStore();

const route = useRoute();
const router = useRouter();

const data = defineModel<MomentVo>('data', { required: true });

defineProps({
  showDetail: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['deleteSuccess', 'onEdit', 'onCommentSaveSuccess', 'onCommentDeleteSuccess']);

const momentCommentRef = ref<InstanceType<typeof MomentComment>>();
const preview = ref(false);
const current = ref(0);
const row = ref<number>(0);
const expand = ref<boolean>(false);
const replyShow = ref<boolean>(false);
const commentListShowVisibleIf = ref<boolean>(false);
const commentListShowVisibleShow = ref<boolean>(false);
const visible = ref<boolean>(false);
const likeLoading = ref<boolean>(false);
const images = computed(() => {
  return data.value.images ? data.value.images.split(',') : [];
});
const imageClass = computed(() => {
  const imageLength = images.value?.length ?? 0;
  if (imageLength >= 5 || imageLength === 3) {
    return 'col-3';
  } else if (imageLength >= 2) {
    return 'col-2';
  } else {
    return 'col-1';
  }
});
const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);
const likeActive = computed(() => data.value.momentLike);
const isOwn = computed(() => data.value.user.id === userInfo.value.id);

function set(value: number) {
  row.value = value;
}

const onPreview = (index: number) => {
  preview.value = true;
  current.value = index;
};
const onClose = () => {
  preview.value = false;
};

const onCommentSuccess = (data: Comment) => {
  momentCommentRef.value?.onSaveCommentSuccess(data);
};

const onComment = () => {
  replyShow.value = commentListShowVisibleShow.value = !replyShow.value;
  if (replyShow.value) {
    commentListShowVisibleIf.value = true;
  }
};

const deleteSuccess = (comment: any) => {
  if (ContentDataRef.value) {
    ContentDataRef.value.data.list = ContentDataRef.value.data.list.filter((item: any) => item.id !== comment.id);
  }
  data.value.commentCount -= 1 + comment.replyCount;
  emit('onCommentDeleteSuccess', comment);
};

const onDetail = () => {
  router.push(`/moment/details/${data.value.id}`);
};

const onDelete = () => {
  visible.value = false;
  Modal.confirm({
    title: '删除时刻',
    icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
    content: '确定删除这条时刻吗？',
    onOk() {
      return dispatch('deleteMoment', {
        momentId: data.value.id,
      })
        .then(res => {
          message.success('删除成功');
          emit('deleteSuccess', data.value);
        })
        .catch(console.log);
    },
  });
};

const onEdit = () => {
  if (route.name === 'MomentDetail') {
    emit('onEdit');
  } else {
    router.push({
      name: 'MomentDetail',
      params: { momentId: data.value.id },
      query: { type: 'edit' },
    });
  }
};

const onLike = () => {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = !!data.value.momentLike;
  dispatch(isLike ? 'cancelMomentLike' : 'setMomentLike', {
    momentId: data.value.id,
    userId: userInfo.value.id,
    userIdTo: data.value.userId,
  })
    .then(res => {
      if (isLike) {
        data.value.momentLike = false;
        data.value.supportCount -= 1;
        data.value.likeUsers = data.value.likeUsers.filter(item => item.id !== userInfo.value.id);
      } else {
        data.value.momentLike = res.data;
        data.value.supportCount += 1;
        if (!data.value.likeUsers) {
          data.value.likeUsers = [];
        }
        data.value.likeUsers.unshift(userInfo.value);
      }
    })
    .finally(() => {
      likeLoading.value = false;
    });
};

const onUserVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', { userId: data.value.userId }).then(res => {
      data.value.user = res.data;
    });
  }
};

const onLocationPreview = () => {
  const location = {
    longitude: data.value.longitude,
    latitude: data.value.latitude,
    name: data.value.location,
  };
  openModal({
    component: LocationPreview,
    componentProps: {
      data: location,
    },
    title: `位置详情`,
    width: '80vw',
    maskClosable: false,
    keyboard: false,
    centered: true,
    wrapClassName: 'select-position-modal-wrapper',
  });
};

const onCopyLink = () => {
  copyToClipboard(DOMAIN + '/moment/details/' + data.value.id);
};

defineExpose({
  // onCommentSubmit,
  deleteSuccess,
});
</script>

<style lang="scss" scoped>
.moment-item {
  margin-bottom: 8px;
  background-color: var(--youyu-body-background2);
  border-radius: 4px;

  .moment-item-content {
    padding: 16px 16px 10px;

    .content-top {
      display: flex;
      align-items: center;

      .user-avatar {
        width: 42px;
        height: 42px;
        overflow: hidden;
        border: var(--youyu-avatar-border);
        border-radius: 50%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-nickname-time {
        margin-left: 8px;

        a {
          color: inherit !important;
        }

        .user-nickname {
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        .info-data {
          display: flex;
          align-items: center;
          margin-top: 1px;
          font-size: 12px;
          color: #909090;
        }
      }

      .content-top-operation {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        margin-left: auto;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: var(--youyu-background2);

          ::v-deep(.i-icon) {
            color: #1890ff;
            transition: 0.3s;
          }
        }

        ::v-deep(.i-icon) {
          color: var(--youyu-text1);
        }
      }
    }

    .content-body {
      margin-left: 50px;

      a {
        font-weight: inherit !important;
        color: inherit !important;
      }

      ::v-deep(.content-text) {
        max-height: 18rem;
        margin: 4px 0;
        overflow: hidden;
        line-height: 1.8rem;
        white-space: pre-wrap;

        &.content-expand {
          max-height: none !important;
        }

        img {
          width: auto;
          height: 20px;
          margin: 0 2px;
          vertical-align: sub;
        }
      }

      .content-images {
        display: grid;

        &.col-3 {
          grid-template-columns: repeat(3, 134px);
        }

        &.col-2 {
          grid-template-columns: repeat(2, 134px);
        }

        &.col-1 {
          img {
            width: 180px;
            height: 180px;
          }
        }

        img {
          width: 130px;
          height: 130px;
          margin: 0 4px 4px 0;
          object-fit: cover;
          filter: brightness(0.94);
          cursor: zoom-in;
        }
      }

      .limit-btn {
        position: relative;
        top: -4px;
        margin-right: 20px;
        font-size: 14px;
        line-height: 22px;
        color: #1e80ff;
        cursor: pointer;
      }
    }

    .content-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 45px;

      .location-data {
        display: flex;
        align-items: center;
        height: 24px;
        padding: 1px 4px;
        margin-top: 4px;
        border: 1.8px solid var(--youyu-border-color2);
        border-radius: 30px;
        cursor: pointer;

        .icon-wrapper {
          display: flex;
          padding: 2px;
          line-height: 0;
          background-color: #3b8fff;
          border-radius: 50%;
        }

        .position-text {
          padding: 0 2px 0 4px;
          font-size: 12px;
          color: var(--youyu-text3);
        }

        .i-icon-triangle {
          color: #1890ff;
          transform: rotate(90deg);
        }
      }

      .like-users {
        display: flex;
        align-items: center;
        height: 26px;
        margin-top: 4px;
        margin-left: auto;
        cursor: pointer;

        .user-avatars {
          display: flex;
          flex-direction: row-reverse;
          margin-right: 10px;

          img {
            position: relative;
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: -6px;
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            border: 2px solid #fff;
            border-radius: 50%;
          }
        }

        .like-text {
          color: var(--youyu-text1);
        }
      }
    }
  }

  .moment-item-actions {
    display: flex;
    border-top: 1px solid var(--youyu-border-color3);

    .item-operation {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-size: 13px;
      color: var(--youyu-text1);
      cursor: pointer;
      user-select: none;

      &.action-active {
        color: #1890ff;
        background-color: var(--youyu-background4);
      }

      &.like-active {
        color: #1890ff;
      }

      &:hover {
        background-color: var(--youyu-background4);
      }

      &:nth-child(n + 2) {
        border-left: 1px solid var(--youyu-border-color3);
      }

      .item-text {
        margin-left: 6px;
      }

      .i-icon {
        position: relative;
        top: 1px;
      }

      .pointer-arrow {
        position: absolute;
        bottom: -6px;
        left: 50%;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: -6px 0 0 -6px;
        background-color: var(--youyu-background1);
        border-top: 1px solid var(--youyu-border-color3);
        border-left: 1px solid var(--youyu-border-color3);
        pointer-events: none;
        transform: rotate(45deg);
      }
    }
  }

  .moment-item-bottom {
    .moment-comment-editor {
      display: flex;
      align-items: flex-start;
      padding: 12px 0;
      margin: 0 24px;
      border-top: 1px solid var(--youyu-border-color3);
      border-bottom: 1px solid var(--youyu-border-color3);

      .reply-box-wrapper {
        flex: 1;
      }
    }
  }
}
</style>

<style lang="scss">
.moment-item-top-popover {
  padding-top: 4px;

  .ant-popover-inner {
    padding: 0;

    .ant-popover-inner-content {
      padding: 6px !important;

      .operation-items {
        .operation-item {
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: var(--youyu-background2);
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        .delete-moment {
          color: #fc2a2a;
        }

        .edit-moment {
          color: #1890ff;
        }
      }
    }
  }
}

.share-actions-popover {
  .share-action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 24px;
    color: var(--youyu-text2);
    cursor: pointer;

    &-text {
      margin-left: 6px;
    }
  }
}
</style>
