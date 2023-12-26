<template>
  <div class="editable-div" :class="{'editor-active': active}">
    <div class="editor-content youyu-scrollbar">
      <div id="box"
           ref="box"
           :contenteditable="contenteditable"
           :placeholder="placeholder"
           @focus="onFocus"
           @blur="onBlur"
           @keyup="onKeyup"
           @keydown="onKeydown"
           @mouseup="onMouseup"
           @input="onInput"
           @paste="onPaste"
           :style="{'min-height': 2*props.row+'rem'}"
      ></div>
    </div>
    <div class="editor-bottom">
      <slot name="bottom"></slot>
      <div v-if="showLimit" class="length-limit" :class="{'exceed-error':contentLengthExceed}">
        {{ totalStrLength }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContentEditableDiv2"
}
</script>

<script setup lang="ts">
import {ref, computed, nextTick, onMounted} from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  row: {
    type: Number,
    default: 3
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  maxLength: {
    type: Number,
    default: 500
  },
  showLimit: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const contenteditable = ref<boolean>(true);
const box = ref<HTMLElement | null>(null);
const totalStrLength = ref<number>(0);
const active = computed(() => focusActive.value || totalStrLength.value);
const focusActive = ref<boolean>(false);
let currentRange = null;
let _parentElem = null;
const supportRange = typeof document.createRange === "function";
const contentLengthExceed = computed(() => totalStrLength.value > props.maxLength);

onMounted(() => {
  box.value.innerHTML = props.modelValue;
  calcTextAreaLength();
  if (props.autoFocus) {
    box.value.focus();
  }
})

const onFocus = () => {
  focusActive.value = true;
};
const onBlur = () => {
  focusActive.value = false;
  updateModelValue();
};
const onKeydown = (e) => {
  //  因为先执行keydownup事件 当到达长度后重新计算字符数 避免到达字符限制输入框无法输入
  // 换行 空格  以及字符超出最大限制  禁止输入    超出最大限制后除了退格其他都不可以输入
  contenteditable.value = !(totalStrLength.value >= props.maxLength && e.keyCode !== 8);
  if (!contenteditable.value) {
    e.preventDefault();
  }
  setTimeout(() => {
    contenteditable.value = true;
    nextTick(() => {
      box.value.focus();
    });
  });
};
const onKeyup = (e) => {
  saveSelection();
};
const onMouseup = () => {
  saveSelection();
};
const onInput = (e) => {
  calcTextAreaLength();
};
// 计算输入框的字数
const calcTextAreaLength = () => {
  let reg = /<img[^>]*>/gi;
  let stringHtml = box.value.innerHTML;
  let stringText = box.value.innerText; //  拿到输入框中字符长度
  let emojiArr = stringHtml.match(reg) || [];
  totalStrLength.value = stringText.length + emojiArr.length;
  return stringText.length + emojiArr.length;
};
const saveSelection = () => {
  currentRange = getCurrentRange();
};
const updateModelValue = () => {
  emit("update:modelValue", box.value?.innerHTML);
};
const insertHtml = (html) => {
  box.value.focus();
  // 创建一个新的选区
  const selection = window.getSelection();
  // 如果光标位置原来就存在，就用原来的。
  // 原来不存在，就重新创建一个
  const range = currentRange ?? selection.getRangeAt(0);
  // 插入表情图标
  range.insertNode(html.cloneNode());
  // 插入后，光标显示在表情图片后面
  range.collapse();
  // 移除其他的区域
  selection.removeAllRanges();
  // 把带有表情图片的区域插入到选区内
  selection.addRange(range);
  dispatchInputEvent();
};
const insertText = (text) => {
  box.value.focus();
  const selection = window.getSelection();
  const range = currentRange ?? selection.getRangeAt(0);
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.collapse();
  selection.removeAllRanges();
  selection.addRange(range);
  dispatchInputEvent();
};
const getCurrentRange = () => {
  let selection,
    range,
    txt = box.value;
  if (supportRange) {
    selection = document.getSelection();
    if (selection.getRangeAt && selection.rangeCount) {
      range = document.getSelection().getRangeAt(0);
      _parentElem = range.commonAncestorContainer;
    }
  } else {
    range = document.selection.createRange();
    _parentElem = range.parentElement();
  }
  // && (avalon.contains(txt, _parentElem)
  if (_parentElem || txt === _parentElem) {
    _parentElem = txt;
    return range;
  }
  return range;
};
const onPaste = (e) => {
  e.stopPropagation();
  e.preventDefault();
  let text = '', event = (e.originalEvent || e);
  if (event.clipboardData && event.clipboardData.getData) {
    text = event.clipboardData.getData('text/plain');
  } else if (window.clipboardData && window.clipboardData.getData) {
    text = window.clipboardData.getData('Text');
  }
  if (totalStrLength.value + text.length > props.maxLength) {
    return false;
  } else {
    insertText(text);
    dispatchInputEvent();
  }
};
const clearContent = () => {
  box.value.innerHTML = '';
  calcTextAreaLength();
}
const dispatchInputEvent = () => {
  const inputEvent = new Event('input', {bubbles: false, cancelable: false});
  box.value.dispatchEvent(inputEvent);
};


defineExpose({
  totalStrLength,
  active,
  insertHtml,
  insertText,
  clearContent
})
</script>

<style lang="scss" scoped>
.editable-div {
  background: var(--youyu-background5);
  transition: .2s;
  line-height: 2rem;
  min-height: 2rem;
  border: 1px solid transparent;
  border-radius: 2px;

  &.editor-active {
    border-color: #1890ff !important;

    ::v-deep(#box) {
      &[contenteditable]:empty:before {
        color: #adb2bc !important;
      }
    }
  }

  .editor-content {
    position: relative;
    max-height: 180px;
    overflow-y: auto;
    word-wrap: break-word;

    #box {
      position: relative;
      font-size: 14px;
      line-height: 24px;
      /*min-height: 80px;*/
      outline: none;
      padding: 5px 10px;
      box-sizing: content-box;
      white-space: pre-wrap;
      transition: .2s;

      &[contenteditable]:empty:before {
        content: attr(placeholder);
        color: #8a919f;
        cursor: text;
      }

      img {
        vertical-align: sub;
        height: 24px;
        cursor: default;
        margin: 0 2px;
      }
    }
  }

  .editor-bottom {
    display: flex;
    align-items: center;

    .length-limit {
      margin-left: auto;
      font-size: 13px;
      color: var(--youyu-text1);

      &.exceed-error {
        color: #ff0000;
      }
    }
  }
}

.editor-active {
  background: var(--youyu-background1);
}
</style>
