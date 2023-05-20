<template>
  <div class="moment-editor" :class="{'editor-active': active}">
    <div class="editor-body">
      <div class="editor-content">
        <div class="rich-editor" contenteditable @focus="onFocus" @blur="onBlur" :maxLength="10"></div>
      </div>
      <div class="topic-wrapper">
        <div class="now-mood">
          <i-ulikecam theme="multi-color" size="13" :fill="['#1890ff' ,'#fff' ,'#1890ff' ,'#1890ff']"/>
          <span class="mood-text">现在的心情</span>
          <i-right theme="outline" size="13" :fill="currentColor"/>
        </div>
      </div>
    </div>
    <div class="editor-bottom">
      <div class="tool-items">
        <div class="tool-item">
          <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">表情</span>
        </div>
        <div class="tool-item">
          <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">图片</span>
        </div>
        <div class="tool-item">
          <i-topic theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">话题</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  const active = ref(false);

  const onFocus = () => {
    active.value = true;
  }
  const onBlur = () => {
    active.value = false;
  }
</script>

<style lang="scss" scoped>
  .moment-editor {
    width: 720px;
    padding: 20px 20px 0;
    background-color: var(--youyu-background1);
    border-radius: 4px;

    .editor-body {
      background: var(--youyu-background2);
      border-radius: 4px;
      transition: .3s;
      border: 1px solid transparent;

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
        display: flex;
        align-items: center;
        font-size: 12px;

        .now-mood {
          margin-left: 12px;
          margin-bottom: 8px;
          padding: 0 6px;
          line-height: 24px;
          border-radius: 50px;
          border-bottom-left-radius: 0;
          background: #fff;
          color: #1e80ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .3s;

          .i-icon {
            position: relative;
            top: 1px;
          }

          .mood-text {
            padding-left: 4px;
          }
        }
      }
    }

    .editor-bottom {
      padding: 16px 0;

      .tool-items {
        display: flex;
        align-items: center;
        color: var(--youyu-text2);

        .tool-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 16px;
          transition: .3s;

          .i-icon {
            position: relative;
            top: .5px;
          }

          .tool-title {
            font-size: 13px;
            padding-left: 4px;
          }

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

  .editor-active {
    .editor-body {
      border-color: #1890ff;
      background: var(--youyu-background1);

      .now-mood {
        background: #eaf2ff !important;
      }
    }
  }
</style>
