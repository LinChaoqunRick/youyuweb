<template>
  <div class="moment-comment-item" v-on-click-outside="onClickOutside">
    <div class="moment-comment-detail">
      <div class="user-avatar">
        <a-popover placement="top"
                   :mouseEnterDelay="0.6"
                   :mouseLeaveDelay="0.3"
                   @visibleChange="onUserVisibleChange">
          <template #content>
            <UserCardMoment :user="data.user"/>
          </template>
          <RouterLink :to="{name:'userHome', params: {userId: data.user.id}}">
            <img :src="data.user.avatar"/>
          </RouterLink>
        </a-popover>
      </div>
      <div class="comment-right">
        <div class="comment-right-top">
          <div class="user-nickname">
            <a-popover placement="top"
                       :mouseEnterDelay="0.6"
                       :mouseLeaveDelay="0.3"
                       @visibleChange="onUserVisibleChange">
              <template #content>
                <UserCardMoment :user="data.user"/>
              </template>
              <RouterLink :to="{name:'userHome', params: {userId: data.user.id}}">
                <span>{{ data.user.nickname }}</span>
              </RouterLink>
            </a-popover>
            <div class="author-text" v-if="data.user.id === moment.userId">作者</div>
          </div>
          <div class="publish-time" :title="data.createTime">{{ $dayjs().to(data.createTime) }}</div>
        </div>
        <div class="comment-content" :class="{'content-expand': expand}"
             v-row="{set: set}"
             v-html="transformTagToHTML(data.content)"></div>
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="content-images" v-if="images?.length && !preview">
          <img :src="item" v-for="(item, index) in images" @click="onPreview(index)"/>
        </div>
        <div class="content-image-preview" v-if="images?.length && preview">
          <ImagePreviewEmbed :list="images" :current="current" @onClose="onClose"/>
        </div>
        <div class="comment-operation">
          <div class="ope-item" :class="{'ope-active': data.commentLike}" v-login="onLike">
            <i-good-two :theme="data.commentLike?'filled':'outline'" size="14" fill="currentColor"/>
            点赞<span v-if="data.supportCount">({{ data.supportCount }})</span>
          </div>
          <div class="ope-item" :class="{'ope-active': active}" @click="onReply">
            <i-comment :theme="active?'filled':'outline'" size="14" fill="currentColor"/>
            {{ active ? '取消回复' : '回复' }}<span v-if="data.replyCount && !active">({{ data.replyCount }})</span>
          </div>
          <a-popconfirm
            v-model:visible="deleteVisible"
            title="确认删除此评论?"
            ok-text="是"
            cancel-text="否"
            @confirm="onConfirmDelete">
            <div class="ope-item delete-ope" :class="{'visible': deleteVisible}" v-if="showDelete"
                 @click="onDelete">
              删除
            </div>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div v-if="active" class="moment-reply">
      <div class="user-avatar">
        <img v-if="isLogin" :src="userInfo.avatar"/>
        <img v-else src="https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default_avatar.png"/>
      </div>
      <div class="reply-box-wrapper">
        <MomentReplyEditor @onSubmit="onSubmit" ref="MomentReplyEditorRef"/>
      </div>
    </div>
    <div v-if="replyList?.length" class="reply-list" :class="{'fold':fold}"
         :style="{maxHeight: maxHeight?maxHeight:'-1'+'px'}"
         ref="ReplyListRef">
      <MomentReplyItem v-for="item in replyList"
                       :data="item"
                       :root="data"
                       @saveSuccess="saveSuccess"
                       @deleteSuccess="deleteSuccess"/>
    </div>
    <div class="bottom-operation">
      <div v-if="showLoadReply" class="view-more" @click="onLoadReply">
        <span>
          {{
            (currentPageNum === 1) ? `共${data.replyCount}条回复` : `${fold && replyList?.length ? '展开' : '查看'}更多回复`
          }}
        </span>
        <i-down v-if="!replyLoading" theme="outline" size="14" fill="#1890ff"/>
        <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
      </div>
      <div class="fold-btn" v-if="replyList?.length && !fold" @click="onFold">
        <span>收起</span>
        <i-up theme="outline" size="14" fill="#1890ff"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MomentCommentItem"
  }
</script>

