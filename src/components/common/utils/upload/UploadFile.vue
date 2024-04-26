<template>
  <div class="upload-file" :class="{ disabled: disabled }">
    <a-upload
      v-model:file-list="uploadFiles"
      :data="data"
      :accept="accept"
      :show-upload-list="false"
      :disabled="disabled"
      :capture="null"
      :customRequest="customRequest"
      :multiple="multiple"
      @change="handleChange"
      v-bind="$attrs"
      class="avatar-uploader"
      ref="uploadRef"
    >
      <slot :progress="progress">
        <div class="upload-box">
          <div class="progress-box" :style="{ width: `${totalProgress}%` }"></div>
          <div class="upload-button">
            <i-upload-one theme="outline" size="18" fill="currentColor"/>
            <div class="ant-upload-text">点击上传</div>
          </div>
        </div>
      </slot>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {message} from 'ant-design-vue';
import type {UploadChangeParam} from 'ant-design-vue';
import {useStore} from 'vuex';
import {merge} from 'lodash';
import {uploadToOss} from '@/components/common/utils/upload/utils';
import {AxiosError} from "axios";

const uploadRef = ref(null);

const {dispatch} = useStore();
const files = defineModel({default: []}); // v-model双向绑定
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
    default: 20,
  },
  maxNum: {
    type: Number,
    default: 10,
  },
  query: {
    type: String,
  },
  accept: {
    type: String,
    default: '.jpg, .jpeg, .png, .JPG, .PNG',
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const uploadFiles = ref([]); // 临时的文件列表，仅用于上传，上传成功后清空
const data = ref<object>({});
const progress = ref<number[]>([]);
const totalProgress = ref<number>(100);

const emit = defineEmits(['change', 'uploadSuccess']);

let tempCount = 0; // 用于handleChange计算文件数目
const handleChange = (info: UploadChangeParam) => {
  const {file, fileList} = info;
  return new Promise((resolve, reject) => {
    if (files.value.length + fileList.length > props.maxNum) {
      message.error(`最多可上传${props.maxNum}个文件`);
      return reject(false);
    }
    // 校验文件
    const fileNameArr = file.name.split('.');
    const suffix = fileNameArr[fileNameArr.length - 1];
    const nameLegal = props.accept.indexOf(suffix) > -1;
    if (!nameLegal) {
      message.error(`只能上传${props.accept}类型的文件`);
      return reject(false);
    }
    const sizeExceed = file.size / 1024 / 1024 < props.maxSize;
    if (!sizeExceed) {
      message.error(`文件大小不能大于${props.maxSize}MB`);
      return reject(false);
    }

    // 校验成功处理文件
    file.thumb = URL.createObjectURL(file.originFileObj);
    files.value.push(file);
    emit('change', file);
    tempCount++;
    if (tempCount === fileList.length && props.autoUpload) {
      upload();
    }
    return resolve(true);
  });
};

const customRequest = () => {
};

const upload = async () => {
  const originalFiles = files.value.map(item => item?.originFileObj).filter(item => item);
  if (!originalFiles.length) {
    return;
  }
  const defaultConfig = {
    base: 'post/images',
    needTip: false, // 不需要提示
    progress: uploadProgress,
    accept: props.accept,
    maxSize: props.maxSize,
  };
  const mergedConfig = merge(defaultConfig, props.data);
  const res = await uploadToOss(originalFiles, mergedConfig);
  const firstErrorItem = res?.find(item => item instanceof AxiosError);
  if (!firstErrorItem) {
    uploadFiles.value = [];
    files.value = [];
  }
  emit('uploadSuccess', res);
  return res;
};

const uploadProgress = (progressList: number[]) => {
  progress.value = progressList;
  files.value.forEach((file, index) => (typeof file === 'object' && (file.progress = progressList[index])));
  if (progress.value.length) {
    const total = progress.value.reduce((pre, n) => pre + n, 0);
    totalProgress.value = parseFloat(((total / (progress.value.length * 100)) * 100).toFixed(2));
  } else {
    totalProgress.value = 100;
  }
};

defineExpose({
  files,
  upload,
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
