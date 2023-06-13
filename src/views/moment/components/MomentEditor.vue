<template>
  <div class="moment-editor" :class="{'editor-active': active}">
    <div class="editor-body">
      <div class="login-mask" @click="toLogin" v-if="!isLogin"></div>
      <div class="editor-content">
        <div class="rich-editor"
             contenteditable
             @focus="onFocus"
             @blur="onBlur"
             @input="onInput"
             placeholder="此刻在想什么..."
             ref="richEditor"></div>
      </div>
      <div class="topic-wrapper">
        <div class="now-mood">
          <i-ulikecam theme="multi-color" size="13" :fill="['#1890ff' ,'#fff' ,'#1890ff' ,'#1890ff']"/>
          <span class="mood-text">现在的心情</span>
          <i-right theme="outline" size="13" fill="currentColor"/>
        </div>
        <div class="word-counter">{{currentLength}}/{{maxLength}}</div>
      </div>
    </div>
    <div class="image-wrapper" v-if="moment.images?.length">
      <div v-for="item in moment.images" class="image-item">
        <img :src="item"/>
        <div class="image-delete" @click="onImageDelete(index)">
          <i-close theme="outline" size="10" fill="currentColor" :strokeWidth="2"/>
        </div>
      </div>
      <UploadFile accept=".jpg, .jpeg, .png"
                  @uploadSuccess="uploadSuccess"
                  :disabled="uploadDisabled"
                  v-if="!uploadDisabled">
        <div class="upload-image" @click="onUpload">
          <i-plus theme="outline" size="40" fill="currentColor" :strokeWidth="1"/>
        </div>
      </UploadFile>
    </div>
    <div class="editor-bottom">
      <div class="tool-items">
        <a-popover placement="bottomLeft"
                   overlayClassName="emoji-picker-popover"
                   :getPopupContainer="triggerNode=>triggerNode.parentNode"
                   :visible="emojiVisible">
          <template #content>
            <EmojiPicker @onPick="onPick" v-on-click-outside="onEmojiClose"/>
          </template>
          <div class="tool-item" @click="onClickEmoji">
            <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
            <span class="tool-title">表情</span>
          </div>
        </a-popover>
        <UploadFile accept=".jpg, .jpeg, .png" @uploadSuccess="uploadSuccess" :disabled="uploadDisabled">
          <div class="tool-item item-upload-image" @click="onCheckLogin">
            <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
            <span class="tool-title">图片</span>
          </div>
        </UploadFile>
        <div class="tool-item" @click="onCheckLogin">
          <i-topic theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">话题</span>
        </div>
      </div>
      <a-button type="primary" :disabled="!isLogin || !currentLength" @click="onSubmit">发布</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, computed, toRaw} from 'vue';
  import {useStore} from "vuex";
  import {message} from 'ant-design-vue';
  import {cloneDeep} from 'lodash';
  import {vOnClickOutside} from '@vueuse/components'
  import {setPosition} from "@/assets/utils/utils";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
  import EmojiPicker from "@/components/common/utils/emoji/EmojiPicker.vue";

  const emit = defineEmits(['saveSuccess']);

  const {getters, commit, dispatch} = useStore();
  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);
  const maxLength = 500;
  const currentLength = computed(() => moment.content.length);
  const uploadDisabled = computed(() => moment.images.length >= 9)

  const richEditor = ref(null);
  const active = ref(false);
  const emojiVisible = ref(false);
  let position = '';
  const moment = reactive({
    userId: '',
    content: '',
    images: [
      /*'https://youyu-source.oss-cn-beijing.aliyuncs.com/avatar/10000/20210203110431mario.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',
      'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2023/0513/20230513105651_%E5%A3%81%E7%BA%B81.jpg',*/
    ]
  });

  const onFocus = () => {
    active.value = true;
  }
  const onBlur = () => {
    active.value = false;
    position = window.getSelection().getRangeAt(0);
  }

  const onInput = ($event: Event) => {
    const content = $event.target.innerText;
    if (content.length >= maxLength + 1) {
      $event.preventDefault();
      $event.target.innerHTML = moment.content;
      $event.target.blur();
      // $event.target.focus();
      // let range = window.getSelection();
      // range.selectAllChildren($event.target);
      // range.collapseToEnd();
    } else {
      moment.content = content;
    }
  }

  const uploadSuccess = (fileList: []) => {
    const url = fileList[0].url + '?x-oss-process=style/smallThumb';
    moment.images.push(url);
  }

  const toLogin = () => {
    commit("changeLogin", true);
  }

  const onImageDelete = (index: number) => {
    moment.images.splice(index, 1);
  }

  const onSubmit = () => {
    const form = cloneDeep(moment);
    form.userId = userInfo.value.id;
    form.images = form.images.length ? form.images.join(",") : null;
    dispatch('createMoment', form).then(res => {
      message.success("发布成功");
      resetEditor();
      emit('saveSuccess', toRaw(res.data));
    })
  }

  const resetEditor = () => {
    moment.userId = '';
    moment.content = '';
    moment.images = [];
    richEditor.value.innerHTML = '';
  }

  const onPick = (value: HTMLElement | string) => {
    richEditor.value.focus();
    if (position === '') {
      // 如果div没有光标，则在div内容末尾插入
      const range = window.getSelection();
      range.selectAllChildren(richEditor.value)
      range.collapseToEnd()
      position = window.getSelection().getRangeAt(0);
    }
    position.insertNode(value);
  }


  const onCheckLogin = (e: Event) => {
    if (!isLogin.value) {
      commit("changeLogin", true);
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }

      if (e && e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
    }
  }

  const onClickEmoji = () => {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    emojiVisible.value = true;
  }

  const onEmojiClose = () => {
    emojiVisible.value = false;
  }
