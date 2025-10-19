<template>
  <div class="vue-comment-editor">
    <div class="comment-editor-left">
      <a-avatar v-if="props.isLogin" :size="props.avatarSize" :src="props.avatar" />
      <a-avatar v-else :size="props.avatarSize" :style="{ backgroundColor: '#1890ff', verticalAlign: 'middle' }">
        {{ form.nickname ? form.nickname?.substring(0, 3) : '游客' }}
      </a-avatar>
    </div>
    <div class="comment-editor-right">
      <div v-if="!props.isLogin" class="visitor-form">
        <a-form ref="FormRef" :model="form" :rules="rules" autocomplete="off" layout="inline" name="basic">
          <a-form-item class="email-item" label="邮箱" name="email" validate-first>
            <a-input v-model:value="form.email" :maxlength="50" placeholder="必填：请输入邮箱" @blur="onFindVisitor" />
          </a-form-item>
          <a-form-item class="nickname-item" label="昵称" name="nickname">
            <a-input v-model:value="form.nickname" :maxlength="12" placeholder="必填：请输入昵称" />
          </a-form-item>
          <a-form-item class="homepage-item" label="主页" name="homepage">
            <a-input v-model:value="form.homepage" :maxlength="50" placeholder="选填：请输入主页" />
          </a-form-item>
        </a-form>
      </div>
      <VueContentEditor
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
            <EmojiPicker v-on-click-outside="onEmojiClose" @on-image-pick="onImagePick" @on-emoji-pick="onEmojiPick" />
          </template>
          <div :class="{ 'action-active': emojiVisible }" class="action-item" @click="onClickEmoji">
            <i-emotion-happy :stroke-width="3" fill="currentColor" size="16" theme="outline" />
            <span class="action-title">表情</span>
          </div>
        </a-popover>
        <vue-upload
          ref="UploadFileRef"
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
        <a-button
          :disabled="!currentLength || contentLengthExceed"
          :loading="loading"
          class="submit-btn"
          type="link"
          @click="onSubmit"
        >
          发表评论
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueContentEditor from '../contenteditable/VueContentEditor.vue';
import { computed, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { FileExtend } from '../upload/types.ts';
import { VueUpload } from '../index.ts';
import EmojiPicker from '../emoji/EmojiPicker.vue';
import { vOnClickOutside } from '@vueuse/components';
import { cloneDeep } from 'lodash';
import { transformHTMLToTag } from '../emoji/youyu_emoji.ts';
import UploadFile from '../../../../apps/web/src/components/common/utils/upload/UploadFile.vue';
import { checkEmail } from '../../../../apps/web/src/libs/validate/validate.ts';

const props = defineProps({
  avatar: { type: String, default: '' },
  avatarSize: { type: Number, default: 32 },
  isLogin: { type: Boolean, required: true },
  placeholder: { type: String, default: '说点什么吧' },
  autoFocus: { type: Boolean, default: true },
  params: { type: Object, required: true }
});

const maxFileNum = 1;
const maxFileSize = 5;

const rules = {
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { required: true, validator: checkEmail, trigger: 'change' }
  ],
  content: [{ required: true, message: '请输入内容' }]
};

interface CommentForm {
  content: string;
  email: string;
  nickname: string;
  homepage: string;
  images: FileExtend[] | string[] | string;
}

const emojiVisible = ref(false);
const loading = ref<boolean>(false);
const richEditorRef = ref<InstanceType<typeof VueContentEditor> | null>(null);
const UploadFileRef = ref<InstanceType<typeof UploadFile> | null>(null);
const form = reactive<CommentForm>({
  content: '',
  email: '',
  nickname: '',
  homepage: '',
  images: []
});
const currentLength = computed(() => richEditorRef.value?.totalStrLength);
const contentLengthExceed = computed(() => richEditorRef.value?.contentLengthExceed);

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
        originFileObj: file
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
  // 上传图片
  const copyForm = cloneDeep(form);
  const imagesListRes = await UploadFileRef.value?.upload();
  if (copyForm.images?.length) {
    copyForm.images = imagesListRes!.map(item => item.url);
    copyForm.images = copyForm.images.length ? copyForm.images.join(',') : '';
  } else {
    copyForm.images = '';
  }

  copyForm.content = transformHTMLToTag(copyForm.content);
  loading.value = true;
};

const onFindVisitor = () => {
  // const { email } = formState;
  // if (email) {
  //   FormRef.value!.validateFields('email').then(() => {
  //     spinning.value = true;
  //     dispatch('getVisitorByEmail', { email })
  //       .then(res => {
  //         const { data } = res;
  //         if (data) {
  //           Object.keys(formState).forEach(key => {
  //             formState[key] = data[key];
  //           });
  //         }
  //       })
  //       .finally(() => {
  //         spinning.value = false;
  //       });
  //   });
  // }
};
</script>

<style lang="scss">
.vue-comment-editor {
  display: flex;
  padding: 16px 12px 6px;
  margin-top: 6px;
  border: var(--pagination-border);
  border-radius: 8px;

  .comment-editor-left {
    padding-right: 12px;
  }

  .comment-editor-right {
    flex: 1;

    .visitor-form {
      display: flex;
      margin-bottom: 20px;

      .ant-form {
        width: 100%;
      }

      .ant-form-item {
        &.nickname-item,
        &.email-item,
        &.homepage-item {
          flex: 1;
        }

        &:last-child {
          margin-inline-end: 0;
        }
      }
    }

    .editable-div {
      background: none;
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
