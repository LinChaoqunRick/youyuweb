<template>
  <div class="upload-file" :class="{ disabled: disabled }">
    <input type="file" multiple v-bind="$attrs" :accept="accept" :disabled="disabled" :capture="null"
           v-if="visible" style="display: none" @change="handleChange" ref="inputRef" />
    <div class="input-trigger" @click="onTriggerInput">
      <slot :progress="progress">
        <div class="upload-box">
          <div class="progress-box" :style="{ width: `${totalProgress}%` }"></div>
          <div class="upload-button">
            <i-upload-one theme="outline" size="18" fill="currentColor" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { merge } from 'lodash';
import { convertHEICFileToBlob, uploadToOss } from '@/components/common/utils/upload/utils';
import { AxiosError } from 'axios';

const inputRef = ref<HTMLInputElement | null>(null);

const files = defineModel({ default: [] }); // v-model双向绑定
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
  const inputElement = event.target as HTMLInputElement;
  const originFiles = Object.values(inputElement.files);
  if (props.maxNum !== 0 && files.value.length + originFiles.length > props.maxNum) {
    message.error(`最多可上传${props.maxNum}个文件`);
    return false;
  }
  for (const file of originFiles) {
    // 校验文件
    const fileNameArr = file.name.split('.');
    const suffix = fileNameArr[fileNameArr.length - 1];
    const nameLegal = props.accept.indexOf(suffix) > -1;
    if (!nameLegal) {
      return message.error(`只能上传${props.accept}类型的文件`);
    }
    const sizeExceed = file.size / 1024 / 1024 < props.maxSize;
    if (!sizeExceed) {
      return message.error(`文件大小不能大于${props.maxSize}MB`);
    }

    // 校验成功处理文件
    if (suffix.toLowerCase() === 'heic') {
      file.thumb = await convertHEICFileToBlob(file);
    } else {
      file.thumb = URL.createObjectURL(file);
    }
    file.progress = -1;
    files.value.push(file);
    emit('change', file);
  }
  if (props.autoUpload) {
    upload();
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
  const uploadFiles = files.value.filter(item => item.progress < 0);
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
  const res = await uploadToOss(uploadFiles, mergedConfig);
  res?.forEach((item: object, index: number) => {
    if (item.url) {
      const findIndex = files.value.findIndex(file => file === item.file);
      files.value[findIndex] = item.file.thumb;
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
  console.log(files.value);
  let count = 0;
  progress.value = files.value.map((item, index) => (typeof item === 'object') ? progressList[count++] : 100);

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
    height: 36px;
    width: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    overflow: hidden;
    background-color: rgba(217, 217, 217, 0.6);

    .upload-button {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: pointer;

      .ant-upload-text {
        padding-left: 4px;
      }
    }

    .progress-box {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #1890ff;
      transition: 0.2s;
    }
  }

  &.disabled {
    cursor: not-allowed !important;
    color: #00000040 !important;

    .upload-button {
      cursor: not-allowed !important;
      color: #00000040 !important;
    }

    .progress-box {
      background: #f5f5f5 !important;
    }
  }
}
</style>
