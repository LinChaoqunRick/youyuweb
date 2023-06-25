<template>
  <div class="upload-file" :class="{'disabled':disabled}">
    <a-upload
      v-model:file-list="fileList"
      :data="data"
      class="avatar-uploader"
      :show-upload-list="false"
      :action="data.host"
      :before-upload="beforeUpload"
      :disabled="disabled"
      :max-count="1"
      :accept="accept"
      :capture="null"
      @change="handleChange"
      ref="uploadRef"
    >
      <slot :percent="percent">
        <div class="upload-box">
          <div class="progress-box" :style="{'width': `${percent}%`}"></div>
          <div class="upload-button">
            <i-upload-one theme="outline" size="18" fill="currentColor"/>
            <div class="ant-upload-text">
              点击上传
            </div>
          </div>
        </div>
      </slot>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {message, Upload} from "ant-design-vue";
  import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import {createFileName} from "@/assets/utils/utils";

  const uploadRef = ref(null);

  const {dispatch} = useStore();
  const props = defineProps({
    ...Upload.props,
    disabled: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 5
    },
    query: {
      type: String
    }
  })
  const fileList = ref([]);
  const loading = ref<boolean>(false);
  const data = ref<object>({});
  const percent = ref<number>(100);
  const filename = ref<string>('');
  let hide: () => void;

  const emit = defineEmits(['uploadSuccess']);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      percent.value = info?.event?.percent ?? 0;
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      fileList.value[0].url = `${data.value.host}/${data.value.dir}${filename.value}`;
      loading.value = false;
      emit('uploadSuccess', fileList.value);
      message.success('上传成功');
      hide();
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('上传失败，请重试');
      hide();
    }
  };

  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    // todo...添加所有类型例如 "image/*" 的判断
    return new Promise(((resolve, reject) => {
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

      dispatch("getOssPolicy").then(res => {
        filename.value = createFileName(file.name);
        res.data.key = res.data.dir + filename.value;
        res.data.success_action_status = 200;
        data.value = res.data;
        hide = message.loading('上传中...', 0);
        return resolve(true);
      }).catch(() => {
        return reject(false);
      });
    }))
  };
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
        transition: .2s;
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
