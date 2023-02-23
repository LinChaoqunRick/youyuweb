<template>
  <div class="create-post">
    <div class="top-box">
      <input v-model="title" placeholder="请输入文章标题" maxlength="60"/>
      <span class="top-tips">文章将自动保存至草稿箱</span>
      <a-button type="primary">草稿箱</a-button>
      <a-button type="primary" @click="visible = true">发布</a-button>
    </div>
    <MdEditorCom class="write-post-editor"/>

    <a-drawer title="发布文章" width="500" :visible="visible" @close="onClose" class="create-post-drawer">
      <template #closeIcon>
        <i-close theme="outline" size="20" fill="#909090"/>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <div class="drawer-footer">
          <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
          <a-button type="primary" @click="onClose">Submit</a-button>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import {onBeforeRouteLeave} from 'vue-router';
  import MdEditorCom from "@/components/content/mdEditor/MdEditorCom.vue";

  const title = ref<string>('');
  const visible = ref<boolean>(false);

  onBeforeRouteLeave((to, from) => {
    const answer = window.confirm(
      '确定离开此页面？请确保您的变更已被保存!'
    )
    // 取消导航并停留在同一页面上
    if (!answer) return false
  })

  function onClose() {
    visible.value = false;
  };
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
    }
  }
</style>

<style lang="scss">
  .create-post-drawer {

    .ant-drawer-header {
      padding: 16px 10px;
    }

    .drawer-footer {
      text-align: right;
    }
  }
</style>
