<template>
  <div class="reply-editor">
    <a-textarea v-model:value="value"
                :autoSize="{ minRows: 2, maxRows: 10 }"
                :placeholder="placeholder"
                :rows="2"
                :maxlength="500"/>
    <div class="action-box">
      <div class="left-box">
        <a-popover placement="bottomLeft" overlayClassName="reply-editor-popover" trigger="click">
          <template #content>
            <Emoji @emojiHandler="emojiHandler"/>
          </template>
          <i-smiling-face theme="outline" size="17" fill="#333" style="padding: 0 3.5px"/>
        </a-popover>
      </div>
      <div class="right-box">
        <a-button type="primary" :disabled="disabled" @click="handleSubmit">发表评论</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from 'vue';
  import Emoji from '@/components/common/utils/emoji/index.vue';

  const props = defineProps({
    placeholder: {
      type: String,
      default: "请输入内容..."
    }
  })

  const disabled = computed(() => !value.value)

  const value = ref<string>("");

  function handleSubmit() {

  }

  function emojiHandler(emoji) {
    const textarea = document.querySelector(".reply-editor")?.querySelector("textarea");
    if (textarea) {// 获取鼠标位置
      // 获取选中的内容
      const selection = window.getSelection()?.toString();
      // 获取鼠标位置
      let endPoint = textarea.selectionStart;

      // 根据鼠标位置分割旧文本
      // 前半部分
      const prefixStr = textarea.value.substring(0, endPoint);
      // 后半部分
      const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

      textarea.value = `${prefixStr}${emoji}${suffixStr}`;
      setTimeout(() => {
        endPoint = endPoint + 1;
        textarea.setSelectionRange(endPoint, endPoint);
        textarea.focus();
      }, 0);
    }
  }
</script>

<style lang="scss" scoped>
  .reply-editor {
    textarea {
      border-radius: 4px;
    }

    .action-box {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;

      .left-box {

      }
    }
  }
</style>

<style lang="scss">
  .reply-editor-popover {
    .ant-popover-inner-content {
      padding: 4px !important;
    }
  }
</style>
