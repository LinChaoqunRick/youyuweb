<template>
  <div class="album-editor">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="album-form">
      <div class="album-left">
        <a-form-item label="名称" name="name">
          <a-input v-model:value="formValidate.name" show-count :maxlength="20" />
        </a-form-item>
        <a-form-item label="介绍" name="content">
          <a-textarea
            v-model:value="formValidate.content"
            :rows="4"
            show-count
            :maxlength="100"
          />
        </a-form-item>
        <a-form-item class="form-item-isOpen" label="" name="open">
          <a-radio-group v-model:value="formValidate.open">
            <a-radio :style="radioStyle" :value="1">公开 <span class="subText">所有人都可以看到此收藏夹</span></a-radio>
            <a-radio :style="radioStyle" :value="0">私密 <span class="subText">仅你自己可见</span></a-radio>
          </a-radio-group>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';

const { getters, commit, dispatch } = useStore();
import type { AlbumType } from '@/views/album/type';

const labelCol = { span: 2 };
const wrapperCol = { span: 22 };
const formRef = ref();

const props = defineProps({
  formValidate: {
    type: Object as PropType<AlbumType>
  }
});

const rulesRef = {
  name: [
    {
      required: true,
      message: '请输入标题'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入说明'
    }
  ]
};

const radioStyle = reactive({
  display: 'flex',
  height: '36px',
  lineHeight: '36px',
});

async function getFormData() {
  return await formRef.value.validate().catch(console.log);
}

function uploadSuccess(fileList: []) {
  props.formValidate.cover = fileList[0].url;
}

defineExpose({
  getFormData
});
</script>

<style lang="scss" scoped>
.album-editor {
  margin-top: 16px;

  .album-form {
    display: flex;

    .album-left {
      flex: 1;

      .form-item-isOpen {
        position: relative;
        top: -5px;

        .subText {
          font-size: 13px;
          margin-left: 8px;
          color: var(--youyu-text6);
        }
      }
    }
  }

  ::v-deep(.ant-form) {
    .ant-input-textarea {
      &::after {
        height: 0 !important;
      }
    }
  }
}
</style>
