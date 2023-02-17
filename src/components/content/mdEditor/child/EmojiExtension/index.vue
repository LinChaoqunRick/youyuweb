<template>
  <dropdown-toolbar title="emoji" :visible="state.visible" @on-change="onChange">
    <template #overlay>
      <div class="emoji-container">
        <div class="carousel-indicators">
          <div class="carousel-button" :class="{active:index === curIndex}" @click="clickItem(index)"
               v-for="(item,index) in emojis">{{item.label}}
          </div>
        </div>
        <div class="emoji-items" @click.stop="emojiHandler">
          <div class="emoji-list" v-show="curIndex === index" v-for="(item,index) in emojis">
            <div class="emoji-item" v-for="item in item.emojis"
                 :title="item.name"
                 :key="item.codes"
                 :class="item.codes">
              {{item.char}}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #trigger>
      <i-grinning-face-with-open-mouth theme="outline" size="17" fill="#333" style="padding: 0 3.5px"/>
    </template>
  </dropdown-toolbar>
</template>

<script lang="ts" setup>
  import {ref, reactive} from 'vue';
  import type {PropType} from 'vue';
  import emojis from './data';
  import MdEditor from 'md-editor-v3';

  const DropdownToolbar = MdEditor.DropdownToolbar;

  const props = defineProps({
    editorId: {
      type: String as PropType<string>,
      default: ''
    }
  });

  const emit = defineEmits(['onChange']);

  const state = reactive({
    visible: true
  });

  const curIndex = ref(0);

  const emojiHandler = (event: Event) => {
    let emoji = event.target.innerHTML;
    // 获取输入框
    const textarea = document.querySelector(
      `#${props.editorId}-textarea`
    ) as HTMLTextAreaElement;
    // 获取选中的内容
    const selection = window.getSelection()?.toString();
    // 获取鼠标位置
    const endPoint = textarea.selectionStart;

    // 根据鼠标位置分割旧文本
    // 前半部分
    const prefixStr = textarea.value.substring(0, endPoint);
    // 后半部分
    const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

    emit('onChange', `${prefixStr}${emoji}${suffixStr}`);

    setTimeout(() => {
      textarea.setSelectionRange(endPoint, endPoint + 1);
      textarea.focus();
    }, 0);
  };

  const onChange = (visible: boolean) => {
    state.visible = visible;
  };

  function clickItem(index: number) {
    curIndex.value = index;
  }
</script>

<script lang="ts">
  export default {
    name: 'EmojiExtension'
  };
</script>

<style lang="scss" scoped>
  .emoji-container {
    border: 1px solid var(--md-border-color);
    height: 196px;
    width: 305px;
    border-radius: 4px;

    .carousel-indicators {
      padding: 3px 4px;
      display: flex;
      align-items: center;

      .carousel-button {
        padding: 2px 3px;
        cursor: pointer;
      }

      .active {
        background-color: #dedede;
        /*color: #595959;*/
        color: black;
        pointer-events: none;
        font-weight: bold;
      }
    }

    .emoji-items {
      height: 170px;
      overflow: scroll;
      padding: 0 4px 4px 4px;

      .emoji-list {
        display: flex;
        flex-wrap: wrap;
        list-style: none;

        .emoji-item {
          height: 32px;
          width: 32px;
          cursor: pointer;
          font-size: 24px;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: #eaeaea;
          }
        }
      }
    }
  }
</style>

<style>
  .md-toolbar-item {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
</style>
