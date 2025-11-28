<template>
  <div class="upload-image">
    <UploadFile
      ref="UploadFileRef"
      v-model="images"
      accept=".JPEG,.JPG,.PNG,.HEIC,.GIF,.WEBP"
      :max-size="maxFileSize"
      multiple
      :auto-clear="false"
      :config="{ policyPath: 'getAlbumOssPolicy', data: { base: '', albumId: props.albumId } }"
      class="image-item-wrapper"
      @on-progress="onUploadProgress"
      @upload-success="uploadSuccess"
    >
      <div class="upload-image-lead">
        <i-plus theme="outline" size="40" fill="currentColor" :stroke-width="1" />
      </div>
    </UploadFile>
    <div v-for="(item, index) in images" :key="index" class="image-item-wrapper">
      <ImageItem
        :data="item"
        :height="120"
        :width="120"
        :progress="progressList[index]"
        @on-image-delete="onImageDelete(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { useStore } from 'vuex';
import ImageItem from '@/components/common/utils/upload/components/ImageItem.vue';
import type { FileExtend, UploadResult } from '@/components/common/utils/upload/types';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import type { OpenModal } from '@/libs/tools/openModal/types';

defineOptions({
  name: 'UploadImageList',
});

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true,
  },
});

const { dispatch } = useStore();

const maxFileSize = 20;

const images = ref<Array<FileExtend | string>>([]);
const progressList = ref<number[]>([]);
const modal = inject<OpenModal>('modal');
const UploadFileRef = ref<InstanceType<typeof UploadFile> | null>(null);

const onUploadProgress = (progress: number[]) => {
  progressList.value = progress;
};

const onImageDelete = (index: number) => {
  images.value.splice(index, 1);
};

const beforeConfirm = async (done: (res: any) => void) => {
  modal!.confirmLoading = true;
  const uploadRes = await UploadFileRef.value?.upload().catch(console.error);
  const albumListRes = uploadRes.map(item => ({
    path: item.path,
    name: item.file.name,
    size: item.file.size,
  }));

  dispatch('createAlbumImage', { images: albumListRes, albumId: Number(props.albumId) }).then(res => {
    console.log(res);
    uploadRes.forEach((item, index) => {
      item.id = res[index];
    });
    // message.success('');
    done(uploadRes);
  });
  modal!.confirmLoading = false;
};

const uploadSuccess = (res: UploadResult[]) => {};

defineExpose({
  beforeConfirm,
});
</script>

<style scoped lang="scss">
.upload-image {
  display: flex;
  flex-wrap: wrap;
  min-height: 65vh;
  margin-top: 10px;
  overflow: auto;

  .upload-image-lead {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background: rgb(248, 248, 249, 0.2);
    border: 1px dashed #c5c5c5;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: rgb(248, 248, 249, 0.3);
    }
  }

  .image-item-wrapper {
    margin: 8px 0 0 8px;
  }
}
</style>
