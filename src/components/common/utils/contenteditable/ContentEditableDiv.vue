<template>
  <div class="editor-body" :class="{'editor-active': active}">
    <div class="editor-content youyu-scrollbar">
      <div id="box"
           ref="box"
           :contenteditable="contenteditable"
           :placeholder="placeholder"
           @focus="onFocus"
           @blur="onBlur"
           @keyup="keyupFn"
           @keydown="keydownFn"
           @mouseup="mouseupFn"
           @input="inputFn"
           @paste="onPaste"
      ></div>
    </div>
    <div class="editor-bottom">
      <slot name="bottom"></slot>
      <div v-if="showLimit" class="length-limit" :class="{'exceed-error':contentLengthExceed}">
        {{totalStrLength}}/{{this.maxLength}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: String,
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
        default: true
      }
    },
    computed: {
      contentLengthExceed() {
        return this.totalStrLength > this.maxLength;
      }
    },
    data() {
      return {
        contenteditable: true,
        currentRange: null,
        _parentElem: null,
        supportRange: typeof document.createRange === "function",
        box: null,
        totalStrLength: 0,
        active: false
      };
    },
    methods: {
      onFocus() {
        this.active = true;
      },
      onBlur() {
        this.active = false;
      },
      // 去除粘贴文本的样式
      onPaste(e) {
        e.stopPropagation();
        e.preventDefault();
        let text = '', event = (e.originalEvent || e);
        if (event.clipboardData && event.clipboardData.getData) {
          text = event.clipboardData.getData('text/plain');
        } else if (window.clipboardData && window.clipboardData.getData) {
          text = window.clipboardData.getData('Text');
        }
        if (this.totalStrLength + text.length > this.maxLength) {
          return;
        }
        if (document.queryCommandSupported('insertText')) {
          document.execCommand('insertText', false, text);
        } else {
          document.execCommand('paste', false, text);
        }
      },
      inputFn(e) {
        this.calcTextAreaLength();
        this.updateModelValue();
      },
      // 计算输入框的字数
      calcTextAreaLength() {
        let reg = /<img[^>]*>/gi;
        let stringHtml = this.box.innerHTML;
        let stringText = this.box.innerText; //  拿到输入框中字符长度
        let emojiArr = stringHtml.match(reg) || [];
        this.totalStrLength = stringText.length + emojiArr.length;
        return stringText.length + emojiArr.length;
      },
      keydownFn(e) {
        //  因为先执行keydownup事件 当到达长度后重新计算字符数 避免到达字符限制输入框无法输入
        // 换行 空格  以及字符超出最大限制  禁止输入    超出最大限制后除了退格其他都不可以输入
        this.contenteditable = !(this.totalStrLength >= this.maxLength && e.keyCode !== 8);
        if (!this.contenteditable) {
          e.preventDefault();
        }
        setTimeout(() => {
          this.contenteditable = true;
          this.$nextTick(() => {
            this.box.focus();
          });
        });
      },
      keyupFn(e) {
        this.saveSelection();
      },
      mouseupFn() {
        this.saveSelection();
      },
      insertImage(html) {
        this.restoreSelection();
        if (document.selection) {
          this.currentRange.pasteHTML(html);
        } else {
          this.box.focus();
          document.execCommand("insertImage", false, html);
          this.currentRange && this.currentRange.collapse(false);
        }
        this.saveSelection();
      },
      insertText(string) {
        this.restoreSelection();
        if (document.selection) {
          this.currentRange.pasteHTML(string);
        } else {
          this.box.focus();
          document.execCommand("insertText", false, string);
          this.currentRange?.collapse(false);
        }
        this.saveSelection();
      },
      getCurrentRange() {
        let selection,
          range,
          txt = this.box;
        if (this.supportRange) {
          selection = document.getSelection();
          if (selection.getRangeAt && selection.rangeCount) {
            range = document.getSelection().getRangeAt(0);
            this._parentElem = range.commonAncestorContainer;
          }
        } else {
          range = document.selection.createRange();
          this._parentElem = range.parentElement();
        }
        // && (avalon.contains(txt, _parentElem)
        if (this._parentElem || txt === this._parentElem) {
          this._parentElem = txt;
          return range;
        }
        return range;
      },
      saveSelection() {
        this.currentRange = this.getCurrentRange();
      },
      restoreSelection() {
        if (!this.currentRange) {
          return;
        }
        let selection, range;
        if (this.supportRange) {
          selection = document.getSelection();
          selection.removeAllRanges();
          selection.addRange(this.currentRange);
        } else {
          range = document.selection.createRange();
          range.setEndPoint("EndToEnd", this.currentRange);
          if (this.currentRange.text.length === 0) {
            range.collapse(false);
          } else {
            range.setEndPoint("StartToStart", this.currentRange);
          }
          range.select();
        }
      },
      updateModelValue() {
        this.$emit("update:modelValue", this.box.innerHTML);
      },
      clearContent() {
        this.box.innerHTML = '';
        this.updateModelValue();
      }
    },
    mounted() {
      this.box = document.querySelector("#box");
    },
  };
</script>

<style lang="scss" scoped>
  .editor-body {
    transition: background .2s;

    .editor-content {
      position: relative;
      margin-bottom: 2px;
      max-height: 180px;
      overflow-y: auto;
      word-wrap: break-word;

      ::v-deep(#box) {
        position: relative;
        font-size: 14px;
        line-height: 24px;
        min-height: 80px;
        outline: none;
        padding: 5px 8px 5px 12px;
        box-sizing: border-box;
        white-space: pre-wrap;

        &[contenteditable]:empty:before {
          content: attr(placeholder);
          color: #8a919f;
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
      padding: 4px 12px;

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

  }
</style>
