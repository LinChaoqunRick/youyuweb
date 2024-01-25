<template>
  <div class="upload-file" :class="{ disabled: disabled }">
    <a-upload
      v-model:file-list="files"
      :data="data"
      :accept="accept"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :disabled="disabled"
      :capture="null"
      :customRequest="customRequest"
      @change="handleChange"
      v-bind="$attrs"
      class="avatar-uploader"
      ref="uploadRef"
    >
      <slot :percent="percent">
        <div class="upload-box">
          <div class="progress-box" :style="{ width: `${percent}%` }"></div>
          <div class="upload-button">
            <i-upload-one theme="outline" size="18" fill="currentColor" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </div>
      </slot>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { useStore } from "vuex";
import { uploadToOss } from "@/components/common/utils/upload/utils";

const uploadRef = ref(null);

const { dispatch } = useStore();
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
    default: 10,
  },
  query: {
    type: String,
  },
  accept: {
    type: String,
    default: ".jpg, .jpeg, .png, .JPG, .PNG",
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
});
const files = ref([]);
const fileList = ref([]);
const data = ref<object>({});
const percent = ref<number>(100);
const filename = ref<string>("");
let hide: () => void;

const emit = defineEmits(["change"]);

const handleChange = (info: UploadChangeParam) => {
  const { file } = info;
  file.thumb = URL.createObjectURL(file.originFileObj);
  fileList.value.push(file);
  emit("change", file);
};

const beforeUpload = (file: UploadProps["files"][number]) => {
  // todo...添加所有类型例如 "image/*" 的判断
  return new Promise((resolve, reject) => {
    const fileNameArr = file.name.split(".");
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
    resolve(true);
  });
};

const customRequest = () => {};

const upload = async () => {
  const originalFiles = fileList.value.map((item) => item.originFileObj);
  const res = await uploadToOss(originalFiles, {
    base: "moment/images",
    needTip: false, // 不需要提示
    progress: uploadProgress,
  });
  files.value = [];
  fileList.value = [];
  return res;
};

const uploadProgress = (progressList: number[]) => {
  console.log(progressList);
};

defineExpose({
  fileList,
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
