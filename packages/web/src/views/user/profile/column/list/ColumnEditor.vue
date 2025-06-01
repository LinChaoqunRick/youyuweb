<template>
  <div class="column-editor">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="column-form">
      <div class="column-left">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formValidate.title" show-count :maxlength="20"/>
        </a-form-item>
        <a-form-item label="说明" name="content">
          <a-textarea
            v-model:value="formValidate.content"
            :rows="4"
            show-count
            :maxlength="100"
          />
        </a-form-item>
      </div>
      <div class="column-right">
        <a-form-item label="封面" name="cover" :label-col="{span: 8, offset: 0}" class="form-item-cover">
          <a-input v-model:value="formValidate.title" disabled/>
        </a-form-item>
        <div class="cover-box">
          <div class="column-cover">
            <UploadFile auto-upload @uploadSuccess="uploadSuccess">
              <img :src="formValidate.cover">
            </UploadFile>
          </div>
          <div class="cover-tip">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import type {column} from "@/views/user/profile/column/type";
  import {useStore} from "vuex";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';

  const {getters, commit, dispatch} = useStore();

  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formRef = ref();

  const props = defineProps({
    formValidate: {
      type: Object as PropType<column>
    }
  })

  const rulesRef = {
    title: [
      {
        required: true,
        message: '请输入标题',
      },
    ],
    content: [
      {
        required: true,
        message: '请输入说明',
      },
    ],
    cover: [
      {
        required: true,
        message: '请上传封面',
      },
    ],
  };

  async function getFormData() {
    return  await formRef.value.validate().catch(console.log);
  }

  function uploadSuccess(fileList: []) {
    props.formValidate.cover = fileList[0].url;
  }

  defineExpose({
    getFormData
  })
</script>

<style lang="scss" scoped>
  .column-editor {

    .column-form {
      display: flex;

      .column-left {
        flex: 1;
      }

      .column-right {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 180px;
        height: 200px;

        .cover-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          left: 30px;
          top: -55px;

          .column-cover {
            height: 150px;
            margin-bottom: 8px;
            overflow: hidden;
            border-radius: 2px;

            img {
              object-fit: cover;
              height: 150px;
              width: 110px;
              cursor: pointer;
            }
          }

          .cover-tip {
            width: 140px;
            font-size: 12px;
            color: var(--youyu-text1);
          }
        }
      }

      ::v-deep(.form-item-cover) {

        .ant-form-item-control-input {
          opacity: 0;
        }

        .ant-form-item-explain {
          position: relative;
          top: 163px;
        }
      }
    }
  }
</style>
