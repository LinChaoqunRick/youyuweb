<template>
  <div class="moment-editor" :class="{'editor-active': active}">
    <div class="editor-body">
      <div class="login-mask" @click="toLogin" v-if="!isLogin"></div>
      <div class="editor-content-wrapper">
        <ContentEditableDiv v-model="form.content"
                            showLimit
                            placeholder="此刻在想什么..."
                            ref="richEditor">
          <template #bottom>
            <div class="topic-wrapper">
              <!--<div class="now-mood">
                <i-ulikecam theme="multi-color" size="13" :fill="['#1890ff' ,'#fff' ,'#1890ff' ,'#1890ff']"/>
                <span class="mood-text">现在的心情</span>
                <i-right theme="outline" size="13" fill="currentColor"/>
              </div>-->
            </div>
          </template>
        </ContentEditableDiv>
      </div>
    </div>
    <div class="image-wrapper" v-if="form.images?.length">
      <div v-for="item in form.images" class="image-item">
        <img :src="item"/>
        <div class="image-delete" @click="onImageDelete(index)">
          <i-close theme="outline" size="10" fill="currentColor" :strokeWidth="2"/>
        </div>
      </div>
      <UploadFile accept=".jpg, .jpeg, .png"
                  @uploadSuccess="uploadSuccess"
                  :disabled="uploadDisabled"
                  v-if="!uploadDisabled">
        <div class="upload-image">
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
            <EmojiPicker @onImagePick="onImagePick" @onEmojiPick="onEmojiPick" v-on-click-outside="onEmojiClose"/>
          </template>
          <div class="tool-item" v-login="onClickEmoji">
            <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
            <span class="tool-title">表情</span>
          </div>
        </a-popover>
        <UploadFile accept=".jpg, .jpeg, .png" @uploadSuccess="uploadSuccess" :disabled="uploadDisabled">
          <div class="tool-item item-upload-image" v-login>
            <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
            <span class="tool-title">图片</span>
          </div>
        </UploadFile>
        <!--<div class="tool-item" @click="onCheckLogin">
          <i-topic theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">话题</span>
        </div>-->
      </div>
      <a-button type="primary" :disabled="!isLogin || !currentLength || contentLengthExceed" :loading="submitLoading"
                @click="onSubmit">
        发布
      </a-button>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed, toRaw} from 'vue';
import {useStore} from "vuex";
import {message} from 'ant-design-vue';
import {cloneDeep} from 'lodash';
import {vOnClickOutside} from '@vueuse/components'
import {onCheckLogin} from "@/assets/utils/utils";
import {transformHTMLToTag} from "@/components/common/utils/emoji/youyu_emoji";
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import EmojiPicker from "@/components/common/utils/emoji/EmojiPicker.vue";
import ContentEditableDiv from "@/components/common/utils/contenteditable/ContentEditableDiv.vue";

const props = defineProps({
  form: {
    type: Object,
    default() {
      return reactive({
        content: '',
        images: []
      })
    }
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['saveSuccess']);

const maxLength = 500;
const {getters, commit, dispatch} = useStore();
const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);
const currentLength = computed(() => richEditor.value?.totalStrLength);
const contentLengthExceed = computed(() => richEditor.value?.contentLengthExceed);
const uploadDisabled = computed(() => props.form.images.length >= 9 || !isLogin.value)

const richEditor = ref(null);
const active = computed(() => richEditor.value?.active);
const emojiVisible = ref(false);
const submitLoading = ref(false);
let position = '';

const uploadSuccess = (fileList: []) => {
  const url = fileList[0].url + '?x-oss-process=style/smallThumb';
  props.form.images.push(url);
}

const toLogin = () => {
  commit("changeLogin", true);
}

const onImageDelete = (index: number) => {
  props.form.images.splice(index, 1);
}

const onSubmit = () => {
  submitLoading.value = true;
  const isEdit = props.isEdit;
  const form = cloneDeep(props.form);
  form.images = form.images.length ? form.images.join(",") : null;
  form.content = transformHTMLToTag(form.content);
  dispatch(isEdit ? 'updateMoment' : 'createMoment', form).then(res => {
    message.success(isEdit ? "修改成功" : "发布成功");
    resetEditor();
    emit('saveSuccess', res.data);
  }).finally(() => {
    submitLoading.value = false;
  })
}

const resetEditor = () => {
  props.form.content = '';
  props.form.images = [];
  richEditor.value.clearContent();
}

const onImagePick = (value: HTMLElement | string) => {
  richEditor.value.insertHtml(value)
}

const onEmojiPick = (value: string) => {
  richEditor.value.insertText(value)
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
    background: var(--youyu-background5);
    border-radius: 2px;
    transition: .3s;

    .login-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
    }

    .editor-content-wrapper {
      position: relative;
      margin-bottom: 2px;
      max-height: 216px;
      overflow-y: auto;
      word-wrap: break-word;

      ::v-deep(.editable-div) {
        .editor-bottom {
          padding: 4px 12px;
        }
      }
    }

    .topic-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .now-mood {
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
    position: relative;
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
    background: var(--youyu-background1) !important;

    .now-mood {
      background: #eaf2ff !important;
    }
  }
}

::v-deep(.ant-upload-disabled) {
  cursor: not-allowed !important;

  .item-upload-image {
    /*color: #8a919f !important;*/
  }
}
</style>

<style lang="scss">
.emoji-picker-popover {
  z-index: 9;

  .ant-popover-inner-content {
    padding: 0;
  }
}
</style>
