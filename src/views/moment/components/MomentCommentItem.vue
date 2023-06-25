<template>
  <div class="moment-comment-item">
    <div class="user-avatar">
      <img :src="data.user.avatar"/>
    </div>
    <div class="comment-right">
      <div class="comment-right-top">
        <div class="user-nickname">{{data.user.nickname}}</div>
        <div class="publish-time" :title="data.createTime">{{$dayjs().to(data.createTime)}}</div>
      </div>
      <div class="comment-content" :class="{'content-expand': expand}"
           v-row="{set: set}"
           v-html="transformTagToHTML(data.content)"></div>
      <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
      <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
      <div class="comment-operation">
        <div class="ope-item" :class="{'ope-active': data.commentLike}" @click="handleLike">
          <i-good-two :theme="data.commentLike?'filled':'outline'" size="14" fill="currentColor"/>
          点赞<span v-if="data.supportCount">({{data.supportCount}})</span>
        </div>
        <div class="ope-item" :class="{'ope-active': active}" @click="handleReply">
          <i-comment :theme="active?'filled':'outline'" size="14" fill="currentColor"/>
          {{active?'取消回复':'回复'}}<span v-if="data.replyCount">({{data.replyCount}})</span>
        </div>
        <a-popconfirm
          v-model:visible="deleteVisible"
          title="确认删除此条评论?"
          ok-text="是"
          cancel-text="否"
          @confirm="onConfirmDelete"
          :getPopupContainer="triggerNode=>triggerNode.parentNode">
          <div class="ope-item delete-ope" :class="{'visible': deleteVisible}" v-if="userInfo.id === data.userId"
               @click="onDelete">
            删除
          </div>
        </a-popconfirm>
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
  import {ref, computed, inject} from "vue";
  import {useStore} from "vuex";
  import {transformTagToHTML} from "@/components/common/utils/emoji/youyu_emoji";
  import {message} from "ant-design-vue";

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
  const userInfo = computed(() => getters['userInfo']);
  const {moment, updateMomentAttribute} = inject('moment');

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
      }
      emit('deleteSuccess', props.data);
    })
  }

  const handleReply = () => {

  }
</script>

<style lang="scss" scoped>
  .moment-comment-item {
    padding: 12px 0;
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

    &:hover {
      .delete-ope {
        display: inline-block !important;
      }
    }
  }
</style>
