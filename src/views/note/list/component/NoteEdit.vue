<template>
  <NoteEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
  import {computed, ref, inject} from "vue";
  import {useStore} from "vuex";
  import type {note} from "@/views/note/type";
  import NoteEditor from "./NoteEditor.vue";
  import {message} from "ant-design-vue";

  const props = defineProps({
    noteId: {
      type: [String, Number]
    }
  })
  const modal = inject('modal');
  const {getters, dispatch} = useStore();
  const editor = ref();
  const formValidate = ref<note>({
    id: null,
    name: '',
    userId: null,
    introduce: '',
    cover: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/loginImg.jpg',
    type: '',
    createTime: '',
    updateTime: ''
  })

  function initData() {
    dispatch("getNote", {noteId: props.noteId}).then(res => {
      formValidate.value = res.data;
    })
  }

  initData();

  async function beforeConfirm(done: Function) {
    const form = await editor.value.getFormData();
    if (form) {
      modal.confirmLoading = true;
      dispatch("updateNote", formValidate.value).then(res => {
        done();
        message.success("保存成功");
      }).finally(() => {
        modal.value && (modal.value.confirmLoading = false);
      })
    }
  }

  defineExpose({
    beforeConfirm
  })
</script>

<style scoped>

</style>

