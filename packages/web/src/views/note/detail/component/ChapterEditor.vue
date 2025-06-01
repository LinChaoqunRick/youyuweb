<template>
  <div class="note-editor">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="note-form">
      <div class="note-left">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formValidate.title" show-count :maxlength="20"/>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import type {chapter} from "@/views/note/type";
  import {useStore} from "vuex";

  const {getters, commit, dispatch} = useStore();

  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formRef = ref();

  const props = defineProps({
    formValidate: {
      type: Object as PropType<chapter>
    }
  })

  const rulesRef = {
    title: [
      {
        required: true,
        message: '请输入标题',
      },
    ],
  };

  async function getFormData() {
    return await formRef.value.validate().catch(console.log);
  }

  defineExpose({
    getFormData
  })
</script>

<style lang="scss" scoped>
</style>
