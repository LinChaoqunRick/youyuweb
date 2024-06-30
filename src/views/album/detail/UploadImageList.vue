<template>
  <div class="upload-image">
    <UploadFile v-model="images"
                accept=".jpg, .jpeg, .png, .JPG, .PNG, .HEIC"
                :max-size="maxFileSize"
                multiple
                :auto-clear="false"
                :config="{policyPath: 'getAlbumOssPolicy', data: {base: '', albumId: props.albumId}}"
                @onProgress="onUploadProgress"
                @uploadSuccess="uploadSuccess"
                class="image-item-wrapper"
                ref="UploadFileRef">
      <div class="upload-image-lead">
        <i-plus theme="outline" size="40" fill="currentColor" :strokeWidth="1" />
      </div>
    </UploadFile>
    <div class="image-item-wrapper" v-for="(item, index) in images" :key="index">
      <ImageItem :data="item"
                 :height="120"
                 :width="120"
                 :progress="progressList[index]"
                 @on-image-delete="onImageDelete(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import { inject, ref } from 'vue';
import ImageItem from '@/components/common/utils/upload/components/ImageItem.vue';
import { message } from 'ant-design-vue';

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true
  }
});

const { dispatch } = useStore();

const maxFileSize = 20;

const images = ref<File[]>([]);
const progressList = ref<number[]>([]);
const modal = inject('modal');
const UploadFileRef = ref(null);

const onUploadProgress = (progress: number[]) => {
  progressList.value = progress;
};

const onImageDelete = (index: number) => {
  images.value.splice(index, 1);
};

const beforeConfirm = async (done: Function) => {
  modal.confirmLoading = true;
  const res = await UploadFileRef.value.upload().catch(console.error);
  done(res);
  modal.confirmLoading = false;
};

const uploadSuccess = (res) => {
  const albumListRes = res.map(item => ({
    path: item.path,
    name: item.file.name,
    size: item.file.size
  }));

  dispatch('createAlbumImage', { images: albumListRes, albumId: Number(props.albumId) }).then(res => {
    // message.success('');
  });
};

defineExpose({
  beforeConfirm
});
</script>

<style scoped lang="scss">
.upload-image {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  overflow: auto;

  .upload-image-lead {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 120px;
    border: 1px dashed #c5c5c5;
    background: rgba(248, 248, 249, 0.2);
    transition: 0.3s;

    &:hover {
      background: rgba(248, 248, 249, 0.3);
    }
  }

  .image-item-wrapper {
    margin: 8px 0 0 8px;
  }
}
</style>
