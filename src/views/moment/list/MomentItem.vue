<template>
  <div class="moment-item">
    <div class="moment-item-content">
      <div class="content-top">
        <div class="user-avatar">
          <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
            <template #content>
              <UserCardMoment :user="data.userInfo"/>
            </template>
            <RouterLink :to="{name:'userHome', params: {userId: data.userInfo.id}}">
              <img :src="data.userInfo.avatar"/>
            </RouterLink>
          </a-popover>
        </div>
        <div class="user-nickname-time">
          <a-popover placement="top" :mouseEnterDelay="0.2" :mouseLeaveDelay="0.3">
            <template #content>
              <UserCardMoment :user="data.userInfo"/>
            </template>
            <RouterLink :to="{name:'userHome', params: {userId: data.userInfo.id}}">
              <div class="user-nickname">{{data.userInfo.nickname}}</div>
            </RouterLink>
          </a-popover>
          <div class="publish-time" :title="data.createTime">{{$dayjs().to(data.createTime)}}</div>
        </div>
        <a-popover v-model:visible="visible"
                   placement="bottomRight"
                   overlayClassName="moment-item-top-popover"
                   :getPopupContainer="triggerNode=>triggerNode.parentNode">
          <template #content>
            <div class="operation-items">
              <div v-if="data.userId === userInfo.id"
                   class="operation-item delete-moment"
                   @click="onDelete">
                <i-delete theme="outline" size="14" fill="currentColor"/>
                删除
              </div>
              <div class="operation-item">
                <i-people-unknown theme="outline" size="14" fill="currentColor"/>
                屏蔽作者
              </div>
              <div class="operation-item">
                <i-caution theme="outline" size="14" fill="currentColor"/>
                举报
              </div>
            </div>
          </template>
          <div class="content-top-operation">
            <i-more-one theme="outline" size="22" fill="currentColor"/>
          </div>
        </a-popover>
      </div>
      <div class="content-body">
        <div class="content-text" :class="{'content-expand': expand}"
             v-html="transformTagToHTML(data.content)"
             v-row="{set: set}"></div>
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="content-images" :class="[imageClass]" v-if="images?.length && !preview">
          <img :src="item" v-for="(item, index) in images" @click="onPreview(index)"/>
        </div>
        <div class="content-image-preview" v-if="images?.length && preview">
          <ImagePreviewEmbed :list="images" :current="current" @onClose="onClose"/>
        </div>
      </div>
    </div>
    <div class="moment-item-actions">
      <div class="item-operation">
        <div class="item-icon">
          <i-share-one theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">分享</div>
      </div>
      <div class="item-operation" @click="onClickReply" :class="{'action-active':replyShow}">
        <div class="pointer-arrow" v-if="replyShow"></div>
        <div class="item-icon">
          <i-comment :theme="replyShow?'filled':'outline'" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">{{data.commentCount || '评论'}}</div>
      </div>
      <div class="item-operation">
        <div class="item-icon">
          <i-thumbs-up theme="outline" size="14" fill="currentColor"/>
        </div>
        <div class="item-text">点赞</div>
      </div>
    </div>
    <div class="moment-item-bottom" v-if="replyShow">
      <div class="moment-comment-editor">
        <div class="user-avatar">
          <img v-if="isLogin" :src="userInfo.avatar"/>
          <img v-else src="https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/default/default_avatar.png"/>
        </div>
        <div class="reply-box-wrapper">
          <MomentReplyEditor @onSubmit="onSubmit"/>
        </div>
      </div>
      <div class="moment-comment-list" v-if="commentList.length">
        <div class="comment-list-top">
          <div class="comment-count">
            全部评论（{{data.commentCount || 0}}）
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
                             @deleteSuccess="deleteSuccess"/>
        </div>
        <div class="comment-load-all" v-if="data.commentCount - commentList.length> 0">
          <div class="more-btn" @click="onDetail">
            查看全部 <span class="comment-count">{{data.commentCount}}</span> 条评论
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref, computed, reactive, provide} from 'vue';
  import type {PropType} from "vue";
  import {RouterLink} from "vue-router";
  import {useStore} from "vuex";
  import type {momentListType} from "@/views/moment/types";
  import {message, Modal} from "ant-design-vue";
  import {transformHTMLToTag} from "@/components/common/utils/emoji/youyu_emoji";
  import {transformTagToHTML} from "@/components/common/utils/emoji/youyu_emoji";
  import ImagePreviewEmbed from "@/components/common/utils/image/ImagePreviceEmbed.vue";
  import MomentReplyEditor from "@/views/moment/components/MomentReplyEditor.vue";
  import UserCardMoment from "../components/UserCardMoment.vue";
  import MomentCommentItem from "../components/MomentCommentItem.vue";

  const {getters, dispatch} = useStore();

  const props = defineProps({
    data: {
      type: Object as PropType<momentListType>
    }
  });
  const emit = defineEmits(["deleteSuccess"]);

  const preview = ref(false);
  const current = ref(0);
  const row = ref<number>(0);
  const expand = ref<boolean>(false);
  const replyShow = ref<boolean>(false);
  const visible = ref<boolean>(false);
  const sort = ref<boolean>(true); // true:最新 false:最热
  const order = computed(() => sort.value ? 'create_time' : 'support_count');
  const images = computed(() => props.data.images ? props.data.images?.split(",") : null);
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
  const richEditor = ref(null);
  const commentList = ref([]);
  const isLogin = computed(() => getters['isLogin']);

  provide('moment', {moment: props.data, updateMomentAttribute});

  function updateMomentAttribute(name: string, value: any) {
    if (Reflect.has(props.data, name)) {
      props.data[name] = value;
    }
  }

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
  const onSubmit = (reply: object, callback: Function) => {
    reply.images = reply.images.length ? reply.images.join(",") : null;
    reply.momentId = props.data.id;
    reply.userId = userInfo.value.id;
    reply.content = transformHTMLToTag(reply.content);
    dispatch('createMomentComment', reply).then(res => {
      if (res.data) {
        message.success("发布成功");
        commentList.value.unshift(res.data);
        props.data.commentCount += 1;
      }
      callback();
    })
  }

  const onClickReply = () => {
    replyShow.value = !replyShow.value;
    if (replyShow.value) {
      getCommentsPage();
    }
  }

  const getCommentsPage = () => {
    dispatch('listMomentCommentPage', {
      momentId: props.data.id,
      pageSize: 5,
      orderBy: order.value
    }).then(res => {
      commentList.value = res.data.list;
    })
  }

  const deleteSuccess = (moment: momentListType) => {
    commentList.value = commentList.value.filter(item => item.id !== moment.id);
    props.data.commentCount -= 1;
  }

  const handleSort = (value: boolean) => {
    if (sort.value === value) return;
    sort.value = value;
    getCommentsPage();
  }

  const onDetail = () => {

  }

  const onDelete = () => {
    visible.value = false;
    Modal.confirm({
      title: '删除评论',
      icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
      content: '确定删除这条时刻吗？',
      onOk() {
        return dispatch("deleteMoment", {
          momentId: props.data.id
        }).then(res => {
          message.success('删除成功');
          emit("deleteSuccess", props.data);
        }).catch(console.log)
      },
    });
  }
