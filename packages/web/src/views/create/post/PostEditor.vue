<template>
  <div class="create-post">
    <div class="top-box">
      <input v-model="formValidate.title" placeholder="请输入文章标题" maxlength="255" />
      <div class="top-tips">
        <a-switch v-model:checked="autoSave" size="small" @change="onAutoSaveChange" />
        <div v-if="!autoSave">自动保存已关闭</div>
        <div v-else>
          <div class="save-status" v-show="autoSaveStatus === 0">自动保存已开启</div>
          <div class="save-status" v-show="autoSaveStatus === 1">
            <i-loading-one theme="filled" size="18" fill="#1890ff" />
            自动保存中
          </div>
          <div class="save-status" v-show="autoSaveStatus === 2">
            <i-check-one theme="filled" size="18" fill="#67c23a" />
            自动保存成功
          </div>
          <div class="save-status" v-show="autoSaveStatus === 3">
            <i-close-one theme="filled" size="18" fill="#ff0000" />
            自动保存失败
          </div>
        </div>
      </div>
      <a-button type="primary">草稿箱</a-button>
      <a-button type="primary" @click="handlePost">发布</a-button>
    </div>
    <MdEditorCom v-model="formValidate.content" class="write-post-editor" ref="editor" />
    <PostDrawer v-model:visible="visible" :formValidate="formValidate" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Post } from '@/views/post/detail/types';
import MdEditorCom from '@/components/content/mdEditor/MdEditorCom.vue';
import PostDrawer from '../common/PostDrawer.vue';
import { debounce } from 'lodash';

const props = defineProps({
  formValidate: {
    type: Object as PropType<Post>,
    required: true,
  },
});

const autoSave = ref<boolean>(true);
const visible = ref<boolean>(false);
const autoSaveStatus = ref<number>(0); // 0:初始化 1:保存中 2:保存成功 3:保存失败

watch(
  () => props.formValidate,
  () => {
    if (autoSave.value) {
      saveDraft();
    }
  },
  {
    deep: true,
  }
);

function handlePost() {
  visible.value = true;
}

const saveDraft = debounce(
  () => {
    autoSaveStatus.value = 1;
    setTimeout(() => {
      autoSaveStatus.value = 2;
    }, 1000);
  },
  3000,
  {
    leading: false,
    trailing: true,
  }
);

const onAutoSaveChange = (value: boolean) => {
  if (value) {
    autoSaveStatus.value = 0;
  }
};
</script>

<style lang="scss" scoped>
.create-post {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);

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
      color: var(--youyu-text2);
    }

    .top-tips {
      width: 185px;
      color: var(--youyu-body-text1);
      display: flex;
      justify-content: flex-start;
      align-items: center;

      ::v-deep(.ant-switch) {
        margin-right: 3px;
      }

      .save-status {
        display: flex;
        align-items: center;

        .i-icon {
          margin-right: 3px;
        }

        .i-icon-loading-one {
          animation: rotate 3s infinite linear;
        }
      }
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
