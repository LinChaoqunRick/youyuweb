<template>
  <div class="comment-item">
    <div class="user-avatar">
      <img :src="data.avatar"/>
    </div>
    <div class="content-box">
      <div class="user-box">
        <div class="user-nickname">
          <div class="nickname-text">{{data.nickname}}</div>
          <div class="author-text" v-if="authorId === data.userId">(作者)</div>
        </div>
        <div class="create-time" :title="data.createTime">{{dayjs().to(dayjs(data.createTime))}}</div>
      </div>
      <div class="comment-content" :class="{'content-expand': expand}" v-row="{set: set}">
        <MdEditorComponent
          :text="data.content"
          editorId="md-editor"
          :extend="{
            previewOnly: true,
            previewTheme: 'cyanosis',
            showCodeRowNumber: true
          }"/>
      </div>
      <div class="comment-operation">
        <div class="limit-btn" @click="expand = true" v-show="row>7 && !expand">展开</div>
        <div class="limit-btn" @click="expand = false" v-show="row>7 && expand">收起</div>
        <div class="more-btn" @click="expand = false" v-if="data.subCount>0">共{{data.subCount}}条回复&ensp;&gt;</div>
      </div>
      <div class="comment-operation">
        <div class="ope-item">
          <i-good-two theme="outline" size="18" fill="#8a919f"/>
          点赞
        </div>
        <div class="ope-item">
          <i-comment theme="outline" size="18" fill="#8a919f"/>
          评论
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import RelativeTime from 'dayjs/plugin/relativeTime';
  import MdEditorComponent from "@/components/content/mdEditor/MdEditor.vue";
  import {ref} from 'vue';

  dayjs.extend(RelativeTime);


  const props = defineProps({
    data: {
      type: Object,
      required: true
    },
    authorId: {
      type: [String, Number]
    }
  })

  const expand = ref(false);
  const row = ref(0);

  function set(value) {
    row.value = value;
  }
</script>

<style lang="scss" scoped>
  .comment-item {
    /*border-bottom: 1px solid #f0f0f0;*/
    display: flex;
    padding: 16px 0;

    .user-avatar {
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .content-box {
      flex: 1 1 auto;
      margin-left: 12px;

      .user-box {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 4px;

        .user-nickname {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;

          .author-text {
            font-size: 13px;
            font-weight: normal;
            color: #8a919f;
            margin-left: 5px;
          }
        }

        .create-time {
          font-size: 14px;
          color: #8a919f;
          margin-left: auto;
        }
      }

      .comment-content {
        font-weight: 400;
        font-size: 14px;
        line-height: 2rem;
        color: #515767;
        margin-top: 8px;
        max-height: 12rem;
        overflow: hidden;
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 6;*/

        &.content-expand {
          max-height: none !important;
        }

        ::v-deep(p) {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
      }

      .comment-operation {
        display: flex;
        align-items: center;

        .limit-btn {
          margin-top: 8px;
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
          margin-right: 20px;
        }

        .more-btn {
          margin-top: 8px;
          cursor: pointer;
          font-size: 14px;
          line-height: 22px;
          color: #1e80ff;
        }

        .ope-item {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #8a919f;
          margin-right: 10px;
          padding-top: 6px;
          cursor: pointer;

          ::v-deep(.i-icon) {
            margin-right: 3px;

            &.i-icon-comment {
              position: relative;
              top: 2px;
            }
          }
        }
      }
    }
  }
</style>
