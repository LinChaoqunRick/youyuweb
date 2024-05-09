<template>
  <div class="favorites-editor">
    <a-form :model="formValidate" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="favorites-form">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="formValidate.name" show-count :maxlength="10"/>
      </a-form-item>
      <a-form-item label="" name="open">
        <a-radio-group v-model:value="formValidate.open">
          <a-radio :style="radioStyle" :value="1">公开 <span class="subText">所有人都可以看到此收藏夹</span></a-radio>
          <a-radio :style="radioStyle" :value="2">私密 <span class="subText">仅你自己可见</span></a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import type {PropType} from 'vue';
import {useStore} from "vuex";
import type {FavoritesType} from "@/views/user/profile/favorites/type";

const {getters, commit, dispatch} = useStore();

const labelCol = {span: 3};
const wrapperCol = {span: 21};
const formRef = ref();

const props = defineProps({
  formValidate: {
    type: Object as PropType<FavoritesType>
  }
})

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});

const rulesRef = {
  name: [
    {
      required: true,
      message: '请输入标题',
    },
  ],
  introduce: [
    {
      required: true,
      message: '请输入说明',
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
.favorites-editor {

  .favorites-form {
    padding-top: 40px;

    .subText {
      font-size: 13px;
      color: var(--youyu-text3);
    }
  }
}
</style>
