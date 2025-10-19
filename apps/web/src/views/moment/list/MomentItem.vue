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
            <svg
              t="1729582073552"
              class="icon"
              viewBox="0 0 1109 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5152"
              width="16"
              height="16"
            >
              <path
                d="M483.84 560.298667c24.234667 24.149333 24.234667 60.330667 0 84.48s-66.304 30.122667-90.453333 5.973333a229.461333 229.461333 0 0 1 0-325.802667L634.88 83.626667c90.453333-90.538667 235.264-90.538667 325.802667 0s96.512 229.290667 5.973333 319.744l-72.362667 72.448c-24.149333 24.149333-60.330667 24.149333-90.453333-6.058667s-24.149333-60.330667 0-84.48l72.362667-72.362667c42.24-42.24 36.181333-108.629333 0-144.896S767.488 119.808 725.333333 162.133333L483.925333 403.370667a112.981333 112.981333 0 0 0 0 156.928z m90.624-90.538667c-24.149333-24.149333-24.149333-60.330667 5.973333-90.453333s60.330667-24.149333 84.48 0a229.461333 229.461333 0 0 1 0 325.802666L423.594667 946.346667c-90.453333 90.453333-241.408 96.597333-331.946667 5.973333s-84.48-241.322667 6.058667-331.776l72.448-72.448c24.149333-24.149333 66.389333-30.122667 90.453333-5.973333s18.176 66.304-5.973333 90.453333l-72.448 72.448c-42.24 42.24-42.24 114.602667 0 156.842667s108.629333 36.181333 150.869333-5.973334l241.408-241.408c42.154667-42.24 42.154667-102.570667 0-144.810666z"
                fill="#1890ff"
                p-id="5153"
              />
            </svg>
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
      <div class="item-operation comment-operation" :class="{ 'action-active': replyShow }" @click="onClickReply">
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
        <div class="user-avatar">
          <img v-if="isLogin" :src="userInfo.avatar" :alt="userInfo.nickname + '的头像'">
          <img
            v-else
            alt="默认头像"
            src="https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default_avatar.png"
          >
        </div>
        <div class="reply-box-wrapper">
          <MomentReplyEditor
            :params="replyParams"
            :placeholder="replyEditorPlaceholder"
            @save-success="onCommentSuccess"
          />
        </div>
      </div>
      <div class="moment-comment-list">
        <div class="comment-list-top">
          <div class="comment-count">
            全部评论（{{ data.commentCount || 0 }}）
          </div>
          <SortSwitch v-model="sort" @on-change="onChange" />
        </div>
        <div class="comment-list">
          <ContentData
            v-slot="{ data }"
            ref="ContentDataRef"
            url="listMomentCommentPage"
            :params="listParams"
          >
            <VueCommentItem
              v-for="item in data?.list"
              :key="item.id"
              :data="item"
              :moment="props.data"
              class="comment-item"
              @delete-success="deleteSuccess"
            />
            <div v-if="data?.pages > 1" class="comment-load-all">
              <div class="more-btn" @click="onDetail">
                查看全部
                <span class="comment-count">{{ props.data.commentCount }}</span>
                条评论
              </div>
            </div>
          </ContentData>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import type { PropType } from 'vue';
import { ImagePreviewEmbed } from '@youyu/shared/components-vue';
import { VueCommentItem } from '@youyu/shared/components-vue';
import { message, Modal } from 'ant-design-vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { copyToClipboard } from '@/assets/utils/utils';
import ContentData from '@/components/common/system/ContentData.vue';
import LocationPreview from '@/components/common/utils/aMap/LocationPreview.vue';
import SortSwitch from '@/components/common/utils/sortSwitch/SortSwitch.vue';
import { DOMAIN } from '@/libs/consts';
import openModal from '@/libs/tools/openModal';
import MomentReplyEditor from '@/views/moment/components/MomentReplyEditor.vue';
import type { momentListType } from '@/views/moment/types';
import { transformTagToHTML } from '../../../../../../packages/shared/components-vue/emoji/youyu_emoji';
import UserCardMoment from '../components/UserCardMoment.vue';

const { getters, dispatch } = useStore();

const route = useRoute();
const router = useRouter();

