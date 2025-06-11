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
          <i-smiling-face theme="outline" size="17" fill="currentColor" style="padding: 0 3.5px;cursor: pointer;"/>
        </a-popover>
      </div>
      <div class="right-box">
        <a-button type="primary" :disabled="disabled" :loading="submitLoading" @click="handleSubmit">发表评论</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, onMounted} from 'vue';
  import Emoji from '@/components/common/utils/emoji/index.vue';
  import {insert} from "@/assets/utils/utils";

  const props = defineProps({
    placeholder: {
      type: String,
      default: "请输入内容..."
    }
  })

  const emit = defineEmits(['handleSubmit']);

  defineExpose({
    focus
  })

  const disabled = computed(() => !value.value)

  const value = ref<string>("");
  const submitLoading = ref(false);

  function handleSubmit() {
    submitLoading.value = true;
    emit("handleSubmit", value.value, submitCallback);
  }

  function submitCallback() {
    submitLoading.value = false;
    // value.value = "";
  }

  function focus() {
    const textarea = document.querySelector(".reply-editor")?.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  }

  function emojiHandler(emoji: string) {
    const textarea = document.querySelector(".reply-editor")?.querySelector("textarea");
    if (textarea) {
      value.value = insert(textarea, emoji, {});
    }
  }

  onMounted(() => {
    const textarea = document.querySelector(".reply-editor")?.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  })
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
    .ant-popover-inner {
      padding: 4px !important;
      user-select: none;
    }
  }
</style>
