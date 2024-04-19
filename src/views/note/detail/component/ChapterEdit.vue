<template>
  <ChapterEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
  import {computed, inject, ref, onMounted} from "vue";
  import type {chapter} from "../../type";
  import ChapterEditor from "./ChapterEditor.vue";
  import {message} from "ant-design-vue";
  import {useStore} from "vuex";

  const props = defineProps({
    id: {
      type: Number,
      required: true
    },
  })
  const modal = inject('modal');
  const userInfo = computed(() => getters['userInfo']);
  const {getters, dispatch} = useStore();
  const editor = ref();

  const formValidate = ref<chapter>({
    id: 0,
    noteId: 0,
    parentId: 0,
    userIds: "",
    title: "",
    content: "",
    viewCount: 0,
    createTime: "",
    updateTime: ""
  })

  // getNoteChapter
  // updateNoteChapter

  function initData() {
    dispatch('getNoteChapter', {chapterId: props.id}).then(res => {
      formValidate.value = res.data;
    })
  }

  initData();

  async function beforeConfirm(done: Function) {
    const form = await editor.value.getFormData();
    if (form) {
      formValidate.value.userIds = userInfo.value.id;
      modal.confirmLoading = true;
      dispatch("updateNoteChapter", formValidate.value).then(res => {
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