<script setup lang="ts">
  import {ref, computed, inject, onMounted, nextTick} from "vue";
  import {useStore} from "vuex";
  import {RouterLink} from "vue-router";
  import {message} from "ant-design-vue";
  import {vOnClickOutside} from '@vueuse/components';
  import {transformHTMLToTag, transformTagToHTML} from "@/components/common/utils/emoji/youyu_emoji";
  import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";
  import MomentReplyEditor from "@/views/moment/components/MomentReplyEditor.vue";
  import MomentReplyItem from "@/views/moment/components/MomentReplyItem.vue";
  import UserCardMoment from "../components/UserCardMoment.vue";

  const {getters, dispatch} = useStore();
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  const emit = defineEmits(['deleteSuccess']);

  const row = ref<number>(0);
  const expand = ref<boolean>(false);
  const active = ref<boolean>(false);
  const deleteVisible = ref<boolean>(false);
  const preview = ref<boolean>(false);
  const replyLoading = ref<boolean>(false);
  const likeLoading = ref<boolean>(false);
  const fold = ref<boolean>(false);
  const current = ref<number>(0);
  const replyList = ref([]);
  const pageNum = ref<number>(0);
  const currentPageNum = ref<number>(1);
  const maxHeight = ref<number>(0);
  const MomentReplyEditorRef = ref(null);
  const ReplyListRef = ref(null);

  const userInfo = computed(() => getters['userInfo']);
  const {moment, updateMomentAttribute} = inject('moment');
  const images = computed(() => props.data.images ? props.data.images.split(",") : null);
  const isLogin = computed(() => getters['isLogin']);
  const showLoadReply = computed(() => (props.data.replyCount > 0 && !replyList.value.length) || currentPageNum.value <= pageNum.value || fold.value);
  const showDelete = computed(() => userInfo.value.id === props.data.userId || moment.value.userId === userInfo.value.id)

  function set(value: number) {
    row.value = value;
  }

  const onDelete = () => {
    deleteVisible.value = true;
  }

  const onConfirmDelete = () => {
    dispatch('deleteMomentComment', {commentId: props.data.id}).then(res => {
      if (res) {
        message.success('删除成功');
        emit('deleteSuccess', props.data);
      }
    })
  }

  const onLike = () => {
    if (likeLoading.value) return;
    likeLoading.value = true;
    const isLike = !!props.data.commentLike;
    dispatch(isLike ? "cancelMomentCommentLike" : "setMomentCommentLike", {
      commentId: props.data.id
    }).then(res => {
      if (isLike) {
        props.data.supportCount -= 1;
        props.data.commentLike = null;
      } else {
        props.data.supportCount += 1;
        props.data.commentLike = res.data;
      }
    }).finally(() => {
      likeLoading.value = false;
    })
  }

  const onReply = () => {
    active.value = !active.value;
  }

  const onPreview = (index: number) => {
    preview.value = true;
    current.value = index;
  };

  const onClose = () => {
    preview.value = false;
  };

  const onClickOutside = () => {
    if (!active.value) return;
    const reply = MomentReplyEditorRef.value.reply;
    if (!reply.content && !reply.images?.length) {
      active.value = false;
    }
  }

  const onSubmit = (reply, successCallback, failedCallback) => {
    reply.images = reply.images.length ? reply.images.join(",") : null;
    reply.momentId = moment.value.id;
    reply.userId = userInfo.value.id;
    reply.userIdTo = moment.value.userId;
    reply.rootId = props.data.id;
    reply.content = transformHTMLToTag(reply.content);
    dispatch('createMomentComment', reply).then(res => {
      if (res.data) {
        message.success("发布成功");
        replyList.value.unshift(res.data);
        props.data.replyCount += 1;
        updateMomentAttribute("commentCount", moment.value.commentCount + 1);
        active.value = false;
      }
      successCallback();
    }).catch(() => {
      failedCallback();
    })
  }

  const onLoadReply = () => {
    if (!replyList?.length && !fold.value) {
      replyLoading.value = true;
      dispatch('listMomentReplyPage', {
        id: props.data.id,
        pageNum: currentPageNum.value
      }).then(res => {
        pageNum.value = res.data.pages;
        currentPageNum.value++;
        replyList.value.push(...res.data.list);
        nextTick(() => {
          maxHeight.value = ReplyListRef.value.scrollHeight;
          ReplyListRef.value.style.maxHeight = maxHeight.value + 'px';
        })
      }).finally(() => {
        replyLoading.value = false;
      })
    } else {
      fold.value = false;
    }
  }

  const onFold = () => {
    maxHeight.value = ReplyListRef.value.scrollHeight;
    ReplyListRef.value.style.maxHeight = maxHeight.value + 'px';
    fold.value = true;
  }

  const saveSuccess = (data) => {
    replyList.value.unshift(data);
  }

  const deleteSuccess = (data) => {
    replyList.value = replyList.value.filter(item => item.id !== data.id);
    props.data.replyCount -= 1;
    updateMomentAttribute("commentCount", moment.value.commentCount - 1);
  }

  const onUserVisibleChange = (visible: boolean) => {
    if (visible) {
      dispatch("getMomentUserDetail", {userId: props.data.userId}).then(res => {
        props.data.user = res.data;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .moment-comment-item {
    .moment-comment-detail {
      display: flex;

      .user-avatar {
        height: 36px;
        width: 36px;
        border-radius: 100%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .comment-right {
        flex: 1;
        margin-left: 8px;
        margin-top: 2px;

        .comment-right-top {
          display: flex;

          .user-nickname {
            font-size: 14px;
            font-weight: bold;

            a {
              color: inherit !important;
            }

            .author-text {
              display: inline-block;
              font-size: 12px;
              font-weight: normal;
              color: #fff;
              margin-left: 5px;
              background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
              border-radius: 12px;
              padding: 0 6px;
            }
          }

          .publish-time {
            position: relative;
            font-size: 14px;
            color: #909090;
            padding-left: 8px;
            margin-left: 8px;

            &:before {
              position: absolute;
              top: 4.5px;
              left: 0;
              content: "";
              height: 14px;
              width: 2px;
              background-color: var(--youyu-border-color);
            }
          }
        }

        ::v-deep(.comment-content) {
          margin: 8px 0;
          white-space: pre-wrap;
          line-height: 2rem;
          max-height: 12rem;
          overflow: hidden;

          &.content-expand {
            max-height: none !important;
          }

          img {
            vertical-align: sub;
            width: auto;
            height: 20px;
            margin: 0 2px;
          }
        }

        .limit-btn {
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
          margin-right: 20px;
        }

        .content-images {
          margin-bottom: 8px;

          img {
            height: 90px;
            width: 90px;
            margin: 0 4px 4px 0;
            object-fit: cover;
            cursor: zoom-in;
            filter: brightness(.94);
          }
        }

        .comment-operation {
          display: flex;
          align-items: center;

          .ope-item {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #8a919f;
            margin-right: 10px;
            cursor: pointer;
            font-size: 13px;

            &:hover {
              color: #1890ff;
            }

            &.ope-active {
              color: #1890ff;
            }

            &.delete-ope {
              color: #ff4d4f;
              margin-left: auto;
              display: none;

              &.visible {
                display: inherit !important;
              }
            }

            ::v-deep(.i-icon) {
              margin-right: 3px;

              &.i-icon-comment {
                position: relative;
                top: 1px;
              }
            }
          }
        }
      }
    }

    .moment-reply {
      margin-top: 12px;
      display: flex;
      align-items: flex-start;

      .user-avatar {
        height: 36px;
        width: 36px;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 8px;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .reply-box-wrapper {
        flex: 1;
      }

      ::v-deep(.editable-div) {
        border-radius: 2px;
        border: 1px solid transparent;
        transition: .3s;

        &.editor-active {
          border: 1px solid #1890ff;
        }

        #box {
          padding: 6px 12px;
        }
      }
    }

    .bottom-operation {
      display: flex;
      margin-top: 6px;
      margin-left: 44px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      color: #1890ff;

      > div {
        &:nth-child(n+2) {
          margin-left: 16px;
        }
      }
    }

    .reply-list {
      margin-top: 6px;
      margin-left: 45px;
      background-color: var(--youyu-background4);
      padding: 0 12px;
      border-radius: 6px;
      height: unset;
      transition: .3s;
      overflow: hidden;
      max-height: 3000px;

      &.fold {
        max-height: 0 !important;
      }

      ::v-deep(.moment-reply-item) {
        border-top: 1px solid var(--youyu-border-color);
        padding: 10px 0;

        &:first-child {
          border-top: none;
        }
      }
    }

    &:hover {
      .delete-ope {
        display: inline-block !important;
      }
    }
  }
</style>