const props = defineProps({
  data: {
    type: Object as PropType<momentListType>,
    required: true,
  },
  showDetail: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['deleteSuccess', 'onEdit', 'onCommentSaveSuccess', 'onCommentDeleteSuccess']);

const preview = ref(false);
const current = ref(0);
const row = ref<number>(0);
const expand = ref<boolean>(false);
const replyShow = ref<boolean>(false);
const commentListShowVisibleIf = ref<boolean>(false);
const commentListShowVisibleShow = ref<boolean>(false);
const visible = ref<boolean>(false);
const sort = ref<string>('new'); // true:最新 false:最热
const likeLoading = ref<boolean>(false);
const order = computed(() => (sort.value === 'new' ? 'create_time' : 'support_count'));
const images = computed(() => {
  return props.data.images ? props.data.images.split(',') : [];
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
const likeActive = computed(() => props.data.momentLike);
const listParams = computed(() => ({
  momentId: props.data.id,
  pageSize: 5,
  orderBy: order.value,
}));
const replyEditorPlaceholder = computed(() => (props.data ? '回复@' + props.data.user.nickname : ''));
const replyParams = computed(() => {
  return {
    momentId: props.data.id,
    userIdTo: props.data.userId,
  };
});
const ContentDataRef = ref<InstanceType<typeof ContentData> | null>(null);
const isOwn = computed(() => props.data.user.id === userInfo.value.id);

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

const onCommentSuccess = (data: object) => {
  ContentDataRef.value?.data.list.unshift(data);
  props.data.commentCount += 1;
};

const onClickReply = () => {
  replyShow.value = commentListShowVisibleShow.value = !replyShow.value;
  if (replyShow.value) {
    commentListShowVisibleIf.value = true;
  }
};

const deleteSuccess = (comment: any) => {
  if (ContentDataRef.value) {
    ContentDataRef.value.data.list = ContentDataRef.value.data.list.filter((item: any) => item.id !== comment.id);
  }
  props.data.commentCount -= 1 + comment.replyCount;
  emit('onCommentDeleteSuccess', comment);
};

const onChange = (value: boolean) => {
  nextTick(() => ContentDataRef.value?.initData());
};

const onDetail = () => {
  router.push(`/moment/details/${props.data.id}`);
};

const onDelete = () => {
  visible.value = false;
  Modal.confirm({
    title: '删除时刻',
    icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
    content: '确定删除这条时刻吗？',
    onOk() {
      return dispatch('deleteMoment', {
        momentId: props.data.id,
      })
        .then(res => {
          message.success('删除成功');
          emit('deleteSuccess', props.data);
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
      params: { momentId: props.data.id },
      query: { type: 'edit' },
    });
  }
};

const onLike = () => {
  if (likeLoading.value) return;
  likeLoading.value = true;
  const isLike = !!props.data.momentLike;
  dispatch(isLike ? 'cancelMomentLike' : 'setMomentLike', {
    momentId: props.data.id,
    userId: userInfo.value.id,
    userIdTo: props.data.userId,
  })
    .then(res => {
      if (isLike) {
        props.data.momentLike = null;
        props.data.supportCount -= 1;
        props.data.likeUsers = props.data.likeUsers.filter(item => item.id !== userInfo.value.id);
      } else {
        props.data.momentLike = res.data;
        props.data.supportCount += 1;
        if (!props.data.likeUsers) {
          props.data.likeUsers = [];
        }
        props.data.likeUsers.unshift(userInfo.value);
      }
    })
    .finally(() => {
      likeLoading.value = false;
    });
};

const onUserVisibleChange = (visible: boolean) => {
  if (visible) {
    dispatch('getMomentUserDetail', { userId: props.data.userId }).then(res => {
      props.data.user = res.data;
    });
  }
};

const onLocationPreview = () => {
  const location = {
    longitude: props.data.longitude,
    latitude: props.data.latitude,
    name: props.data.location,
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
  copyToClipboard(DOMAIN + '/moment/details/' + props.data.id);
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
      padding: 16px 0;
      margin: 0 24px;
      border-top: 1px solid var(--youyu-border-color3);

      .user-avatar {
        width: 36px;
        height: 36px;
        margin: 0 12px 0 4px;
        overflow: hidden;
        border: var(--youyu-avatar-border);
        border-radius: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .reply-box-wrapper {
        flex: 1;
        overflow: hidden;
      }

      ::v-deep(.editable-div) {
        border: 1px solid transparent;
        border-radius: 2px;
        transition: 0.3s;

        #box {
          padding: 6px 12px;
        }
      }
    }

    .moment-comment-list {
      padding: 8px 24px;
      border-top: 1px solid var(--youyu-border-color);

      .comment-list-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;

        .comment-count {
          font-size: 16px;
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
        ::v-deep(.content-data) {
          .comment-item {
            padding: 8px 0;

            &:last-child {
              border-bottom: none !important;
            }
          }
        }
      }

      .comment-load-all {
        .more-btn {
          padding: 10px 0 4px;
          text-align: center;
          cursor: pointer;

          .comment-count {
            color: #1890ff;
          }
        }
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
