<template>
  <div class="moment-editor" :class="{ active: active }">
    <div class="editor-body">
      <div class="login-mask" @click="toLogin" v-if="!isLogin"></div>
      <div class="editor-content-wrapper">
        <ContentEditableDiv
          v-model="form.content"
          showLimit
          placeholder="此刻在想什么？快来分享一些新鲜事或发表一些看法吧！"
          @onPasteImage="onPasteImage"
          ref="richEditor"
        >
          <template #bottom>
            <div class="topic-wrapper">
              <div class="add-position" @click="onAddPosition">
                <div class="icon-wrapper">
                  <i-local-two theme="multi-color" size="12" :fill="['#ffffff', '#ffffff', '#3b8fff', '#3b8fff']" />
                </div>
                <span class="position-text">{{ form.location || '添加位置' }}</span>
                <div class="icon-wrapper-close" v-if="form.location" @click.stop="onClearLocation">
                  <i-close-small theme="outline" size="13" fill="#fff" :strokeWidth="3" />
                </div>
                <i-right v-else theme="outline" size="13" fill="currentColor" />
              </div>
            </div>
          </template>
        </ContentEditableDiv>
      </div>
    </div>
    <div class="image-wrapper" v-if="form.images?.length">
      <draggable
        class="list-group"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="form.images"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :item-key="element => element"
      >
        <template #item="{ element, index }">
          <ImageItem :data="element" :progress="progressList[index]" @on-image-delete="onImageDelete(index)" />
        </template>
      </draggable>
      <div class="upload-image" @click="onAddImage" v-if="!uploadDisabled">
        <i-plus theme="outline" size="40" fill="currentColor" :strokeWidth="1" />
      </div>
    </div>
    <div class="editor-bottom">
      <div class="tool-items">
        <a-popover
          placement="bottomLeft"
          overlayClassName="emoji-picker-popover"
          :getPopupContainer="triggerNode => triggerNode.parentNode"
          :open="emojiVisible"
        >
          <template #content>
            <EmojiPicker @onImagePick="onImagePick" @onEmojiPick="onEmojiPick" v-on-click-outside="onEmojiClose" />
          </template>
          <div class="tool-item" v-login="onClickEmoji">
            <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3" />
            <span class="tool-title">表情</span>
          </div>
        </a-popover>
        <UploadFile
          v-model="form.images"
          accept=".jpg, .jpeg, .png, .JPG, .PNG, .HEIC"
          :max-size="maxFileSize"
          :max-num="maxFileNum"
          :disabled="uploadDisabled"
          multiple
          :config="{ data: { base: 'moment/images' } }"
          :auto-clear="false"
          @onProgress="onUploadProgress"
          ref="UploadFileRef"
        >
          <div class="tool-item item-upload-image" v-login>
            <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3" />
            <span class="tool-title">图片</span>
          </div>
        </UploadFile>
      </div>
      <a-button
        type="primary"
        :disabled="!isLogin || !currentLength || contentLengthExceed"
        :loading="submitLoading"
        @click="onSubmit"
      >
        发布
      </a-button>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { vOnClickOutside } from '@vueuse/components';
import draggable from 'vuedraggable';
import openModal from '@/libs/tools/openModal';
import { transformHTMLToTag } from '@/components/common/utils/emoji/youyu_emoji';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import EmojiPicker from '@/components/common/utils/emoji/EmojiPicker.vue';
import ContentEditableDiv from '@/components/common/utils/contenteditable/ContentEditableDiv.vue';
import LocationSelector from '@/components/common/utils/aMap/LocationSelector.vue';
import { AxiosError } from 'axios';
import { getXmlTextContent } from '@/components/common/utils/upload/utils';
import ImageItem from '@/components/common/utils/upload/components/ImageItem.vue';

