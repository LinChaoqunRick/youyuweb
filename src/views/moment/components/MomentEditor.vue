<template>
  <div class="moment-editor">
    <div class="editor-body" @blur="onBlur">
      <div class="editor-content">
        <div class="rich-editor" contenteditable></div>
      </div>
      <div class="topic-wrapper">
        1111
      </div>
    </div>
    <div class="editor-bottom">
      123
    </div>
  </div>
</template>

<script setup lang="ts">
  const onBlur = () => {
    console.log("onblur");
  }
</script>

<style lang="scss" scoped>
  .moment-editor {
    width: 720px;
    padding: 20px 20px 0;
    background-color: var(--youyu-background1);
    border-radius: 4px;

    .editor-body {
      background: #f2f3f5;
      border-radius: 4px;

      .editor-content {
        position: relative;
        margin-bottom: 2px;
        max-height: 180px;
        overflow-y: auto;
        word-wrap: break-word;

        .rich-editor {
          position: relative;
          font-size: 14px;
          line-height: 24px;
          min-height: 80px;
          outline: none;
          padding: 5px 12px;
          box-sizing: border-box;
          white-space: pre-wrap;
        }
      }

      .topic-wrapper {
        height: 32px;
        padding: 0 6px;
        display: flex;
        align-items: center;
      }

      &:focus {
        border: 1px solid #1e80ff;
        background: var(--youyu-background1);
      }
    }

    .editor-bottom {
      padding: 16px 0;
    }
  }
</style>
