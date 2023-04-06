<template>
  <NoteEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
  import {computed, ref, inject} from "vue";
  import {useStore} from "vuex";
  import type {note} from "@/views/note/type";
  import NoteEditor from "./NoteEditor.vue";
  import {message} from "ant-design-vue";

  const modal = inject('modal');
  const userInfo = computed(() => getters['userInfo']);
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


  async function beforeConfirm(done: Function) {
    const form = await editor.value.getFormData();
    if (form) {
      formValidate.value.userId = userInfo.value.id;
      modal.confirmLoading = true;
      dispatch("createNote", formValidate.value).then(res => {
        done();
        message.success("保存成功");
      }).finally(() => {
        modal.value.confirmLoading = false;
      })
    }
  }

  defineExpose({
    beforeConfirm
  })
</script>

<style scoped>

</style>
