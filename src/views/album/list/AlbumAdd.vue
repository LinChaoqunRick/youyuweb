<template>
  <AlbumEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
import {computed, ref, inject} from "vue";
import {useStore} from "vuex";
import AlbumEditor from '@/views/album/list/AlbumEditor.vue';
import {message} from "ant-design-vue";
import type { AlbumType } from '@/views/album/type';

const modal = inject('modal');
const userInfo = computed(() => getters['userInfo']);
const {getters, dispatch} = useStore();
const editor = ref();
const formValidate = ref<AlbumType>({
  name: '',
  content: '',
  open: 0
})


async function beforeConfirm(done: Function) {
  const form = await editor.value.getFormData();
  if (form) {
    formValidate.value.userId = userInfo.value.id;
    modal.confirmLoading = true;
    dispatch("createAlbum", formValidate.value).then(res => {
      done();
      message.success("保存成功");
    }).finally(() => {
      modal.confirmLoading = false;
    })
  }
}

defineExpose({
  beforeConfirm
})
</script>

<style scoped>

</style>
