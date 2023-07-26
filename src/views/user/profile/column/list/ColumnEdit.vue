<template>
  <ColumnEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
  import {computed, ref, inject} from "vue";
  import {useStore} from "vuex";
  import type {column} from "@/views/user/profile/column/type";
  import ColumnEditor from "./ColumnEditor.vue";
  import {message} from "ant-design-vue";

  const props = defineProps({
    columnId: {
      type: [String, Number]
    }
  })
  const modal = inject('modal');
  const {getters, dispatch} = useStore();
  const editor = ref();
  const formValidate = ref<column>({
    title: '',
    content: '',
    cover: '',
  });

  function initData() {
    dispatch("getColumnDetail", {columnId: props.columnId}).then(res => {
      formValidate.value = res.data;
    })
  }

  initData();

  async function beforeConfirm(done: Function) {
    const form = await editor.value.getFormData();
    if (form) {
      modal.confirmLoading = true;
      dispatch("updateColumn", formValidate.value).then(res => {
        done(formValidate.value);
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

