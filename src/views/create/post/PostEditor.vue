<template>
  <div class="create-post">
    <div class="top-box">
      <input v-model="formValidate.title" placeholder="请输入文章标题" maxlength="60"/>
      <span class="top-tips">文章将自动保存至草稿箱</span>
      <a-button type="primary">草稿箱</a-button>
      <a-button type="primary" @click="visible = true">发布</a-button>
    </div>
    <MdEditorCom v-model="formValidate.content" class="write-post-editor" ref="editor"/>
    <PostDrawer v-model:visible="visible" :formValidate="formValidate" v-bind="$attrs"/>
  </div>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>

<script lang="ts" setup>
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import {useStore} from 'vuex';
  import type {postData} from "@/types/post";
  import MdEditorCom from "@/components/content/mdEditor/MdEditorCom.vue";
  import PostDrawer from "../common/PostDrawer.vue";

  const {getters, dispatch} = useStore();
  const props = defineProps({
    formValidate: {
      type: Object as PropType<postData>,
    }
  })

  const visible = ref<boolean>(false);
</script>

<style lang="scss" scoped>
  .create-post {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .top-box {
      display: flex;
      align-items: center;
      white-space: nowrap;
      height: 50px;
      background-color: var(--youyu-body-background2);
      padding: 0 20px;

      input {
        width: 100%;
        outline: none;
        border: none;
        font-size: 18px;
        background-color: transparent;
      }

      .top-tips {
        color: var(--youyu-body-text1);
      }

      button {
        margin-left: 10px;
      }
    }

    .write-post-editor {
      flex: 1;
      overflow: hidden;
    }
  }
</style>

<style lang="scss">
  .create-post-drawer {

    .ant-drawer-header {
      padding: 16px 10px;

      .ant-drawer-close {
        margin-right: 6px;
      }

      .ant-drawer-title {
        font-weight: bold;
      }
    }

    .drawer-footer {
      text-align: right;
    }
  }
</style>
