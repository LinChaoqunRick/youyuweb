<template>
  <spin :spinning="spinning">
    <div class="vue-comment-editor" v-on-click-outside="onClickOutside">
      <div class="comment-editor-left">
        <a-avatar v-if="props.userMode" :size="props.avatarSize" :src="props.avatar" />
        <a-avatar v-else :size="props.avatarSize" :style="{ backgroundColor: '#1890ff', verticalAlign: 'middle' }">
          {{ form.nickname ? form.nickname?.substring(0, 3) : '游客' }}
        </a-avatar>
      </div>
      <div class="comment-editor-right">
        <div v-if="!props.userMode" class="visitor-form">
          <a-form
            ref="FormRef"
            :model="form"
            :rules="rules"
            :hide-required-mark="true"
            autocomplete="off"
            layout="inline"
            name="basic"
          >
            <a-form-item class="email-item" label="邮箱" name="email" validate-first>
              <a-input
                v-model:value="form.email"
                :maxlength="50"
                placeholder="必填：请输入邮箱"
                @blur="onFindVisitor"
              />
            </a-form-item>
            <a-form-item class="nickname-item" label="昵称" name="nickname">
              <a-input v-model:value="form.nickname" :maxlength="12" placeholder="必填：请输入昵称" />
            </a-form-item>
            <a-form-item class="homepage-item" label="主页" name="homepage">
              <a-input v-model:value="form.homepage" :maxlength="50" placeholder="选填：请输入主页" />
            </a-form-item>
          </a-form>
        </div>
        <vue-content-editor
          ref="richEditorRef"
          v-model="form.content"
          :auto-focus="autoFocus"
          :max-length="300"
          :placeholder="placeholder"
          @on-paste-image="onPasteImage"
        />
        <div v-if="form.images.length" class="comment-images">
          <div v-for="(item, index) in form.images" :key="item.thumb" class="image-item">
            <img :alt="item.name" :src="(item.thumb || item) as string" />
            <div class="image-delete" @click="onImageDelete(index)">
              <i-close :stroke-width="2" fill="currentColor" size="10" theme="outline" />
            </div>
          </div>
        </div>
        <div class="comment-editor-actions">
          <a-popover
            :get-popup-container="(triggerNode: Element) => triggerNode.parentNode"
            :visible="emojiVisible"
            overlay-class-name="emoji-picker-popover"
            placement="bottomLeft"
          >
            <template #content>
              <EmojiPicker
                v-on-click-outside="onEmojiClose"
                @on-image-pick="onImagePick"
                @on-emoji-pick="onEmojiPick"
              />
            </template>
            <div :class="{ 'action-active': emojiVisible }" class="action-item" @click="onClickEmoji">
              <i-emotion-happy :stroke-width="3" fill="currentColor" size="16" theme="outline" />
              <span class="action-title">表情</span>
            </div>
          </a-popover>
          <vue-upload
            ref="UploadRef"
            v-model="form.images"
            :config="{ data: { base: 'moment/images' } }"
            :max-num="maxFileNum"
            :max-size="maxFileSize"
            accept=".jpg, .jpeg, .png, .JPG, .PNG"
          >
            <div class="action-item item-upload-image">
              <i-add-picture :stroke-width="3" fill="currentColor" size="16" theme="outline" />
              <span class="action-title">图片</span>
            </div>
          </vue-upload>
          <a-button :disabled="!currentLength || contentLengthExceed" class="submit-btn" type="link" @click="onSubmit">
            发表评论
          </a-button>
        </div>
      </div>
    </div>
  </spin>
</template>

<script lang="ts" setup>
import VueContentEditor from '../contenteditable/VueContentEditor.vue';
import { computed, reactive, ref } from 'vue';
import { type FormInstance, message, Spin } from 'ant-design-vue';
import type { FileExtend } from '../upload/types.ts';
import { VueUpload } from '../index.ts';
import EmojiPicker from '../emoji/EmojiPicker.vue';
import { vOnClickOutside } from '@vueuse/components';
import { cloneDeep } from 'lodash';
import { transformHTMLToTag } from '../emoji/youyu_emoji.ts';
import { GET_VISITOR_BY_EMAIL } from '../../apis';
import http from '../../network';
import { checkEmail } from '../../utils/antdv-validate.ts';
import EventBus from '../../utils/event-bus.ts';
import type { Visitor } from '../../types/common';

const props = defineProps({
  userMode: { type: Boolean, default: false },
  saveUrl: { type: String, required: true },
  saveParams: { type: Object, required: true },
  avatar: { type: String, default: '' },
  avatarSize: { type: Number, default: 38 },
  placeholder: { type: String, default: '说点什么吧' },
  autoFocus: { type: Boolean, default: true },
  onSuccess: { type: Function },
});

const VISITOR_DATA: Visitor = JSON.parse(localStorage.getItem('visitor_data') || '{}');

const maxFileNum = 1;
const maxFileSize = 5;

const rules = {
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { required: true, validator: checkEmail, trigger: 'change' },
  ],
  content: [{ required: true, message: '请输入内容' }],
};

interface CommentForm {
  replyId?: number;
  content: string;
  email: string;
  nickname: string;
  homepage: string;
  images: FileExtend[];
}

type SubmitCommentForm = Omit<CommentForm, 'images'> & {
  images: string | string[];
};

