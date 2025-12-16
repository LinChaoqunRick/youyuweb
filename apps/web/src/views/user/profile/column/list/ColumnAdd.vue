<template>
  <div class="column-add">
    <ColumnEditor ref="editor" :form-validate="formValidate" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import type { column } from '@/views/user/profile/column/type';
import ColumnEditor from './ColumnEditor.vue';

const modal = inject('modal');

const { dispatch } = useStore();

const formValidate = ref<column>({
  title: '',
  content: '',
  cover: 'https://youyu-source.youyul.com/youyu/login/loginImg.jpg',
});

const editor = ref(null);

const beforeConfirm = async (done: Function) => {
  const form = await editor.value.getFormData();
  if (form) {
    modal.confirmLoading = true;
    dispatch('addColumn', formValidate.value)
      .then(res => {
        done(res.data);
        message.success('保存成功');
      })
      .finally(() => {
        modal.confirmLoading = false;
      });
  }
};

defineExpose({
  beforeConfirm,
});
</script>

<style scoped></style>
