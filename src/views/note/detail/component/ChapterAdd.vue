<template>
  <ChapterEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
  import {computed, inject, ref, onMounted} from "vue";
  import type {chapter} from "../../type";
  import ChapterEditor from "./ChapterEditor.vue";
  import {message} from "ant-design-vue";
  import {useStore} from "vuex";

  const modal = inject('modal');
  const userInfo = computed(() => getters['userInfo']);
  const {getters, dispatch} = useStore();
  const editor = ref();
  const props = defineProps({
    parentId: {
      type: Number,
      default: -1
    },
    noteId: {
      type: Number,
      required: true
    }
  })

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

  onMounted(() => {
    formValidate.value.noteId = props.noteId;
    formValidate.value.parentId = props.parentId;
    formValidate.value.userIds = userInfo.value.id;
  })

  async function beforeConfirm(done: Function) {
    const form = await editor.value.getFormData();
    if (form) {
      formValidate.value.userIds = userInfo.value.id;
      modal.confirmLoading = true;
      dispatch("createNoteChapter", formValidate.value).then(res => {
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