const props = defineProps({
  form: {
    type: Object,
    default() {
      return reactive({
        content: '',
        images: []
      });
    }
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['saveSuccess']);
const dragOptions = reactive({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
});

const maxFileNum = 9;
const maxFileSize = 20;
const { getters, commit, dispatch } = useStore();
const router = useRouter();
const isLogin = computed(() => getters['isLogin']);
const currentLength = computed(() => richEditor.value?.totalStrLength);
const contentLengthExceed = computed(() => richEditor.value?.contentLengthExceed);
const uploadDisabled = computed(() => props.form.images?.length >= maxFileNum || !isLogin.value);

const richEditor = ref<InstanceType<typeof ContentEditableDiv> | null>(null);
const UploadFileRef = ref<InstanceType<typeof UploadFile> | null>(null);
const active = computed(() => richEditor.value?.active);
const emojiVisible = ref(false);
const submitLoading = ref(false);
const drag = ref(false);
const progressList = ref<number[]>([]);

const onAddImage = () => {
  UploadFileRef.value?.triggerInput?.();
};

const toLogin = () => {
  commit('changeLogin', true);
};

const onImageDelete = (index: number) => {
  props.form.images.splice(index, 1);
};

const onSubmit = async () => {
  submitLoading.value = true;
  const isEdit = props.isEdit;
  const formData = cloneDeep(props.form);

  const imagesListRes = await UploadFileRef.value.upload();

  if (imagesListRes?.length) {
    const firstErrorItem = imagesListRes.find(item => item instanceof AxiosError);
    if (firstErrorItem) {
      submitLoading.value = false;
      return message.error(
        `发布失败：${
          firstErrorItem.response ? getXmlTextContent(firstErrorItem.response.data, 'Message') : firstErrorItem.message
        }`
      );
    }
  }

  if (formData.images?.length) {
    if (props.isEdit) {
      // 如果是编辑，添加新上传图片
      if (imagesListRes) {
        formData.images.push(...imagesListRes.map(item => item.url + '?x-oss-process=style/smallThumb'));
      }
    } else {
      // 如果是新增，直接赋值
      formData.images = imagesListRes.map(item => item.url + '?x-oss-process=style/smallThumb');
    }
    formData.images = formData.images.filter(item => typeof item === 'string');
    formData.images = formData.images.length ? formData.images.join(',') : null;
  } else {
    formData.images = '';
  }

  formData.content = transformHTMLToTag(formData.content);
  dispatch(isEdit ? 'updateMoment' : 'createMoment', formData)
    .then(res => {
      message.success(isEdit ? '修改成功' : '发布成功');
      resetEditor();
      emit('saveSuccess', res.data);
      if (isEdit) {
        router.replace({
          name: 'MomentDetail',
          params: { momentId: props.formData.id }
        });
      }
    })
    .finally(() => {
      submitLoading.value = false;
    });
};

const resetEditor = () => {
  props.form.content = '';
  props.form.images = [];
  richEditor.value.clearContent();
  onClearLocation();
};

const onImagePick = (value: HTMLElement | string) => {
  richEditor.value.insertHtml(value);
};

const onEmojiPick = (value: string) => {
  richEditor.value.insertText(value);
};

const onClickEmoji = () => {
  if (!isLogin.value) {
    commit('changeLogin', true);
    return;
  }
  emojiVisible.value = true;
};

const onEmojiClose = () => {
  emojiVisible.value = false;
};

const onAddPosition = () => {
  openModal({
    component: LocationSelector,
    componentProps: {
      data: props.form
    },
    title: '添加位置',
    width: '88vw',
    maskClosable: false,
    keyboard: false,
    centered: true,
    wrapClassName: 'select-position-modal-wrapper'
  })
    .then(res => {
      props.form.location = res.name;
      props.form.longitude = res.longitude;
      props.form.latitude = res.latitude;
    })
    .catch(console.log);
};

const onClearLocation = () => {
  props.form.location = '';
  props.form.longitude = '';
  props.form.latitude = '';
};

const onPasteImage = (files: File[]) => {
  // 验证最大上传数量
  if (props.form?.images.length + files.length > maxFileNum) {
    return message.error(`最多可上传${maxFileNum}张图片`);
  }
  // 验证单个文件大小
  const maxFileByteSize = maxFileSize * 1024 * 1024;
  const validFiles: File[] = [];
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
  props.form?.images.push(...validFiles);
};

const onUploadProgress = (progress: number[]) => {
  progressList.value = progress;
};
</script>

<style lang="scss" scoped>
.moment-editor {
  width: 824px;
  padding: 20px 20px 0;
  background-color: var(--youyu-background1);
  border-radius: 4px;

  .editor-body {
    position: relative;
    background: var(--youyu-background5);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid transparent;
    transition: 0s;

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
      max-height: 230px;
      word-wrap: break-word;

      ::v-deep(.editable-div) {
        .editor-bottom {
          padding: 4px 8px 5px 8px;
        }
      }
    }

    .topic-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .add-position {
        padding: 0 6px 0 8px;
        border-radius: 50px;
        border-bottom-left-radius: 0;
        background: var(--youyu-body-background2);
        color: #3b8fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .icon-wrapper {
          background-color: #3b8fff;
          line-height: 0;
          border-radius: 50%;
          padding: 1.6px;
          display: flex;
        }

        .icon-wrapper-close {
          background-color: rgba(0, 0, 0, 0.5);
          line-height: 0;
          border-radius: 50%;
          margin-left: 2px;

          &:hover {
            background-color: rgba(0, 0, 0, 0.7);
          }
        }

        .i-icon {
          position: relative;
        }

        .position-text {
          padding: 0 1px 0 3px;
          font-weight: bold;
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
    margin-top: 8px;

    ::v-deep(.list-group) {
      display: flex;
    }

    .image-item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 8px;

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
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        right: 4px;
        border-radius: 50%;
        border: 1px solid #c5c5c5;
        background: rgba(0, 0, 0, 0.4);

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .i-icon {
          color: white;
        }
      }

      .progress-wrapper {
        position: absolute;
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
      background: rgba(248, 248, 249, 0.2);
      transition: 0.3s;

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
        transition: 0.3s;

        .i-icon {
          position: relative;
          top: 0.5px;
        }

        .tool-title {
          font-size: 13px;
          padding-left: 4px;
        }

        &:hover {
          color: #1890ff !important;
        }
      }

      ::v-deep(.avatar-uploader) {
        display: flex;
      }
    }
  }
}

.active {
  .editor-body {
    background: var(--youyu-background1) !important;
    transition: 0s;
    border-color: #1890ff;

    .add-position {
      background: #eaf2ff !important;
    }
  }

  ::v-deep(.editor-active) {
    border-color: transparent !important;
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

  .ant-popover-inner {
    padding: 0;
  }

  .ant-popover-inner-content {
    padding: 0;
  }
}

.select-position-modal-wrapper {
  .ant-modal-content {
    padding: 14px 24px;
  }

  .ant-modal-body {
    padding: 0;

    .modal-content {
      height: 80vh;
    }
  }
}
</style>