</script>

<style lang="scss" scoped>
  .moment-editor {
    width: 750px;
    padding: 20px 20px 0;
    background-color: var(--youyu-background1);
    border-radius: 4px;

    .editor-body {
      position: relative;
      background: var(--youyu-background2);
      border-radius: 4px;
      transition: .3s;
      border: 1px solid transparent;

      .login-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
      }

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

          &[contenteditable]:empty:before {
            content: attr(placeholder);
            color: #8a919f;
          }
        }
      }

      .topic-wrapper {
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

        .word-counter {
          font-size: 13px;
          color: var(--youyu-text1);
          padding-right: 10px;
        }
      }
    }

    .image-wrapper {
      display: flex;
      flex-wrap: wrap;

      .image-item {
        position: relative;
        margin: 8px 8px 0 0;

        img {
          height: 80px;
          width: 80px;
          object-fit: cover;
        }

        .image-delete {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 18px;
          height: 18px;
          position: absolute;
          top: 4px;
          right: 4px;
          border-radius: 50%;
          border: 1px solid #c5c5c5;
          background: rgba(0, 0, 0, .4);

          &:hover {
            background: rgba(0, 0, 0, .3);
          }

          .i-icon {
            color: white;
          }
        }
      }

      .upload-image {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        border: 1px dashed #c5c5c5;
        margin: 8px 8px 8px 0;
        background: rgba(248, 248, 249, 0.2);
        transition: .3s;

        &:hover {
          background: rgba(248, 248, 249, 0.3);
        }
      }
    }

    .editor-bottom {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

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

        ::v-deep(.avatar-uploader) {
          display: flex;
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

  ::v-deep(.ant-upload-disabled) {
    cursor: not-allowed !important;

    .item-upload-image {
      color: #8a919f !important;
    }
  }
</style>

<style lang="scss">
  .emoji-picker-popover {
    .ant-popover-inner-content {
      padding: 0;
    }
  }

  .rich-editor {
    img {
      vertical-align: sub;
      height: 24px;
      cursor: default;
      margin: 0 2px;
    }
  }
</style>
