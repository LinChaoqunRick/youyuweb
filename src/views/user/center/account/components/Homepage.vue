<template>
  <div class="my-homepage">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="note-form">
      <div class="note-left">
        <a-form-item label="主页地址" name="homepage">
          <a-input v-model:value="formValidate.homepage" show-count :maxlength="100"/>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive} from "vue";

  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formRef = ref();

  const props = defineProps({
    homepage: {
      type: String
    }
  })

  const formValidate = reactive({
    homepage: props.homepage
  })

  const rulesRef = {
    homepage: [
      {
        required: true,
        message: '请输入主页地址',
      },
    ],
  };
</script>

<style scoped>

</style>
