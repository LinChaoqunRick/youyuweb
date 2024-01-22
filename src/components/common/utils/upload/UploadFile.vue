<template>
  <div class="upload-file" :class="{ disabled: attrs.disabled }">
    <VueUploadComponent
      v-model="fileList"
      multiple
      v-bind="$attrs"
      :custom-action="uploadAction"
      class="file-uploader"
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
    </VueUploadComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { createFileName } from "@/components/common/utils/upload/utils";
import VueUploadComponent from "vue-upload-component";

const attrs = useAttrs();
const uploadRef = ref(null);

const { dispatch } = useStore();
const props = defineProps({
  maxSize: {
    type: Number,
    default: 10,
  },
});
const fileList = ref([]);
const loading = ref<boolean>(false);
const data = ref<object>({});
const percent = ref<number>(100);
const filename = ref<string>("");
let hide: () => void;

const emit = defineEmits(["uploadSuccess"]);

const handleChange = (info) => {
  if (info.file.status === "uploading") {
    percent.value = info?.event?.percent ?? 0;
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    fileList.value[0].url = `${data.value.host}/${data.value.dir}${filename.value}`;
    loading.value = false;
    emit("uploadSuccess", fileList.value);
    message.success("上传成功");
    hide();
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("上传失败，请重试");
    hide();
  }
};

let fileCount = 0;
const beforeUpload = async (file, fileList) => {
  if (++fileCount < fileList.length) {
    return true;
  }

  if (fileCount === fileList.length) {
    fileList.forEach((fileItem) => {
      const fileNameArr = fileItem.name.split(".");
      const suffix = fileNameArr[fileNameArr.length - 1];
      const nameLegal = attrs.accept.indexOf(suffix) > -1;
      if (!nameLegal) {
        message.error(`只能上传${attrs.accept}类型的文件`);
        return false;
      }
      const sizeExceed = fileItem.size / 1024 / 1024 < props.maxSize;
      if (!sizeExceed) {
        message.error(`文件大小不能大于${props.maxSize}MB`);
        return false;
      }
    });
    return new Promise(async (resolve, reject) => {
      hide = message.loading("上传中...", 0);
      await dispatch("getOssPolicy")
        .then((res) => {
          filename.value = createFileName(file.name);
          res.data.key = res.data.dir + filename.value;
          res.data.success_action_status = 200;
          data.value = res.data;
          return resolve(true);
        })
        .catch(() => {
          return reject(false);
        });
    });
  }
};

const uploadAction = async (file, component) => {
  console.log("file", file);
};
</script>

<style lang="scss" scoped>
.upload-file {
  font-size: 0;

  ::v-deep(label) {
    cursor: pointer !important;
  }

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
