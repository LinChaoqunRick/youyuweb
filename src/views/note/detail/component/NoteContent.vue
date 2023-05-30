<template>
  <div class="note-content">
    <div class="chapter-content-body" v-if="chapter">
      <div v-show="!isEdit" id="chapter-preview" class="chapter-preview">
        <div class="chapter-title">{{chapter.title}}</div>
        <div class="chapter-info">
          <span>本文由用户</span>
          <span class="user-info">
            <RouterLink :to="`/user/${chapter.user.id}`">
              <img :src="chapter.user.avatar"/>
              <span class="info-nickname">{{chapter.user.nickname}}</span>
            </RouterLink>
        </span>
          <span>提供</span>，
          <div>发布于：<span class="time">{{chapter.createTime}}</span>，最后更新时间：
            <span class="time">{{chapter.updateTime}}</span>
          </div>
          <div>
            <a-button type="link" v-if="isOwn" @click="handleEdit">编辑</a-button>
          </div>
        </div>
        <div class="chapter-content">
          <MdPreview :text="chapter.content || ''" editorId="note-content"/>
        </div>
        <div class="chapter-bottom" id="chapter-bottom"></div>
        <Teleport to="#header">
          <PercentCounter elementId="chapter-preview"/>
        </Teleport>
      </div>
      <div class="chapter-editor" v-show="isEdit">
        <div class="editor-top">
          <input v-model="chapterCopy.title" placeholder="请输入章节标题" maxlength="60"/>
          <div>
            <a-button type="link" @click="handleExit">退出</a-button>
            <a-button type="link" @click="handleSave">保存</a-button>
          </div>
        </div>
        <MdEditorCom v-model="chapterCopy.content"
                     editorId="note-content"
                     class="edit-chapter-t-editor"
                     :mdHeadingId="createMdHeadingId"
                     ref="editor"/>
      </div>
    </div>
    <div v-if="loading" class="loading-box">
      <a-spin tip="加载中..."/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch, onMounted, computed} from "vue";
  import {useStore} from "vuex";
  import {useRoute, useRouter, RouterLink} from "vue-router";
  import type {chapter} from "@/views/note/type";
  import MdPreview from "@/components/content/mdEditor/MdPreview.vue";
  import MdEditorCom from "@/components/content/mdEditor/MdEditorCom.vue";
  import {createMdHeadingId} from "@/components/content/mdEditor/utils";
  import {cloneDeep} from 'lodash';
  import {message} from "ant-design-vue";
  import PercentCounter from "@/components/common/utils/percentCounter/PercentCounter.vue";

  const emit = defineEmits(["contentLoaded", "saveSuccess", "noteInfoCollapse"])
  const props = defineProps({
    id: Number
  })
  const {getters, dispatch} = useStore();
  const chapter = ref<chapter>();
  const chapterCopy = ref<chapter>(); // 复制一份编辑用
  const loading = ref(false);
  const userInfo = computed(() => getters['userInfo']);
  const isOwn = computed(() => userInfo.value.id === chapter.value.user.id);
  const isEdit = ref<boolean>(false);
  const route = useRoute();
  const router = useRouter();

  function initData() {
    loading.value = true;
    dispatch("getNoteChapter", {id: props.id}).then(res => {
      chapter.value = res.data;
      chapterCopy.value = cloneDeep(chapter.value);
      if (!chapterCopy.value.content) {
        chapterCopy.value.content = '';
      }
      router.push({query: {chapterId: props.id}});
      emit("contentLoaded", chapter.value);
    }).finally(() => {
      loading.value = false;
    })
  }

  function handleEdit() {
    isEdit.value = true;
  }

  function handleExit() {
    isEdit.value = false;
  }

  function handleSave() {
    dispatch("updateNoteChapter", chapterCopy.value).then(res => {
      isEdit.value = false;
      initData();
      emit("saveSuccess");
      message.success("保存成功");
    })
  }

  watch(() => props.id, (newVal) => {
    if (newVal) {
      initData();
    }
  })

  watch(() => isEdit.value, (newVal) => {
    emit('noteInfoCollapse', newVal);
  })
</script>

<style lang="scss" scoped>
  .note-content {
    position: relative;
    height: 100%;
    width: 100%;

    .chapter-content-body {
      height: 100%;
      /*overflow: auto;*/

      #chapter-preview {
        overflow: auto;
      }

      .chapter-preview {
        /*display: flex;*/
        /*flex-direction: column;*/
        height: 100%;

        .chapter-title {
          padding: 10px 16px;
          font-size: 20px;
          font-weight: bold;
          border-bottom: var(--youyu-navigation-border);
        }

        .chapter-info {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 16px;
          padding: 10px 16px;
          color: var(--youyu-text2);

          .user-info {
            display: flex;
            align-items: center;
            cursor: pointer;

            a {
              display: flex;
              align-items: center;
            }

            img {
              height: 28px;
              width: 28px;
              border-radius: 50%;
              margin: 0 4px;
            }

            .info-nickname {
              margin-right: 4px;
              color: #1890ff;
            }
          }

          .time {
            font-style: italic;
            color: var(--youyu-text1);
          }
        }

        .chapter-content {
          padding: 0 4px;

          ::v-deep(#note-content) {
            background: transparent !important;
          }
        }

        .chapter-bottom {
          padding: 8px 24px;

          ::v-deep(.chapter-last-next) {
            display: flex;
            justify-content: space-between;

            .chapter-item {
              .item-box {
                cursor: pointer;

                .item-text {
                  font-size: 13px;
                  color: var(--youyu-text1);
                }

                .item-title {
                  font-size: 16px;
                  font-weight: bold;
                  color: #1890ff;
                }
              }
            }

            .chapter-item-last {
              .item-text {
                text-align: left;
              }
            }

            .chapter-item-next {
              .item-text {
                text-align: right;
              }
            }
          }
        }
      }

      .chapter-editor {
        display: flex;
        flex-direction: column;
        height: 100%;

        .editor-top {
          display: flex;
          align-items: center;
          background-color: var(--youyu-background1);

          input {
            flex: 1;
            outline: none;
            border: none;
            font-size: 18px;
            background-color: transparent;
            padding: 10px;
            font-weight: bold;
          }

          button {
            padding: 0 12px 0 0;
          }
        }

        .edit-chapter-t-editor {
          flex: 1;
          overflow: auto;

          ::v-deep(#note-content) {
            height: 100%;
          }
        }
      }
    }

    .loading-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
    }
  }
</style>