</script>

<style lang="scss" scoped>
  .moment-item {
    width: 750px;
    background-color: var(--youyu-background1);

    .moment-item-content {
      padding: 20px 20px 12px 20px;

      .content-top {
        display: flex;
        align-items: center;

        .user-avatar {
          height: 48px;
          width: 48px;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .user-nickname-time {
          margin-left: 8px;

          a {
            color: inherit;
          }

          .user-nickname {
            font-weight: bold;
            cursor: pointer;
          }

          .publish-time {
            font-size: 13px;
            color: #909090;
            margin-top: 1px;
          }
        }

        .content-top-operation {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
          margin-left: auto;
          cursor: pointer;
          border-radius: 3px;
          transition: .3s;

          &:hover {
            background-color: var(--youyu-background2);

            ::v-deep(.i-icon) {
              color: #1890ff;
              transition: .3s;
            }
          }

          ::v-deep(.i-icon) {
            color: var(--youyu-text1);
          }
        }
      }

      .content-body {
        margin-left: 56px;

        ::v-deep(.content-text) {
          margin: 4px 0;
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

        .content-images {
          display: grid;

          &.col-3 {
            grid-template-columns: repeat(3, 114px);
          }

          &.col-2 {
            grid-template-columns: repeat(2, 114px);
          }

          &.col-1 {
            img {
              height: 200px;
              width: 200px;
            }
          }

          img {
            height: 110px;
            width: 110px;
            margin: 0 4px 4px 0;
            object-fit: cover;
            cursor: zoom-in;
            filter: brightness(.94);
          }
        }

        .limit-btn {
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
          margin-right: 20px;
        }
      }
    }

    .moment-item-actions {
      display: flex;
      border-top: 1px solid var(--youyu-border-color3);

      .item-operation {
        position: relative;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        font-size: 13px;
        color: var(--youyu-text1);
        cursor: pointer;
        user-select: none;

        &.action-active {
          background-color: var(--youyu-background4);
          color: #1890ff;
        }

        &:hover {
          background-color: var(--youyu-background4);
        }

        &:nth-child(n+2) {
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
          margin: -6px 0 0 -6px;
          pointer-events: none;
          width: 12px;
          height: 12px;
          border-top: 1px solid var(--youyu-border-color3);
          border-left: 1px solid var(--youyu-border-color3);
          transform: rotate(45deg);
          display: inline-block;
          background-color: var(--youyu-background1);
        }
      }
    }

    .moment-item-bottom {
      .moment-comment-editor {
        margin: 0 24px;
        padding: 16px 0;
        border-top: 1px solid var(--youyu-border-color3);
        display: flex;
        align-items: flex-start;

        .user-avatar {
          height: 36px;
          width: 36px;
          border-radius: 100%;
          overflow: hidden;
          margin: 0 12px 0 4px;

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

      .moment-comment-list {
        border-top: 1px solid var(--youyu-border-color);
        padding: 8px 24px;

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

        .comment-load-all {

          .more-btn {
            padding: 10px 0 4px 0;
            cursor: pointer;
            text-align: center;

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

    .ant-popover-inner-content {
      padding: 8px !important;

      .operation-items {
        .operation-item {
          cursor: pointer;
          padding: 3px 8px;

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
      }
    }
  }
</style>
