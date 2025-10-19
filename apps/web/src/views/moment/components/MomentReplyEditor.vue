<template>
  <div class="reply-editor">
    <div class="editor-box">
      <div v-if="!isLogin" class="login-mask" @click="toLogin" />
      <VueContentEditor
        ref="richEditorRef"
        v-model="reply.content"
        :row="1"
        :max-length="300"
        :placeholder="placeholder"
        :auto-focus="autoFocus"
        @on-paste-image="onPasteImage"
      />
    </div>
    <div v-if="reply.images?.length" class="image-wrapper">
      <div v-for="(item, index) in reply.images" :key="item" class="image-item">
        <img :src="item.thumb || item" :alt="item.name">
        <div class="image-delete" @click="onImageDelete(index)">
          <i-close
            theme="outline"
            size="10"
            fill="currentColor"
            :stroke-width="2"
          />
        </div>
      </div>
    </div>
    <div class="reply-box-bottom">
      <a-popover
        placement="bottomLeft"
        overlay-class-name="emoji-picker-popover"
        :get-popup-container="(triggerNode: Element) => triggerNode.parentNode"
        :visible="emojiVisible"
      >
        <template #content>
          <EmojiPicker v-on-click-outside="onEmojiClose" @on-image-pick="onImagePick" @on-emoji-pick="onEmojiPick" />
        </template>
        <div v-login="onClickEmoji" class="tool-item" style="cursor: pointer">
          <i-emotion-happy
            theme="outline"
            size="16"
            fill="currentColor"
            :stroke-width="3"
          />
          <span class="tool-title">表情</span>
        </div>
      </a-popover>
      <UploadFile
        ref="UploadFileRef"
        v-model="reply.images"
        accept=".jpg, .jpeg, .png, .JPG, .PNG"
        :max-size="maxFileSize"
        :max-num="maxFileNum"
        :disabled="uploadDisabled"
        :config="{ data: { base: 'moment/images' } }"
      >
        <div class="tool-item item-upload-image" @click="onCheckLogin">
          <i-add-picture
            theme="outline"
            size="16"
            fill="currentColor"
            :stroke-width="3"
          />
          <span class="tool-title">图片</span>
        </div>
      </UploadFile>
      <a-button
        type="primary"
        :loading="loading"
        :disabled="!isLogin || !currentLength || contentLengthExceed"
        class="submit-btn"
        @click="onSubmit"
      >
        发表评论
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MomentReplyEditor',
};
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import VueContentEditor from '@youyu/shared/components-vue/contenteditable/VueContentEditor.vue';
import EmojiPicker from '@youyu/shared/components-vue/emoji/EmojiPicker.vue';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { useStore } from 'vuex';
import { onCheckLogin } from '@/assets/utils/utils';
import type { FileExtend } from '@/components/common/utils/upload/types';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import { transformHTMLToTag } from '../../../../../../packages/shared/components-vue/emoji/youyu_emoji';

const { getters, commit, dispatch } = useStore();

const props = defineProps({
  placeholder: {
    type: String,
  },
  autoFocus: {
    type: Boolean,
    default: true,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['saveSuccess']);

const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);

interface MomentReply {
  userId: number;
  content: string;
  images: Array<FileExtend>;
}

const maxFileNum = 1;
const maxFileSize = 20;
const emojiVisible = ref(false);
const richEditorRef = ref<InstanceType<typeof VueContentEditor> | null>(null);
const UploadFileRef = ref<InstanceType<typeof UploadFile> | null>(null);
const reply: MomentReply = reactive({
  userId: userInfo.value.id,
  content: '',
  images: [],
});
const uploadDisabled = computed(() => reply.images.length >= 1 || !isLogin.value);
const currentLength = computed(() => richEditorRef.value?.totalStrLength);
const contentLengthExceed = computed(() => richEditorRef.value?.contentLengthExceed);

const loading = ref<boolean>(false);

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
  reply.images.splice(index, 1);
};

const toLogin = () => {
  commit('changeLogin', true);
};

const onSubmit = async () => {
  // 上传图片
  const form = cloneDeep(reply);
  const imagesListRes = await UploadFileRef.value?.upload();
  if (form.images?.length) {
    form.images = (imagesListRes as object[]).map(item => item.url + '?x-oss-process=style/smallThumb');
    form.images = form.images.length ? form.images.join(',') : null;
  } else {
    form.images = '';
  }

  form.content = transformHTMLToTag(form.content);
  loading.value = true;

  dispatch('createMomentComment', Object.assign({}, form, props.params))
    .then(res => {
      message.success('发布成功');
      richEditorRef.value?.clearContent();
      emit('saveSuccess', res.data);
    })
    .finally(() => {
      loading.value = false;
    });
};

const onPasteImage = (files: File[]) => {
  // 验证最大上传数量
  if (reply.images.length + files.length > maxFileNum) {
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
  reply.images.push(...validFiles);
};

defineExpose({
  reply,
});
</script>

<style lang="scss" scoped>
.reply-editor {
  .editor-box {
    position: relative;

    .login-mask {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    ::v-deep(.editor-active) {
      #box {
        min-height: 4rem !important;
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

  .reply-box-bottom {
    display: flex;
    align-items: center;
    margin-top: 12px;

    .tool-item {
      display: flex;
      align-items: center;
      margin-right: 16px;
      cursor: inherit;
      transition: 0.3s;

      .i-icon {
        position: relative;
        top: 0.5px;
      }

      .tool-title {
        padding-left: 4px;
        font-size: 13px;
      }

      &:hover {
        color: #1890ff;
      }
    }

    ::v-deep(.avatar-uploader) {
      display: flex;
    }

    .submit-btn {
      margin-left: auto;
    }
  }
}
</style>