const emit = defineEmits(['onClickOutside']);
const emojiVisible = ref(false);
const spinning = ref<boolean>(false);
const richEditorRef = ref<InstanceType<typeof VueContentEditor> | null>(null);
const UploadRef = ref<InstanceType<typeof VueUpload> | null>(null);
const FormRef = ref<FormInstance>();
const form = reactive<CommentForm>({
  content: '',
  email: VISITOR_DATA.email,
  nickname: VISITOR_DATA.nickname,
  homepage: VISITOR_DATA.homepage,
  images: [],
});
const currentLength = computed(() => richEditorRef.value?.totalStrLength);
const contentLengthExceed = computed(() => richEditorRef.value?.contentLengthExceed);
const isEditorActive = computed(() => !!richEditorRef.value?.active);

function onPasteImage(files: File[]) {
  // 验证最大上传数量
  if (form.images.length + files.length > maxFileNum) {
    return message.error(`最多可上传${maxFileNum}张图片`);
  }
  // 验证单个文件大小
  const maxFileByteSize = maxFileSize * 1024 * 1024;
  const validFiles: FileExtend[] = [];
  for (const file of files) {
    if (file.size > maxFileByteSize) {
      // 一个文件超过，全部退回
      return message.error(`文件大小不能大于${maxFileSize}MB`);
    } else {
      validFiles.push({
        thumb: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        originFileObj: file,
      });
    }
  }
  (form.images as FileExtend[]).push(...validFiles);
}

const onClickEmoji = () => {
  emojiVisible.value = true;
};

const onEmojiClose = () => {
  emojiVisible.value = false;
};

const onImagePick = (value: HTMLElement | string) => {
  richEditorRef.value?.insertHtml(value);
};

const onEmojiPick = (value: string) => {
  richEditorRef.value?.insertText(value);
};

const onImageDelete = (index: number) => {
  if (Array.isArray(form.images)) {
    form.images.splice(index, 1);
  }
};

const onSubmit = async () => {
  if (!props.userMode) {
    const valid = await FormRef.value!.validate();
    if (!valid) return;
  }
  const imagesListRes = await UploadRef.value!.upload();
  const copyForm: SubmitCommentForm = {
    ...cloneDeep(form),
    images: '',
  };
  copyForm.images = imagesListRes!.map(item => item.url);
  copyForm.images = copyForm.images.length ? copyForm.images.join(',') : '';
  copyForm.content = transformHTMLToTag(copyForm.content);
  spinning.value = true;

  const userModeForm = { content: copyForm.content, images: copyForm.images };
  const params = Object.assign({}, props.saveParams, props.userMode ? userModeForm : copyForm);
  http
    .post(props.saveUrl, params)
    .then(res => {
      EventBus.emit('showMessage', { type: 'success', text: '评论成功' });
      richEditorRef.value!.clearContent();
      if (props.onSuccess) {
        props.onSuccess(res.data);
      }
    })
    .finally(() => {
      spinning.value = false;
    });
};

const onFindVisitor = () => {
  const { email } = form;
  if (email) {
    FormRef.value!.validateFields('email').then(() => {
      spinning.value = true;
      http
        .post(GET_VISITOR_BY_EMAIL, { email })
        .then(res => {
          const data = res.data as CommentForm;
          if (data) {
            Object.keys(form).forEach(key => {
              // @ts-ignore
              form[key] = data[key] ?? form[key];
            });
            localStorage.setItem('visitor_data', JSON.stringify(data));
          }
        })
        .finally(() => {
          spinning.value = false;
        });
    });
  }
};

function onClickOutside() {
  emit('onClickOutside', isEditorActive.value);
}
</script>

<style lang="scss">
.vue-comment-editor {
  display: flex;
  padding: 16px 12px 6px;
  //margin-top: 6px;
  background: var(--youyu-body-background);
  //border: var(--pagination-border);
  border-radius: 4px;

  .comment-editor-left {
    padding-right: 8px;

    .ant-avatar {
      border: var(--youyu-avatar-border);
    }
  }

  .comment-editor-right {
    flex: 1;

    .visitor-form {
      display: flex;
      margin-bottom: 22px;

      .ant-form {
        width: 100%;
      }

      .ant-form-item {
        flex: 1;

        &:last-child {
          margin-inline-end: 0;
        }

        .ant-form-item-row {
          display: flex;
          flex-wrap: nowrap;
        }
      }

      .ant-form-item-control {
        div {
          &:nth-child(n + 2) {
            height: 0 !important;
          }
        }
      }
    }

    .editable-div {
      background: var(--youyu-background1);
      border: var(--pagination-border);
    }

    .comment-images {
      display: flex;
      flex-wrap: wrap;

      .image-item {
        position: relative;
        margin: 8px 8px 0 0;
        font-size: 0;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }

        .image-delete {
          position: absolute;
          top: 4px;
          right: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background: rgb(0, 0, 0, 0.4);
          border: 1px solid #c5c5c5;
          border-radius: 50%;
          cursor: pointer;

          &:hover {
            background: rgb(0, 0, 0, 0.3);
          }

          .i-icon {
            color: white;
          }
        }
      }

      .upload-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 8px 8px 8px 0;
        background: rgb(248, 248, 249, 0.2);
        border: 1px dashed #c5c5c5;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background: rgb(248, 248, 249, 0.3);
        }
      }
    }

    .comment-editor-actions {
      display: flex;
      align-items: center;
      padding-top: 4px;
      font-size: 14px;
      color: var(--youyu-text1);

      .action-item {
        display: flex;
        align-items: center;
        margin-right: 12px;
        cursor: pointer;

        &.action-active,
        &:hover {
          color: #1890ff;
        }

        .action-title {
          margin-left: 4px;
        }
      }

      .submit-btn {
        margin-left: auto;
      }
    }
  }
}
</style>
