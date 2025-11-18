<template>
  <div class="upload-file" :class="{ disabled: disabled }">
    <input
      v-if="visible"
      v-bind="$attrs"
      ref="inputRef"
      type="file"
      multiple
      :accept="accept"
      :disabled="disabled"
      :capture="null"
      style="display: none"
      @change="handleChange"
    >
    <div class="input-trigger" @click="onTriggerInput">
      <slot :progress="progress">
        <div class="upload-box">
          <div class="progress-box" :style="{ width: `${totalProgress}%` }" />
          <div class="upload-button">
            <i-upload-one theme="outline" size="18" fill="currentColor" />
            <div class="ant-upload-text">
              点击上传
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { AxiosError } from 'axios';
import { merge } from 'lodash';
import { convertHEICFileToBlob, getFileType, uploadToOss } from '@/components/common/utils/upload/utils';
import type { FileExtend, UploadResult } from './types';
import type { FileTypeResult } from 'file-type';

const inputRef = ref<HTMLInputElement | null>(null);

const files = defineModel<Array<FileExtend | string>>({ default: [] }); // v-model双向绑定
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,
    default: 20
  },
  maxNum: {
    type: Number,
    default: 0
  },
  accept: {
    type: String,
    default: '.jpg, .jpeg, .png, .JPG, .PNG'
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  autoClear: {
    type: Boolean,
    default: true
  }
});

const progress = ref<number[]>([]);
const totalProgress = ref<number>(100);
const visible = ref(true);

const emit = defineEmits(['change', 'uploadSuccess', 'onProgress']);

const handleChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const originFiles: FileExtend[] = Array.from(input.files ?? []) as FileExtend[];
  // 判断最大上传限制
  if (props.maxNum !== 0 && files.value.length + originFiles.length > props.maxNum) {
    message.error(`最多可上传${props.maxNum}个文件`);
    return false;
  }
  // 数据处理
  for (const file of originFiles) {
    // 获取文件真实扩展信息
    const typeInfo: FileTypeResult | undefined = await getFileType(file);
    if (typeInfo) {
      // 校验文件
      const { ext } = typeInfo;
      // 文件格式是否合法
      const isExtLegal = (props.accept.toLowerCase()).indexOf(ext.toLowerCase()) > -1;
      if (!isExtLegal) {
        return message.error(`只能上传${props.accept}类型的文件`);
      }
      // 文件大小是否合法
      const isSizeExceed = file.size / 1024 / 1024 < props.maxSize;
      if (!isSizeExceed) {
        return message.error(`文件大小不能大于${props.maxSize}MB`);
      }
      // 校验成功处理文件
      if (ext.toLowerCase() === 'heic') {
        file.thumb = await convertHEICFileToBlob(file);
      } else {
        file.thumb = window.URL.createObjectURL(file);
      }
      file.progress = -1;
      files.value.push(file);
      emit('change', file);
    }
  }
  if (props.autoUpload) {
    await upload();
  }
  visible.value = false;
};

const onTriggerInput = () => {
  visible.value = true;
  nextTick(() => {
    inputRef.value?.click();
  });
};

const upload = async () => {
  const uploadFiles = files.value.filter(item => (item as FileExtend).progress < 0);
  if (!uploadFiles.length) {
    return;
  }
  const defaultConfig = {
    data: { base: 'post/images' },
    needTip: false, // 不需要提示
    progress: uploadProgress,
    accept: props.accept,
    maxSize: props.maxSize
  };
  const mergedConfig = merge(defaultConfig, props.config);
  const res: UploadResult[] = await uploadToOss(uploadFiles as File[], mergedConfig);
  res?.forEach((item: UploadResult) => {
    if (item.url) {
      const findIndex = files.value.findIndex(file => file === item.file);
      files.value[findIndex] = item.file.thumb as string;
    }
  });
  const isError = res?.find(item => item instanceof AxiosError);
  if (!isError && props.autoClear) {
    files.value = [];
  }
  const successResult = res?.filter(item => !(item instanceof AxiosError));
  emit('uploadSuccess', successResult);
  return res;
};

const uploadProgress = (progressList: number[]) => {
  let count = 0;
  progress.value = files.value.map((item, index) => (typeof item === 'object' ? progressList[count++] : 100));

  if (progress.value.length) {
    const total = progress.value.reduce((pre, n) => pre + n, 0);
    totalProgress.value = parseFloat(((total / (progress.value.length * 100)) * 100).toFixed(2));
  } else {
    totalProgress.value = 100;
  }
  emit('onProgress', progress.value);
};

defineExpose({
  files,
  upload,
  progress,
  triggerInput: onTriggerInput
});
</script>

<style lang="scss" scoped>
.upload-file {
  cursor: pointer;

  .upload-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 36px;
    overflow: hidden;
    background-color: rgb(217, 217, 217, 0.6);
    border-radius: 2px;

    .upload-button {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: white;
      cursor: pointer;

      .ant-upload-text {
        padding-left: 4px;
      }
    }

    .progress-box {
      position: absolute;
      inset: 0;
      background-color: #1890ff;
      transition: 0.2s;
    }
  }

  &.disabled {
    color: #00000040 !important;
    cursor: not-allowed !important;

    .upload-button {
      color: #00000040 !important;
      cursor: not-allowed !important;
    }

    .progress-box {
      background: #f5f5f5 !important;
    }
  }
}
</style>
