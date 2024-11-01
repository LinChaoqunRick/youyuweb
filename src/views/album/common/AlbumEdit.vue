<template>
  <AlbumEditor :formValidate="formValidate" ref="editor" />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import AlbumEditor from '@/views/album/list/AlbumEditor.vue';
import { message } from 'ant-design-vue';
import type { AlbumType } from '@/views/album/type';
import type { OpenModal } from '@/libs/tools/openModal/types';

const modal = inject<OpenModal>('modal');
const { getters, dispatch } = useStore();
const editor = ref();

const props = defineProps({
  formValidate: {
    type: Object as PropType<AlbumType>,
    required: true
  }
});

const beforeConfirm = async (done: Function) => {
  const form = await editor.value.getFormData();
  if (form) {
    modal && (modal.confirmLoading = true);
    dispatch('updateAlbum', props.formValidate).then(res => {
      done();
      message.success('保存成功');
    }).finally(() => {
      modal && (modal.confirmLoading = false);
    });
  }
};

defineExpose({
  beforeConfirm
});
</script>

<style scoped>

</style>
