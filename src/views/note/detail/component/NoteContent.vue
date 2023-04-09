<template>
  <div class="note-content">
    <div class="chapter-preview" v-if="chapter">
      <div class="chapter-title">{{chapter.title}}</div>
      <div class="chapter-info">
        <span>本文由用户</span>
        <span class="user-info" @click="$router.push(`/user/${chapter.user.id}/moment`)">
          <img :src="chapter.user.avatar"/>
          <span class="info-nickname">{{chapter.user.nickname}}</span>
        </span>
        <span>提供</span>，
        <div>发布于：<span class="time">{{chapter.createTime}}</span>，最后更新时间：
          <span class="time">{{chapter.updateTime}}</span></div>
      </div>
      <div class="chapter-content">
        <MdPreview :text="chapter.content"/>
      </div>
      <div class="chapter-bottom" id="chapter-bottom"></div>
    </div>
    <div class="chapter-editor"></div>
    <div v-if="loading" class="loading-box">
      <a-spin/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch, onMounted} from "vue";
  import {useStore} from "vuex";
  import type {chapter} from "@/views/note/type";
  import MdPreview from "@/components/content/mdEditor/MdPreview.vue";

  const emit = defineEmits(["contentLoaded"])
  const props = defineProps({
    id: Number
  })
  const {dispatch} = useStore();
  const chapter = ref<chapter>();
  const loading = ref(false);

  function initData() {
    loading.value = true;
    dispatch("getNoteChapter", {id: props.id}).then(res => {
      chapter.value = res.data;
      emit("contentLoaded");
    }).finally(() => {
      loading.value = false;
    })
  }

  watch(() => props.id, (newVal) => {
    if (newVal) {
      initData();
    }
  })
</script>

<style lang="scss" scoped>
  .note-content {
    position: relative;
    height: 100%;
    width: 100%;

    .chapter-preview {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;

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
        padding: 8px 24px;
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

    .loading-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--youyu-body-background3);
    }
  }
</style>
