<template>
  <div class="reply-editor">
    <div class="editor-box">
      <div class="login-mask" @click="toLogin" v-if="!isLogin"></div>
      <ContentEditableDiv v-model="reply.content"
                          :row="1" :maxLength="300"
                          :placeholder="placeholder"
                          :auto-focus="autoFocus"
                          @onPasteImage="onPasteImage"
                          ref="richEditorRef" />
    </div>
    <div class="image-wrapper" v-if="reply.images?.length">
      <div v-for="(item, index) in reply.images" class="image-item">
        <img :src="item.thumb || item" :alt="item.name" />
        <div class="image-delete" @click="onImageDelete(index)">
          <i-close theme="outline" size="10" fill="currentColor" :strokeWidth="2" />
        </div>
      </div>
    </div>
    <div class="reply-box-bottom">
      <a-popover placement="bottomLeft"
                 overlayClassName="emoji-picker-popover"
                 :getPopupContainer="triggerNode=>triggerNode.parentNode"
                 :visible="emojiVisible">
        <template #content>
          <EmojiPicker
            @onImagePick="onImagePick"
            @onEmojiPick="onEmojiPick"
            v-on-click-outside="onEmojiClose" />
        </template>
        <div class="tool-item" v-login="onClickEmoji" style="cursor: pointer">
          <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3" />
          <span class="tool-title">表情</span>
        </div>
      </a-popover>
      <UploadFile v-model="reply.images"
                  accept=".jpg, .jpeg, .png, .JPG, .PNG"
                  :max-size="maxFileSize"
                  :max-num="maxFileNum"
                  :disabled="uploadDisabled"
                  :config="{data: { base: 'moment/images' }}"
                  ref="UploadFileRef">
        <div class="tool-item item-upload-image" @click="onCheckLogin">
          <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3" />
          <span class="tool-title">图片</span>
        </div>
      </UploadFile>
      <a-button type="primary"
                :loading="loading"
                :disabled="!isLogin || !currentLength || contentLengthExceed"
                @click="onSubmit"
                class="submit-btn">
        发表评论
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MomentReplyEditor'
};
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { onCheckLogin } from '@/assets/utils/utils';
import { vOnClickOutside } from '@vueuse/components';
import ContentEditableDiv from '@/components/common/utils/contenteditable/ContentEditableDiv.vue';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import EmojiPicker from '@/components/common/utils/emoji/EmojiPicker.vue';
import {
  transformHTMLToTag
} from '@/components/common/utils/emoji/youyu_emoji';

const { getters, commit, dispatch } = useStore();

const props = defineProps({
  placeholder: {
    type: String
  },
  autoFocus: {
    type: Boolean,
    default: true
  },
  params: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['saveSuccess']);

const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);

interface UploadFile {
  thumb: string,
  name: string,
  size: number,
  type: string,
  originFileObj: File,
}

interface MomentReply {
  userId: number,
  content: string,
  images: Array<UploadFile>
}

const maxFileNum = 1;
const maxFileSize = 20;
const emojiVisible = ref(false);
const richEditorRef = ref<InstanceType<typeof ContentEditableDiv> | null>(null);
const UploadFileRef = ref<InstanceType<typeof UploadFile> | null>(null);
const reply: MomentReply = reactive({
  userId: userInfo.value.id,
  content: '',
  images: []
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
    form.images = (imagesListRes as Object[]).map(item => item.url + '?x-oss-process=style/smallThumb');
    form.images = form.images.length ? form.images.join(',') : null;
  } else {
    form.images = '';
  }

  form.content = transformHTMLToTag(form.content);
  loading.value = true;

  dispatch('createMomentComment', Object.assign({}, form, props.params)).then((res) => {
    message.success('发布成功');
    richEditorRef.value?.clearContent();
    emit('saveSuccess', res.data);
  }).finally(() => {
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
  const validFiles: UploadFile[] = [];
  for (const file of files) {
    if (file.size > maxFileByteSize) { // 一个文件超过，全部退回
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
  reply.images.push(...validFiles);
};

defineExpose({
  reply
});
</script>

<style lang="scss" scoped>
.reply-editor {

  .editor-box {
    position: relative;

    .login-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
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

  .reply-box-bottom {
    margin-top: 12px;
    display: flex;
    align-items: center;

    .tool-item {
      display: flex;
      align-items: center;
      cursor: inherit;
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

    .submit-btn {
      margin-left: auto;
    }
  }
}
</style>
