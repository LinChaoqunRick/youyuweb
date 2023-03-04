<template>
  <div class="upload-file">
    <a-upload
      v-model:file-list="fileList"
      :data="data"
      class="avatar-uploader"
      :show-upload-list="false"
      :action="data.host"
      :before-upload="beforeUpload"
      :disabled="fileList.length>=maxCount"
      :multiple="multiple"
      :max-count="maxCount"
      @change="handleChange"
    >
      <div class="upload-box" :class="{'disabled':fileList.length>=maxCount}">
        <div class="progress-box" :style="{'width': `${percent}%`}"></div>
        <div class="upload-button">
          <i-upload-one theme="outline" size="20" fill="currentColor"/>
          <div class="ant-upload-text">
            点击上传
          </div>
        </div>
      </div>
    </a-upload>
    <div class="slot-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {message} from "ant-design-vue";
  import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import {createFileName} from "@/assets/utils/utils";

  const {dispatch} = useStore();
  const props = defineProps({
    maxCount: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    }
  })
  const fileList = ref([]);
  const loading = ref<boolean>(false);
  const data = ref<object>({});
  const percent = ref<number>(100);
  const filename = ref<string>('');

  const emit = defineEmits(['uploadSuccess']);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      percent.value = info?.event?.percent ?? 0;
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      const newFile = fileList.value[fileList.value.length - 1];
      newFile.url = `${data.value.host}/${data.value.dir}${filename.value}`;
      loading.value = false;
      emit('uploadSuccess', fileList.value);
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('上传失败，请重试');
    }
  };

  const beforeUpload = async (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG或者PNG文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('文件大小不能大于5MB');
    }

    await dispatch("getOssPolicy").then(res => {
      filename.value = createFileName(file.name);
      res.data.key = res.data.dir + filename.value;
      res.data.success_action_status = 200;
      data.value = res.data;
      return isJpgOrPng && isLt2M;
    }).catch(() => {
      return false;
    });
  };
</script>

<style lang="scss" scoped>
  .upload-file {
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
        transition: .2s;
      }

      &.disabled {
        .upload-button {
          cursor: not-allowed !important;
          color: #00000040 !important;
        }

        .progress-box {
          background: #f5f5f5 !important;
        }
      }
    }

    .slot-content {

    }
  }
</style>
