<template>
  <div class="upload-file">
    <a-upload
      v-model:file-list="fileList"
      :data="data"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :action="data.host"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
      <div v-else>
        <i-upload-one theme="outline" size="24" fill="#000" v-if="!loading"/>
        <div class="ant-upload-text">
          点击上传
        </div>
      </div>
<!--      <div v-if="loading">-->
<!--        <div class="percentage">-->
<!--          <div class="progress" :style="{'width': `${percent}%`}"></div>-->
<!--        </div>-->
<!--      </div>-->
    </a-upload>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {message} from "ant-design-vue";
  import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
  import {useStore} from 'vuex';

  const {dispatch} = useStore();

  const fileList = ref([]);
  const loading = ref<boolean>(false);
  const data = ref<object>({});
  const imageUrl = ref<string>('');
  const percent = ref<number>(0);

  const emit = defineEmits('uploadSuccess');

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }

  const handleChange = (info: UploadChangeParam) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      percent.value = info?.event?.percent ?? 0;
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (base64Url: string) => {
      //   imageUrl.value = base64Url;
      //   loading.value = false;
      // });
      imageUrl.value = `${data.value.host}/${data.value.dir}${info.file.name}`;
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
      res.data.key = res.data.dir + file.name
      res.data.success_action_status = 200
      data.value = res.data;
      return isJpgOrPng && isLt2M;
    }).catch(() => {
      return false;
    });
  };
</script>

<style lang="scss" scoped>
  .upload-file {

    .percentage {
      position: absolute;
      left: 30px;
      top: 40px;
      height: 4px;
      width: 140px;
      background-color: #cccccc;

      .progress {
        height: 100%;
        background-color: #1890ff;
        transition: .2s;
      }
    }

    ::v-deep(.ant-upload) {
      width: 200px;
      height: 120px;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
